import { motion } from "framer-motion";

function DepartmentDetails({ department }) {
  const imageUrl = department?.department_image
    ? `${import.meta.env.VITE_BACKEND}${department.department_image}`
    : "https://placehold.co/600x400/EEE/31343C?text=NO+DEPARTMENT+IMAGE+AVAILABLE";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-gray-100 flex flex-col lg:flex-row gap-8"
    >
      {/* Text Section */}
      <div className="flex-1">
        <div className="flex items-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {department?.department_name}
          </h2>
          <div className="ml-auto text-4xl text-red-600">
            {department?.icon}
          </div>
        </div>

        <div className="space-y-6">
          {/* Vision */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-red-700 mb-2 pb-2 border-b border-gray-200">
              Vision
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {department?.vision}
            </p>
          </div>

          {/* Average Pass Percentage */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-red-700 mb-2 pb-2 border-b border-gray-200">
              Average Pass Percentage
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {department?.avg_pass || "No Pass Percentage Available"}
            </p>
          </div>

          {/* Mission */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-red-700 mb-2 pb-2 border-b border-gray-200">
              Mission
            </h3>
            <ul className="list-disc pl-5 text-gray-600 leading-relaxed space-y-1">
              {department?.mission
                ?.split(".")
                .filter(Boolean)
                .map((line, index) => (
                  <li key={index}>{line.trim() + "."}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={imageUrl}
          alt={`${department?.department_name} department`}
          className="w-full max-w-md h-auto rounded-lg object-cover shadow-md"
        />
      </div>
    </motion.div>
  );
}

export default DepartmentDetails;
