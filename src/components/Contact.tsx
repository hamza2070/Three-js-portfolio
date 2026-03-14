import { MdArrowOutward, MdCopyright } from "react-icons/md";
import ContactForm from "./ContactForm";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        {/* ── CTA Header ── */}
        <div className="contact-cta">
          <span className="contact-label">Get In Touch</span>
          <h3>
            Let's work <span>together</span>
          </h3>
          <p className="contact-desc">
            Open to remote Senior SWE, React Native Lead, and Full-Stack roles.
          </p>
        </div>

        {/* ── Contact Info + Form grid ── */}
        <div className="contact-main">
          {/* ── Left: info cards ── */}
          <div className="contact-info-col">
            <div className="contact-flex">
              <div className="contact-box">
                <h4>Email</h4>
                <p>
                  <a
                    href="mailto:hamza.207029@gmail.com"
                    data-cursor="disable"
                  >
                    hamza.207029@gmail.com
                  </a>
                </p>
                <h4>Location</h4>
                <p>Lahore, Pakistan</p>
                <h4>Education</h4>
                <p>BSCS — Virtual University of Pakistan</p>
              </div>
              <div className="contact-box">
                <h4>Social</h4>
                <a
                  href="https://github.com/hamza2070"
                  target="_blank"
                  data-cursor="disable"
                  className="contact-social"
                >
                  Github <MdArrowOutward />
                </a>
                <a
                  href="https://www.linkedin.com/in/syed-ameer-hamza-gillani"
                  target="_blank"
                  data-cursor="disable"
                  className="contact-social"
                >
                  Linkedin <MdArrowOutward />
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: contact form ── */}
          <div className="contact-form-col">
            <ContactForm />
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="contact-footer">
          <h2>
            Designed and Developed by <span>Hamza Gillani</span>
          </h2>
          <h5>
            <MdCopyright /> 2025
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Contact;
