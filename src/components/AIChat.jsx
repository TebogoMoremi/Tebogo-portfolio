import WhatsAppButton from "./WhatsAppButton";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  "What are Tebogo's strongest technical skills?",
  "Tell me about his AWS experience.",
  "What projects has he built?",
  "What backend technologies does he use?",
];

export default function AIChat({ initiallyOpen = false }) {
  const reducedMotion = useReducedMotion();
  const toggleRef = useRef(null);
  const inputRef = useRef(null);
  const closeChat = () => { setIsOpen(false); toggleRef.current?.focus(); };
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey there! I'm Tebogo's portfolio assistant. I can tell you about his development experience, technical skills, projects and cloud engineering work. What would you like to know?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [rateLimitSeconds, setRateLimitSeconds] =
    useState(0);
  const isRateLimited = rateLimitSeconds > 0;

  const messagesEndRef = useRef(null);

  /*
   * Automatically scroll to the latest message.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "end",
    });
  }, [messages, isLoading, isRateLimited, reducedMotion]);

  useEffect(() => { if (isOpen) inputRef.current?.focus(); }, [isOpen]);

  /*
   * Rate-limit countdown.
   */
  useEffect(() => {
    if (!isRateLimited) {
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
      <div className="floating-actions">
      <motion.button
        ref={toggleRef}
        className="ai-chat-toggle"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open portfolio assistant"
        aria-expanded={isOpen}
        aria-controls="portfolio-assistant"
      >
        <FiMessageCircle />

        <span>
          Ask Tebogo AI
        </span>
      </motion.button>

      {!isOpen && <WhatsAppButton floating />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="portfolio-assistant"
            role="dialog"
            aria-label="Portfolio assistant"
            onKeyDown={event => { if (event.key === "Escape") closeChat(); }}
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
                onClick={closeChat}
                aria-label="Close portfolio assistant"
              >
                <FiX />
              </button>
            </div>

            {/* Messages */}
            <div className="ai-chat-messages" role="log" aria-live="polite" aria-relevant="additions text" aria-busy={isLoading}>
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
                  <span className="sr-only">Preparing an answer</span>
                  <div className="ai-typing" aria-hidden="true">
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
                ref={inputRef}
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
