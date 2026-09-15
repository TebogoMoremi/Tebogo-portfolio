import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  FiMessageCircle,
  FiSend,
  FiX,
  FiCpu,
  FiClock,
} from "react-icons/fi";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

const SUGGESTED_QUESTIONS = [
  "What are Tebogo's strongest skills?",
  "What AWS experience does Tebogo have?",
  "Which projects demonstrate Java?",
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Tebogo's portfolio assistant. Ask me about his skills, experience, projects, or DevOps and cloud work.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isRateLimited, setIsRateLimited] =
    useState(false);

  const [rateLimitSeconds, setRateLimitSeconds] =
    useState(0);

  const messagesEndRef = useRef(null);

  /*
   * Automatically scroll to the latest message.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading, isRateLimited]);

  /*
   * Rate-limit countdown.
   */
  useEffect(() => {
    if (!isRateLimited) {
      return;
    }

    if (rateLimitSeconds <= 0) {
      setIsRateLimited(false);
      return;
    }

    const timer = setTimeout(() => {
      setRateLimitSeconds((seconds) =>
        Math.max(seconds - 1, 0)
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRateLimited, rateLimitSeconds]);

  /*
   * Send a message to the Spring Boot backend.
   */
  const sendMessage = async (messageText) => {
    const message = messageText.trim();

    if (!message || isLoading || isRateLimited) {
      return;
    }

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message,
          }),
        }
      );

      /*
       * Backend rate limit.
       */
      if (response.status === 429) {
        setIsRateLimited(true);
        setRateLimitSeconds(60);

        setMessages((previous) => [
          ...previous,
          {
            role: "assistant",
            content:
              "You've reached the chat request limit. Please wait about a minute before asking another question.",
          },
        ]);

        return;
      }

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            data.answer ||
            "I couldn't generate a response. Please try again.",
        },
      ]);
    } catch (error) {
      console.error(
        "Portfolio AI request failed:",
        error
      );

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "The portfolio assistant is temporarily unavailable. Please try again shortly.",
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
      {/* Floating chatbot button */}
      <motion.button
        className="ai-chat-toggle"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open portfolio assistant"
      >
        <FiMessageCircle />

        <span>
          Ask Tebogo AI
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-panel"
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-header-info">
                <div className="ai-chat-avatar">
                  <FiCpu />
                </div>

                <div>
                  <h3>
                    Ask Tebogo AI
                  </h3>

                  <div className="ai-chat-status">
                    <span className="ai-status-dot" />

                    Portfolio Assistant
                  </div>
                </div>
              </div>

              <button
                className="ai-chat-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close portfolio assistant"
              >
                <FiX />
              </button>
            </div>

            {/* Messages */}
            <div className="ai-chat-messages">
              {messages.map((message, index) => {
                const isUser =
                  message.role === "user";

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`ai-message ${
                      isUser
                        ? "ai-message-user"
                        : "ai-message-assistant"
                    }`}
                  >
                    {isUser ? (
                      <span className="ai-user-text">
                        {message.content}
                      </span>
                    ) : (
                      /*
                       * IMPORTANT:
                       * Keep Markdown inside its own wrapper.
                       * This prevents global portfolio styles
                       * from breaking lists and paragraphs.
                       */
                      <div className="ai-markdown">
                        <ReactMarkdown>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Suggested questions */}
              {messages.length === 1 &&
                !isLoading &&
                !isRateLimited && (
                  <div className="ai-suggestions">
                    {SUGGESTED_QUESTIONS.map(
                      (question) => (
                        <button
                          key={question}
                          type="button"
                          onClick={() =>
                            sendMessage(question)
                          }
                        >
                          {question}
                        </button>
                      )
                    )}
                  </div>
                )}

              {/* Typing indicator */}
              {isLoading && (
                <div className="ai-message ai-message-assistant ai-loading-message">
                  <div className="ai-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              {/* Rate limit */}
              {isRateLimited && (
                <div className="ai-rate-limit">
                  <FiClock />

                  <span>
                    Available again in{" "}
                    {rateLimitSeconds}s
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              className="ai-chat-input"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                placeholder={
                  isRateLimited
                    ? `Try again in ${rateLimitSeconds}s`
                    : "Ask about Tebogo..."
                }
                maxLength={500}
                disabled={
                  isLoading ||
                  isRateLimited
                }
                aria-label="Ask about Tebogo"
              />

              <button
                type="submit"
                disabled={
                  !input.trim() ||
                  isLoading ||
                  isRateLimited
                }
                aria-label="Send message"
              >
                <FiSend />
              </button>
            </form>

            {/* Footer */}
            <div className="ai-chat-footer">
              {isRateLimited
                ? `Available again in ${rateLimitSeconds}s`
                : "Powered by Tebogo's portfolio AI"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}