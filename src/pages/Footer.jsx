import React from "react";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/courses" className="hover:underline">Courses</Link>
        <Link to="/announcements" className="hover:underline">Announcements</Link>
        <Link to="/events" className="hover:underline">Events</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </div>
      <p className="mt-4 text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Polytechnic College. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
