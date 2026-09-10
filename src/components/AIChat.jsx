import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";

const suggestedQuestions = [
  "What are Tebogo's strongest skills?",
  "What AWS experience does Tebogo have?",
  "Which projects demonstrate Java?",
];

// Local: http://localhost:8080
// Production: CloudFront -> ALB -> ECS -> Spring Boot
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://d2axaeq2znzcoy.cloudfront.net";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm Tebogo's AI portfolio assistant. Ask me about his skills, projects, experience or DevOps work.",
    },
  ]);

  // Automatically scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const sendMessage = async (message) => {
    const cleanMessage = message.trim();

    if (!cleanMessage || isLoading) {
      return;
    }

    // Display user message
    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: cleanMessage,
      },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: cleanMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            data.answer ||
            "I couldn't generate an answer.",
        },
      ]);
    } catch (error) {
      console.error(
        "AI assistant request failed:",
        error
      );

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            "Sorry, I couldn't reach the portfolio assistant. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat"
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {/* HEADER */}
            <div className="ai-chat-header">
              <div className="ai-chat-title">
                <div className="ai-chat-avatar">
                  <FaRobot />
                </div>

                <div>
                  <h3>Ask Tebogo AI</h3>

                  <span>
                    <i />
                    Portfolio Assistant
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="ai-chat-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI assistant"
              >
                <FaTimes />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="ai-chat-messages">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`ai-message ${message.role}`}
                >
                  {message.role === "assistant" && (
                    <div className="ai-message-icon">
                      <FaRobot />
                    </div>
                  )}

                  <div className="ai-message-bubble">
                    {message.role === "assistant" ? (
                      <ReactMarkdown>
                        {message.text}
                      </ReactMarkdown>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}

              {/* TYPING INDICATOR */}
              {isLoading && (
                <div className="ai-message assistant">
                  <div className="ai-message-icon">
                    <FaRobot />
                  </div>

                  <div className="ai-message-bubble ai-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              {/* SUGGESTED QUESTIONS */}
              {messages.length === 1 && !isLoading && (
                <div className="ai-suggestions">
                  <p>Try asking:</p>

                  {suggestedQuestions.map((question) => (
                    <button
                      type="button"
                      key={question}
                      onClick={() =>
                        sendMessage(question)
                      }
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <form
              className="ai-chat-input"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder={
                  isLoading
                    ? "Tebogo AI is thinking..."
                    : "Ask about Tebogo..."
                }
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                disabled={isLoading}
                maxLength={500}
                autoComplete="off"
                aria-label="Ask Tebogo AI"
              />

              <button
                type="submit"
                disabled={
                  !input.trim() || isLoading
                }
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </form>

            <div className="ai-chat-footer">
              AI-powered portfolio assistant
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BUTTON */}
      <motion.button
        type="button"
        className="ai-chat-trigger"
        onClick={() =>
          setIsOpen((current) => !current)
        }
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.96,
        }}
        aria-label="Open Ask Tebogo AI"
      >
        <FaRobot />
        <span>Ask Tebogo AI</span>
        <i className="ai-trigger-status" />
      </motion.button>
    </>
  );
};

export default AIChat;