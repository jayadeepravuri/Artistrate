import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that toggles a value based on click outside of a given ref element.
 *
 * @return {object} Object containing the expanded state, setExpanded function, and ref element
 */
const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    /**
     * A function that handles the click event outside the specified reference element.
     *
     * @param {Event} e - The event object representing the click event.
     */
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return {
    expanded,
    setExpanded,
    ref,
  };
};

export default useClickOutsideToggle;