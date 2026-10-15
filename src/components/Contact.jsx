import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import GlassCard from "./GlassCard";
import WhatsAppButton from "./WhatsAppButton";
const emailSubject = "Software development opportunity";
const emailBody = "Hi Tebogo,\n\nI came across your developer portfolio and would like to connect regarding a software development opportunity.\n\nCompany: \nRole: \n\nKind regards,\n";
const emailUrl = `mailto:herroldmoremi@hotmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

const contacts = [
  { title: "Email", description: "herroldmoremi@hotmail.com", action: "Send Email", href: emailUrl, Icon: FaEnvelope },
  { title: "LinkedIn", description: "Connect with me professionally.", action: "Connect on LinkedIn", href: "https://www.linkedin.com/in/tebogo-herrold-moremi-782746157/", Icon: FaLinkedin },
  { title: "GitHub", description: "Explore my code and projects.", action: "View GitHub", href: "https://github.com/TebogoMoremi", Icon: FaGithub },
];
export default function Contact() {
  return <section id="contact" className="contact-section">
    <div className="contact-container">
      <div className="contact-content">
        <p className="section-label">CONTACT</p>
        <h2>Let's connect and <span>build something great.</span></h2>
        <p>I'm open to software development, backend, full-stack and cloud-focused opportunities. If you're recruiting, collaborating on a project or interested in my work, feel free to reach out.</p>
      </div>
      <div className="contact-card-grid">
        {contacts.map(({ title, description, action, href, Icon }) => <GlassCard as="a" className="contact-card contact-card-link" key={title} href={href}
          aria-label={title === "Email" ? "Email Tebogo about a software development opportunity" : action}
          {...(href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          <Icon className="contact-card-icon" aria-hidden="true" />
          <h3>{title}</h3><p>{description}</p>
          <span className="contact-card-action">{action}<span aria-hidden="true">{" \u2197"}</span></span>
          {title === "Email" && <small className="contact-email-hint">Opens a draft in your email app.</small>}
        </GlassCard>)}
        <GlassCard as="article" className="contact-card contact-card-whatsapp">
          <FaWhatsapp className="contact-card-icon" aria-hidden="true" />
          <h3>WhatsApp</h3><p>Have a question or opportunity? Let's have a conversation.</p>
          <WhatsAppButton />
        </GlassCard>
      </div>
    </div>
  </section>;
}
