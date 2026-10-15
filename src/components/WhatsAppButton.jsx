import { FaWhatsapp } from "react-icons/fa";

export const whatsappMessage = "Hi Tebogo, I came across your developer portfolio and would like to connect regarding a software development opportunity.";
export const whatsappUrl = `https://wa.me/27782708321?text=${encodeURIComponent(whatsappMessage)}`;

export default function WhatsAppButton({ floating = false }) {
  return <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
    className={floating ? "whatsapp-floating" : "whatsapp-contact-action"}
    aria-label="Chat with Tebogo on WhatsApp (opens in a new tab)">
    <FaWhatsapp aria-hidden="true" />
    {floating ? <span className="whatsapp-tooltip">Chat with me on WhatsApp</span> : <span>Start a Chat</span>}
  </a>;
}
