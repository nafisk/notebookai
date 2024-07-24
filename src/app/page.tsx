import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  if (userId) redirect("/notes");

  return (
    <main className="bg-notebook-lines flex h-screen flex-col items-center justify-center gap-5 text-black dark:text-white">
      <div className="flex items-center gap-4">
        <Image src={logo} width={100} height={100} alt="Logo" />
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          NotebookAI
        </span>
      </div>
      <p className="max-w-prose text-center">
        an intelligent ai note-taking app for students and professionals
      </p>
      <Button size="lg" asChild>
        <Link href="/notes">Open Notes</Link>
      </Button>
    </main>
  );
}
