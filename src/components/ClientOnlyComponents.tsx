"use client";

import dynamic from "next/dynamic";

const ChatBoat = dynamic(() => import("@/components/chat/ChatBoat"), { ssr: false });
const WhatsAppFloatingButton = dynamic(
  () => import("@/components/whats-app/WhatsAppFloatingButton"),
  { ssr: false }
);
const Button = dynamic(() => import("@/components/sideButton/sideButton"), { ssr: false });

export default function ClientOnlyComponents() {
  return (
    <>
      <WhatsAppFloatingButton />
      <ChatBoat />
      <Button />
    </>
  );
}
