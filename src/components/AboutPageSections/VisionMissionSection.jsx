import React from "react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function VisionMissionSection({ data }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="bg-gray-50 p-8 rounded-xl border-l-4 border-red-600 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-3">🌟</span> Our Vission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {data.vision}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="bg-gray-50 p-8 rounded-xl border-l-4 border-blue-600 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-3">🎯</span> Our Misssion
            </h3>
            <ul  className="list-disc text-gray-600 leading-relaxed">
              {data?.mission?.split(".").map((line, index) => {
                if (line.trim() === "") return null; // Skip empty lines
                return (
                  <li key={index} className="">
                    {line.trim() + "."}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default VisionMissionSection;
