const formEndpoint =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/your-form-id";
const showFormNote = import.meta.env.DEV;

function ContactForm() {
  return (
    <form
      action={formEndpoint}
      className="contact-form"
      method="POST"
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
      {showFormNote ? (
        <p className="form-note">
          Set <code>VITE_FORMSPREE_ENDPOINT</code> in a <code>.env</code> file to enable
          direct Formspree submissions.
        </p>
      ) : null}
    </form>
  );
}

export default ContactForm;
