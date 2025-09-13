// ScriptLoader.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScriptLoader = () => {
  const location = useLocation();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/script.js'; // ścieżka do Twojego skryptu w public
    script.async = true;
    
    document.body.appendChild(script);
    
    // Cleanup - usuń skrypt przy unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [location]); // Wykonaj przy każdej zmianie strony

  return null; // Komponent nie renderuje nic
};

export default ScriptLoader;