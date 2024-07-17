import { Metadata } from "next";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db/prisma";

export const metadata: Metadata = {
  title: "NotebookAI - Notes",
  description: "Notes Page",
};

export default async function NotesPage() {
  const { userId } = auth();
  if (!userId) throw Error("userId undefined");

  const allNotes = await prisma.note.findMany({ where: { userId } });

  return <div>{JSON.stringify(allNotes)}</div>;
}
