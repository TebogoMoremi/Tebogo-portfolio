const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <a
        href="#home"
        className="footer-logo"
        onClick={scrollToTop}
      >
        TM<span>.</span>
      </a>

      <p>
        © {year} Tebogo Moremi. Built with React & Three.js.
      </p>

      <a
        href="#home"
        className="back-to-top"
        onClick={scrollToTop}
      >
        Back to top ↑
      </a>
    </footer>
  );
};

export default Footer;