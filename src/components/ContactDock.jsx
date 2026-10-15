import { Component, lazy, Suspense, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import WhatsAppButton from "./WhatsAppButton";

const AIChat = lazy(() => import("./AIChat"));
class ChatBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <div className="chat-load-error" role="alert">The assistant could not load. <a href="#contact">Use a contact option</a> or <button onClick={() => window.location.reload()}>reload the page</button>.</div> : this.props.children;
  }
}
export default function ContactDock() {
  const [opened, setOpened] = useState(false);
  const launcher = <div className="floating-actions">
    <button className="ai-chat-toggle" onClick={() => setOpened(true)} aria-label="Open portfolio assistant" aria-busy={opened}>
      <FiMessageCircle aria-hidden="true" /><span>{opened ? "Loading assistant…" : "Ask Tebogo AI"}</span>
    </button>
    <WhatsAppButton floating />
  </div>;
  return opened ? <ChatBoundary><Suspense fallback={launcher}><AIChat initiallyOpen /></Suspense></ChatBoundary> : launcher;
}
