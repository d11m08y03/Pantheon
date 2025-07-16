import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoMailOutline, IoLocationOutline } from "react-icons/io5";
import { TypingAnimation } from "./magicui/typing-animation";

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 mt-16 border-t-2 border-gray-800 bg-white text-black dark:bg-black dark:text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">About Us</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              The UoM Computer Club is a student-led organization dedicated to fostering 
              technology innovation and learning at the University of Mauritius.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">Quick Links</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm transition-colors">
                Home
              </a>
              <a href="/PastEvents" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm transition-colors">
                Past Events
              </a>
              <a href="/Login" className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm transition-colors">
                Member Login
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-black dark:text-white">Contact Info</h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <IoLocationOutline className="text-gray-500 dark:text-gray-400" />
                <span>University of Mauritius, Réduit</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <IoMailOutline className="text-gray-500 dark:text-gray-400" />
                <a href="mailto:uomcomputerclub25@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">
                uomcomputerclub25@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center border-t border-gray-800 pt-8">
          <TypingAnimation className="text-xl md:text-2xl mb-4">Stay connected with us!</TypingAnimation>
          <p className="text-gray-700 dark:text-gray-300 mb-6">Follow us on social media for the latest updates and events!</p>
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://www.instagram.com/uom.computerclub/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 text-2xl p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Follow us on Instagram"
          >
            <IoLogoInstagram />
          </a>
          <a
            href="https://www.facebook.com/ComputerClubMU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 text-2xl p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Like us on Facebook"
          >
            <IoLogoFacebook />
          </a>
          <a
            href="mailto:uomcomputerclub25@gmail.com"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 text-2xl p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Send us an email"
          >
            <IoMailOutline />
          </a>
          <a
            href="https://www.linkedin.com/company/uom-computer-club/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 text-2xl p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Connect with us on LinkedIn"
          >
            <IoLogoLinkedin />
          </a>
        </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} UoM Computer Club. All rights reserved.
        </p>
        </div>
      </div>
    </footer>
  );
};
