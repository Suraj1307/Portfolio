function ScrollToTopButton({ show }) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Scroll to top"
      className={`scroll-top ${show ? "visible" : ""}`}
      onClick={handleClick}
      type="button"
    >
      ↑
    </button>
  );
}

export default ScrollToTopButton;
