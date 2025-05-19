import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const GoToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
        aria-label="Go to top"
      >
        <ArrowUp size={20} />
      </button>
    )
  );
};

export default GoToTop;
