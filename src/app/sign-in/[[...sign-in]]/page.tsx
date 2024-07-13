import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

const metadata: Metadata = {
  title: "NotebookAI - Sign In",
  description: "Sign In Page",
};

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn appearance={{ variables: { colorPrimary: "#0F172A" } }} />
    </div>
  );
}
