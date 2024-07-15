import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/app/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function NavBar() {
  return (
    <div className="p-4 shadow">
      <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <Link className="flex items-center gap-1" href="/notes">
          <Image src={logo} alt="Logo" width={40} height={40} />
          <span className="font-bold">NotebookAI</span>
        </Link>
        <div className="flex items-center gap-2">
          <UserButton
            afterSwitchSessionUrl="/"
            appearance={{
              elements: {
                avatarBox: { width: "2.5rem", height: "2.5rem" },
              },
            }}
          />
          <Button>
            <Plus size={20} className="mr-2" />
            Add Note
          </Button>
        </div>
      </div>
    </div>
  );
}
