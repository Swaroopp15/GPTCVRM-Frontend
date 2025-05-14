import React from "react";
import { Link } from "react-router";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <nav className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
          <Link to="/" className="hover:underline transition-colors duration-200">
            Home
          </Link>
          <Link to="/departments" className="hover:underline transition-colors duration-200">
            Departments
          </Link>
          <Link to="/notifications" className="hover:underline transition-colors duration-200">
            Notifications
          </Link>
          <Link to="/events" className="hover:underline transition-colors duration-200">
            Events
          </Link>
          <Link to="/contact" className="hover:underline transition-colors duration-200">
            Contact
          </Link>
        </nav>

        <p className="text-gray-400 text-xs text-center md:text-right">
          &copy; {currentYear} Government Polytechnic Chodavaram. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
