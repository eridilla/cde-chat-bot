import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HistoryMessages } from "@/components/HistoryMessages";

export default function HistoryPage() {
  return (
    <>
      <Link href="/">
        <Button
          variant="outline"
          size="lg"
          className="absolute top-4 left-4 cursor-pointer backdrop-blur-lg z-50"
        >
          Chat
        </Button>
      </Link>
      <div className="flex h-screen w-full justify-center">
        <div className="flex flex-col h-full w-full mx-8 sm:mx-20 md:mx-40 2xl:mx-80 xl:max-w-[50dvw]">
          <HistoryMessages />
        </div>
      </div>
    </>
  );
}
