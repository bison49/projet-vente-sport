import './footer.css';

import { AiOutlineFacebook } from 'react-icons/ai';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';

function Footer() {
  const year = new Date();
  return (
    <div className="App-footer">
      <div className="footer-wrapper">
        <div className="top-footer">
          <div className="about-us">
            <h3 className="footer-h3">A propos de sposirte</h3>
          </div>
          <div className="legal-information">
            <h3 className="footer-h3">Informations légales</h3>
          </div>
          <div className="faq">
            <h3 className="footer-h3">Des questions</h3>
          </div>
        </div>
        <div className="copyright">
          <span>sposirte &copy; {year.getFullYear()}</span>
          <span className="vertical-line-footer"></span>
          <a
            className="social-app-link"
            href="https://fr-fr.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineFacebook size={'30px'} />
          </a>
          <a
            className="social-app-link"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineLinkedin size={'30px'} />
          </a>
          <a
            className="social-app-link"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineInstagram size={'30px'} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
