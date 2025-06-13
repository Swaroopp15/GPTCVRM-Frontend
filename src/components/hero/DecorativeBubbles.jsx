import React from "react";

export function DecorativeBubbles() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      {[
        { className: "left-[-6rem] top-[-6rem] w-64 h-64", color: "bg-red-400", delay: "animation-delay-0" },
        { className: "right-0 top-1/4 w-96 h-96", color: "bg-blue-400", delay: "animation-delay-2000" },
        { className: "left-1/4 bottom-0 w-80 h-80", color: "bg-amber-400", delay: "animation-delay-4000" },
        { className: "right-1/3 bottom-[-5rem] w-56 h-56", color: "bg-teal-400", delay: "animation-delay-3000" },
      ].map(({ className, color, delay }, i) => (
        <div
          key={i}
          className={`absolute ${className} rounded-full ${color} mix-blend-multiply filter blur-xl opacity-20 animate-float ${delay}`}
        />
      ))}
    </div>
  );
}

export default DecorativeBubbles;
