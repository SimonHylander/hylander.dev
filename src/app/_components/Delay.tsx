import { useState, useEffect, ReactNode } from "react";

const Delayed = ({
  children,
  delay = 500,
}: {
  children: ReactNode;
  delay?: number;
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return show ? children : null;
};

export default Delayed;
