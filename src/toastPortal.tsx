import { Toaster } from 'react-hot-toast';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export const ToasterPortal = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(<Toaster />, document.body);
};
