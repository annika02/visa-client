import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const VisaContext = createContext({});

export default function VisaProvider({ children }) {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    fetch("https://visa-navigator-server-chi.vercel.app/visas")
      .then((res) => res.json())
      .then((data) => setVisas(data));
  }, []);

  const value = {
    visas,
    setVisas,
  };

  return <VisaContext.Provider value={value}>{children}</VisaContext.Provider>;
}

VisaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
