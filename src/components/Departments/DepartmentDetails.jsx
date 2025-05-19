import { motion } from "framer-motion";

function DepartmentDetails({ department }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-100 flex items-center justify-between"
    >
      <div>
        <div className="flex items-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {department?.department_name}
          </h2>
          <div className="ml-auto text-4xl text-red-600">
            {department?.icon}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-red-700 mb-2 pb-2 border-b border-gray-200">
              Vision
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {department?.vision}
            </p>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-red-700 mb-2 pb-2 border-b border-gray-200">
              Average Pass Percentage
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {department?.avg_pass || "No Pass Percentage Available"}
            </p>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-red-700 mb-4 pb-2 border-b border-gray-200">
              Mission
            </h3>
            <ul className="list-disc text-gray-600 leading-relaxed">
              {department?.mission?.split(".").map((line, index) => {
                if (line.trim() === "") return null; // Skip empty lines
                return (
                  <li key={index} className="">
                    {line.trim() + "."}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <img
          src={
            department?.department_image ||
            "https://placehold.co/600x400/EEE/31343C?text=NO+DEPARTMENT+IMAGE+AVAILABLE"
          }
          alt=""
        />
      </div>
    </motion.div>
  );
}

export default DepartmentDetails;
