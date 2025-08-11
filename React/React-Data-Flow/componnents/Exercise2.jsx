import { useState } from "react";
import Conversation from "./Conversation.jsx";
import List from "./List.jsx";

export default function Exercise2() {
  const [showConversation, setShowConversation] = useState({
    displayConversation: null,
    conversations: [
      {
        with: "Laura",
        convo: [
          { text: "Hi", sender: "self" },
          { text: "You there?", sender: "self" },
          { text: "Yeah, hi, what's up?", sender: "other" },
        ],
      },
      {
        with: "Dad",
        convo: [
          { text: "Have you finished your school work yet?", sender: "other" },
          { text: "Yes.", sender: "self" },
          { text: "What do you mean, yes?", sender: "other" },
          { text: "??", sender: "self" },
        ],
      },
      {
        with: "Shoobert",
        convo: [
          { text: "Shoobert!!!", sender: "self" },
          { text: "Dude!!!!!!!!", sender: "other" },
          { text: "Shooooooooo BERT!", sender: "self" },
          { text: "You're my best friend", sender: "other" },
          { text: "No, *you're* my best friend", sender: "self" },
        ],
      },
    ],
  });

  const handleDisply = (contactName) => {
    setShowConversation((prev) => ({
      ...prev,
      displayConversation: contactName,
    }));
  };

  const handleCloseConversation = () => {
    setShowConversation((prev) => ({
      ...prev,
      displayConversation: null,
    }));
  };

  const currentConversation = showConversation.conversations.find(
    (c) => c.with === showConversation.displayConversation
  );

  return (
    <>
      {showConversation.displayConversation === null ? (
        <List
          contacts={showConversation.conversations.map((c) => c.with)}
          onContactClick={handleDisply}
        />
      ) : (
        <Conversation
          convo={currentConversation.convo}
          contactName={currentConversation.with}
          onClose={handleCloseConversation}
        />
      )}
    </>
  );
}
