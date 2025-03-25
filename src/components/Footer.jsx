const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-10">
      <p>
        &copy; {new Date().getFullYear()} Visa Navigator. All Rights Reserved.
      </p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" className="hover:text-blue-400">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-blue-400">
          Terms of Service
        </a>
        <a href="#" className="hover:text-blue-400">
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
