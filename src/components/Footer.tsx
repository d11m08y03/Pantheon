import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoMailOutline } from "react-icons/io5";
import { TypingAnimation } from "./magicui/typing-animation";

export const Footer: React.FC = () => {
  return (
    <footer className="text-black py-12 mt-auto border-t-2 border-gray-200">
      <div className="container mx-auto text-center">
        <TypingAnimation className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl">Stay connected with us!</TypingAnimation>
        <p className="text-lg mb-6">Follow us on social media or drop us a message!</p>
        
        
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://www.instagram.com/uom.computerclub/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-pink-500 transition-colors duration-300 text-3xl"
          >
            <IoLogoInstagram />
          </a>
          <a
            href="https://www.facebook.com/ComputerClubMU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-600 transition-colors duration-300 text-3xl"
          >
            <IoLogoFacebook />
          </a>
          <a
            href="mailto:official@uomcomputerclub.tech"
            className="text-black hover:text-red-500 transition-colors duration-300 text-3xl"
          >
            <IoMailOutline />
          </a>
          <a
            href="https://www.linkedin.com/company/uom-computer-club/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-700 transition-colors duration-300 text-3xl"
          >
            <IoLogoLinkedin />
          </a>
        </div>

      
        <p className="mt-8 text-sm text-black">
          &copy; {new Date().getFullYear()} UoM Computer Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
