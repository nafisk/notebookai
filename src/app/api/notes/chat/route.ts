import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  try {
    // parse the request body
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    // use only last six messages
    const messagesTruncated = messages.slice(-6);

    // create vector embedding for the messages
    const embedding = await getEmbedding(
      // get message text and join with new line
      messagesTruncated.map((message) => message.content).join("\n"),
    );

    // use userId to find correct notes
    const { userId } = auth();
    const vectorQueryResponse = await notesIndex.query({
      vector: embedding,
      topK: 5, // # of notes to return
      filter: { userId },
    });

    const relevantNotes = await prisma.note.findMany({
      where: {
        id: { in: vectorQueryResponse.matches.map((result) => result.id) },
      },
    });

    console.log("Relevant notes found: ", relevantNotes);

    const systemMessage: ChatCompletionMessage = {
      role: "system",
      content:
        "You are an intelligent note-taking app. You answer the user's question based on their existing notes. " +
        "The relevant notes for this query are:\n" +
        relevantNotes.map(
          (note) => `Title: ${note.title}\n\nContent:\n${note.content}`,
        ),
    };
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
