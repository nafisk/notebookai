import { SignUp } from "@clerk/nextjs";
import React from "react";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "NotebookAI - Sign Up",
  description: "Sign Up Page",
};

export default function SignUpPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp appearance={{ variables: { colorPrimary: "#0F172A" } }} />
    </div>
  );
}
