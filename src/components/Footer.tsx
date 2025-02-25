import { HyperText } from "./magicui/hyper-text";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { IoLogoInstagram, IoLogoFacebook, IoLogoLinkedin, IoMailOutline } from "react-icons/io5"; // Icons from React Icons
import { TypingAnimation } from "./magicui/typing-animation";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-800 text-white py-12 mt-20">
      <div className="container mx-auto text-center">
      <TypingAnimation>Stay connected with us!</TypingAnimation>
        <p className="text-lg mb-6">Follow us on social media or drop us a message!</p>
        
        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://www.instagram.com/uom.computerclub/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500 transition-colors duration-300 text-3xl"
          >
            <IoLogoInstagram />
          </a>
          <a
            href="https://www.facebook.com/ComputerClubMU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600 transition-colors duration-300 text-3xl"
          >
            <IoLogoFacebook />
          </a>
          <a
            href="mailto:official@uomcomputerclub.tech"
            className="text-white hover:text-red-500 transition-colors duration-300 text-3xl"
          >
            <IoMailOutline />
          </a>
          <a
            href="https://www.linkedin.com/company/uom-computer-club/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-700 transition-colors duration-300 text-3xl"
          >
            <IoLogoLinkedin />
          </a>
        </div>

    

        {/* Copyright Notice */}
        <p className="mt-8 text-sm text-white">
          &copy; 2025 UoM Computer Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
