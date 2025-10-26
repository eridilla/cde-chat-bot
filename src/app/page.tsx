import { MessageInput } from "@/components/MessageInput";
import { ChatMessages } from "@/components/ChatMessages";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/history">
        <Button
          variant="outline"
          size="lg"
          className="absolute top-4 left-4 cursor-pointer backdrop-blur-lg z-50"
        >
          History
        </Button>
      </Link>
      <div className="flex h-screen w-full justify-center">
        <div className="flex flex-col gap-10 h-full w-full pb-10 mx-8 sm:mx-20 md:mx-40 2xl:mx-80 xl:max-w-[50dvw]">
          <ChatMessages />
          <div className="md:px-16 xl:px-32">
            <MessageInput />
          </div>
        </div>
      </div>
    </>
  );
}
