import { useState } from "react";

const formEndpoint =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/your-form-id";
const hasLiveEndpoint = !formEndpoint.includes("your-form-id");

function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    if (!hasLiveEndpoint) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name")?.toString().trim() || "";
      const email = formData.get("email")?.toString().trim() || "";
      const message = formData.get("message")?.toString().trim() || "";
      const subject = encodeURIComponent(`Portfolio enquiry from ${name || "visitor"}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      );
      window.location.href = `mailto:surajrajnkh1244@gmail.com?subject=${subject}&body=${body}`;
      setStatus("success");
      return;
    }

    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      event.currentTarget.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form
      action={formEndpoint}
      className="contact-form"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Your name" required type="text" />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about the role or project."
          required
          rows="5"
        />
      </div>

      <input name="_subject" type="hidden" value="Portfolio contact from Suraj Kumar site" />
      <button className="button primary form-submit" type="submit">
        Send Message
      </button>
      {status === "success" ? (
        <p className="form-status success">Message sent! I&apos;ll get back to you soon.</p>
      ) : null}
      {status === "error" ? (
        <p className="form-status error">Something went wrong. Please try again.</p>
      ) : null}
    </form>
  );
}

export default ContactForm;
