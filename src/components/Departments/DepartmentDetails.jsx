import { motion } from "framer-motion";
import { useParams } from "react-router";
import { Mail, Phone, GraduationCap, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
export default function DepartmentDetails({ department }) {
  const { depo_code } = useParams();
  const [hod, setHod] = useState(null);
  const [loadingHod, setLoadingHod] = useState(true);

  const imageUrl = department?.department_image
    ? `${import.meta.env.VITE_BACKEND}${department.department_image}`
    : "https://placehold.co/600x400/EEE/31343C?text=NO+DEPARTMENT+IMAGE+AVAILABLE";

  const passColour = useMemo(() => {
    const pct = parseFloat(department?.avg_pass);
    if (isNaN(pct)) return "text-gray-600";
    if (pct >= 80) return "text-emerald-600";
    if (pct >= 60) return "text-amber-500";
    return "text-rose-600";
  }, [department?.avg_pass]);

  useEffect(() => {
    const fetchHod = async () => {
      try {
        setLoadingHod(true);
        const res = await fetch(
          `${(import.meta.env.VITE_BACKEND || "").replace(/\/$/, "")}/faculty?depo_code=${depo_code}&role=hod`
        );
        if (!res.ok) throw new Error("Failed to fetch HOD information");
        const data = await res.json();
        const hodMatch = data.find((f) => {
          const role = (f.faculty_role || "").toLowerCase();
          return role.includes("hod") || role.includes("head of department");
        });
        setHod(hodMatch || null);
      } catch (err) {
        console.error("HOD fetch error", err);
        setHod(null);
      } finally {
        setLoadingHod(false);
      }
    };

    if (depo_code) fetchHod();
  }, [depo_code]);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const StatCard = ({ label, value, Icon, valueClass = "" }) => (
    <motion.div
      variants={cardVariant}
      className="rounded-2xl bg-white shadow-lg ring-1 ring-inset ring-gray-200 p-5 flex flex-col items-center hover:-translate-y-1 hover:shadow-2xl transition-transform"
    >
      <Icon className="h-7 w-7 text-red-600 mb-2" />
      <span className={clsx("text-3xl font-black leading-none", valueClass)}>
        {value}
      </span>
      <span className="mt-1 text-sm font-medium uppercase tracking-wider text-gray-600">
        {label}
      </span>
    </motion.div>
  );

  return (
    <motion.section
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="relative isolate overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 sm:p-10"
    >
      <motion.div
        variants={containerVariant}
        className="grid gap-14 lg:grid-cols-2 lg:gap-20"
      >
        <div className="space-y-12">
          <header className="flex items-center gap-4">
            <motion.h2
              variants={cardVariant}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900"
            >
              {department?.department_name}
            </motion.h2>
            <div className="ml-auto text-[2.75rem] sm:text-6xl text-red-600 drop-shadow-md">
              {department?.icon}
            </div>
          </header>
          <motion.div variants={cardVariant}>
            {loadingHod ? (
              <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500 animate-pulse">
                Loading HOD information…
              </div>
            ) : hod ? (
              <div className="group rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-800 flex items-center gap-2">
                    <Star className="h-5 w-5" /> Head of The Department
                  </h3>
                </div>
                <div className="flex gap-6 items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-28 h-28 overflow-hidden rounded-xl border-2 border-red-300 shadow-md"
                  >
                    <img
                      src={
                        hod.image
                          ? `${import.meta.env.VITE_BACKEND}${hod.image}`
                          : "https://via.placeholder.com/200x200?text=HOD"
                      }
                      alt={hod.faculty_name}
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/200x200?text=HOD";
                      }}
                      className="w-auto h-auto object-cover"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs font-medium">View Profile</span>
                    </div> */}
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900">
                      {hod.faculty_name}
                    </h4>
                    <p className="text-gray-600 flex items-center mt-1 gap-1">
                      <GraduationCap className="w-4 h-4 text-red-500" />
                      {hod.qualification}
                    </p>
                    <p className="text-sm text-red-700 mt-2 bg-red-100 px-3 py-1 rounded-full inline-block">
                      {hod.faculty_role}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {hod.email && (
                        <motion.a
                          whileHover={{ y: -2 }}
                          href={`mailto:${hod.email}`}
                          className="flex items-center text-xs bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all"
                        >
                          <Mail className="w-4 h-4 mr-1 text-red-600" /> Email
                        </motion.a>
                      )}
                      {hod.number && (
                        <motion.a
                          whileHover={{ y: -2 }}
                          href={`tel:${hod.number}`}
                          className="flex items-center text-xs bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all"
                        >
                          <Phone className="w-4 h-4 mr-1 text-red-600" /> Contact
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 text-center text-gray-500">
                No Head of Department assigned
              </div>
            )}
          </motion.div>

          <motion.div variants={cardVariant}>
            <h3 className="mb-2 border-b border-gray-200 pb-2 text-2xl font-semibold text-red-700">
              Vision
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              {department?.vision}
            </p>
          </motion.div>

          <motion.div variants={cardVariant}>
            <h3 className="mb-2 border-b border-gray-200 pb-2 text-2xl font-semibold text-red-700">
              Mission
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-lg leading-relaxed text-gray-600">
              {department?.mission
                ?.split(".")
                .filter(Boolean)
                .map((line, i) => (
                  <li key={i}>{line.trim() + "."}</li>
                ))}
            </ul>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-12">
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.02 }}
            className="overflow-hidden rounded-3xl shadow-xl ring-4 ring-rose-100"
          >
            <img
              src={imageUrl}
              alt={`${department?.department_name} department`}
              className="h-full w-full max-w-md object-cover"
            />
          </motion.div>

          <motion.div
            variants={containerVariant}
            className="grid w-full grid-cols-1 gap-6"
          >
            <StatCard
              label="Pass %"
              value={department?.avg_pass || "N/A"}
              Icon={GraduationCap}
              valueClass={passColour}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}