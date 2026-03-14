import { useState, useRef, useCallback, useEffect } from "react";
import {
  MdPerson,
  MdEmail,
  MdSubject,
  MdMessage,
  MdSend,
  MdCheckCircle,
  MdErrorOutline,
  MdClose,
} from "react-icons/md";
import "./styles/ContactForm.css";

/* ─────────────────────────────────────────────
 * Web3Forms Configuration
 * ─────────────────────────────────────────────
 * 1. Go to https://web3forms.com/
 * 2. Enter your email and click "Create Access Key"
 * 3. Check your inbox, copy the access key
 * 4. Replace the value below with your real key
 * ───────────────────────────────────────────── */
const WEB3FORMS_ACCESS_KEY = "6a6077dd-cfd4-40a7-909c-ebfcb6b0b9ea";

/* ── Validation helpers ── */
const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

interface FormField {
  value: string;
  error: string;
  touched: boolean;
}

interface FormState {
  name: FormField;
  email: FormField;
  subject: FormField;
  message: FormField;
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

const initialField: FormField = { value: "", error: "", touched: false };

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  /* ── State ── */
  const [form, setForm] = useState<FormState>({
    name: { ...initialField },
    email: { ...initialField },
    subject: { ...initialField },
    message: { ...initialField },
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [toast, setToast] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  /* ── Auto-dismiss toast after 5s ── */
  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      5000
    );
    return () => clearTimeout(timer);
  }, [toast.visible]);

  /* ── Field-level validation ── */
  const validateField = useCallback(
    (name: keyof FormState, value: string): string => {
      const trimmed = value.trim();
      switch (name) {
        case "name":
          if (!trimmed) return "Name is required";
          if (trimmed.length < 2) return "Name must be at least 2 characters";
          return "";
        case "email":
          if (!trimmed) return "Email is required";
          if (!validateEmail(trimmed)) return "Please enter a valid email";
          return "";
        case "subject":
          if (!trimmed) return "Subject is required";
          if (trimmed.length < 3)
            return "Subject must be at least 3 characters";
          return "";
        case "message":
          if (!trimmed) return "Message is required";
          if (trimmed.length < 10)
            return "Message must be at least 10 characters";
          return "";
        default:
          return "";
      }
    },
    []
  );

  /* ── Handle input change ── */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const key = name as keyof FormState;
      setForm((prev) => ({
        ...prev,
        [key]: {
          value,
          error: prev[key].touched ? validateField(key, value) : "",
          touched: prev[key].touched,
        },
      }));
    },
    [validateField]
  );

  /* ── Handle blur — mark touched + validate ── */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const key = name as keyof FormState;
      setForm((prev) => ({
        ...prev,
        [key]: {
          value,
          error: validateField(key, value),
          touched: true,
        },
      }));
    },
    [validateField]
  );

  /* ── Full-form validation ── */
  const validateAll = useCallback((): boolean => {
    const fields: (keyof FormState)[] = [
      "name",
      "email",
      "subject",
      "message",
    ];
    let isValid = true;
    const newForm = { ...form };

    fields.forEach((key) => {
      const error = validateField(key, form[key].value);
      newForm[key] = { ...form[key], error, touched: true };
      if (error) isValid = false;
    });

    setForm(newForm);
    return isValid;
  }, [form, validateField]);

  /* ── Submit handler ── */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate all fields first
      if (!validateAll()) return;

      setStatus("sending");

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim(),
          }),
        });

        const result = await response.json();
        if (!result.success) throw new Error(result.message);

        setStatus("success");
        setToast({
          visible: true,
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });

        // Reset form after success
        setForm({
          name: { ...initialField },
          email: { ...initialField },
          subject: { ...initialField },
          message: { ...initialField },
        });
      } catch {
        setStatus("error");
        setToast({
          visible: true,
          type: "error",
          message: "Failed to send message. Please try again or email directly.",
        });
      }

      // Reset status after animation completes
      setTimeout(() => setStatus("idle"), 2000);
    },
    [form, validateAll]
  );

  /* ── Is entire form valid? (for button state) ── */
  const isFormValid =
    form.name.value.trim() &&
    form.email.value.trim() &&
    form.subject.value.trim() &&
    form.message.value.trim() &&
    !form.name.error &&
    !form.email.error &&
    !form.subject.error &&
    !form.message.error;

  return (
    <div className="cf-wrapper">
      {/* ── Section label ── */}
      <div className="cf-header">
        <span className="cf-label">Send a Message</span>
        <h3 className="cf-title">
          Drop me a <span>line</span>
        </h3>
        <p className="cf-subtitle">
          Have a project in mind or want to collaborate? Fill out the form below
          and I'll respond within 24 hours.
        </p>
      </div>

      {/* ── Form ── */}
      <form
        ref={formRef}
        className="cf-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact form"
      >
        {/* ── Row: Name + Email ── */}
        <div className="cf-row">
          <div
            className={`cf-field ${form.name.touched && form.name.error ? "cf-field--error" : ""} ${form.name.touched && !form.name.error && form.name.value ? "cf-field--valid" : ""}`}
          >
            <label htmlFor="cf-name" className="cf-field-label">
              <MdPerson aria-hidden="true" />
              Name
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
              value={form.name.value}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-required="true"
              aria-invalid={!!form.name.error}
              aria-describedby={form.name.error ? "cf-name-err" : undefined}
              data-cursor="disable"
            />
            {form.name.touched && form.name.error && (
              <span className="cf-error" id="cf-name-err" role="alert">
                <MdErrorOutline /> {form.name.error}
              </span>
            )}
          </div>

          <div
            className={`cf-field ${form.email.touched && form.email.error ? "cf-field--error" : ""} ${form.email.touched && !form.email.error && form.email.value ? "cf-field--valid" : ""}`}
          >
            <label htmlFor="cf-email" className="cf-field-label">
              <MdEmail aria-hidden="true" />
              Email
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email.value}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-required="true"
              aria-invalid={!!form.email.error}
              aria-describedby={form.email.error ? "cf-email-err" : undefined}
              data-cursor="disable"
            />
            {form.email.touched && form.email.error && (
              <span className="cf-error" id="cf-email-err" role="alert">
                <MdErrorOutline /> {form.email.error}
              </span>
            )}
          </div>
        </div>

        {/* ── Subject ── */}
        <div
          className={`cf-field ${form.subject.touched && form.subject.error ? "cf-field--error" : ""} ${form.subject.touched && !form.subject.error && form.subject.value ? "cf-field--valid" : ""}`}
        >
          <label htmlFor="cf-subject" className="cf-field-label">
            <MdSubject aria-hidden="true" />
            Subject
          </label>
          <input
            id="cf-subject"
            name="subject"
            type="text"
            placeholder="What is this about?"
            value={form.subject.value}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!form.subject.error}
            aria-describedby={
              form.subject.error ? "cf-subject-err" : undefined
            }
            data-cursor="disable"
          />
          {form.subject.touched && form.subject.error && (
            <span className="cf-error" id="cf-subject-err" role="alert">
              <MdErrorOutline /> {form.subject.error}
            </span>
          )}
        </div>

        {/* ── Message ── */}
        <div
          className={`cf-field ${form.message.touched && form.message.error ? "cf-field--error" : ""} ${form.message.touched && !form.message.error && form.message.value ? "cf-field--valid" : ""}`}
        >
          <label htmlFor="cf-message" className="cf-field-label">
            <MdMessage aria-hidden="true" />
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            placeholder="Tell me about your project, idea, or just say hello..."
            value={form.message.value}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={!!form.message.error}
            aria-describedby={
              form.message.error ? "cf-message-err" : undefined
            }
            data-cursor="disable"
          />
          <span className="cf-char-count">
            {form.message.value.length} / 1000
          </span>
          {form.message.touched && form.message.error && (
            <span className="cf-error" id="cf-message-err" role="alert">
              <MdErrorOutline /> {form.message.error}
            </span>
          )}
        </div>

        {/* ── Submit button ── */}
        <button
          type="submit"
          className={`cf-submit ${status === "sending" ? "cf-submit--sending" : ""} ${status === "success" ? "cf-submit--success" : ""}`}
          disabled={status === "sending" || !isFormValid}
          data-cursor="disable"
          aria-label="Send message"
        >
          <span className="cf-submit-content">
            {status === "idle" && (
              <>
                Send Message <MdSend />
              </>
            )}
            {status === "sending" && (
              <>
                <span className="cf-spinner" /> Sending...
              </>
            )}
            {status === "success" && (
              <>
                <MdCheckCircle /> Sent!
              </>
            )}
            {status === "error" && <>Try Again</>}
          </span>

          {/* Animated border gradient */}
          <span className="cf-submit-glow" aria-hidden="true" />
        </button>
      </form>

      {/* ── Toast notification ── */}
      <div
        className={`cf-toast ${toast.visible ? "cf-toast--visible" : ""} cf-toast--${toast.type}`}
        role="status"
        aria-live="polite"
      >
        <span className="cf-toast-icon">
          {toast.type === "success" ? <MdCheckCircle /> : <MdErrorOutline />}
        </span>
        <span className="cf-toast-msg">{toast.message}</span>
        <button
          className="cf-toast-close"
          onClick={() => setToast((t) => ({ ...t, visible: false }))}
          aria-label="Dismiss notification"
          data-cursor="disable"
        >
          <MdClose />
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
