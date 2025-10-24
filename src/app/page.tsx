import { MessageInput } from "@/components/MessageInput";
import { ChatMessages } from "@/components/ChatMessages";

export default function Home() {
  return (
    <div className="flex h-screen w-full justify-center">
      <div className="flex flex-col gap-10 h-full w-full mx-8 sm:mx-20 md:mx-40 2xl:mx-80 xl:max-w-[50dvw] py-10">
        <ChatMessages />
        <div className="md:px-16 xl:px-32">
          <MessageInput />
        </div>
      </div>
    </div>
  );
}
