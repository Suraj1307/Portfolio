function ScrollToTopButton({ show }) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Scroll to top"
      className={`scroll-top ${show ? "visible" : ""}`}
      onClick={handleClick}
      title="Back to top"
      type="button"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}

export default ScrollToTopButton;
