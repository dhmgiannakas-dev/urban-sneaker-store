import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © {currentYear} URBAN. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;