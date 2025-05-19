import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: '1. AP POLYCET Application',
    description: `Students must first apply for the Andhra Pradesh Polytechnic Common Entrance Test (AP POLYCET) through the official website.`,
    link: {
      url: 'https://polycetap.nic.in',
      text: 'polycetap.nic.in',
    },
  },
  {
    title: '2. Entrance Exam',
    description: `Candidates appear for the AP POLYCET exam, which tests basic knowledge in Mathematics, Physics, and Chemistry.`,
  },
  {
    title: '3. Result Declaration',
    description: `AP POLYCET results are usually declared within 10–15 days of the exam. Students can check their ranks and download the rank card online.`,
  },
  {
    title: '4. Web Counselling & Option Entry',
    description: `Qualified candidates are called for web-based counselling. They need to verify documents at designated Help Line Centres (HLCs) and choose preferred colleges and courses online during the option entry window.`,
  },
  {
    title: '5. Seat Allotment',
    description: `Based on rank, category, and preferences, seats are allotted. Students can download the allotment letter and report to the allotted college.`,
  },
  {
    title: '6. Admission at College',
    description: `Students must report to Government Polytechnic College, Chodavaram with the allotment letter, original documents, and pay the admission fees. Orientation and academic session details will be provided by the college.`,
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const AdmissionProcess = () => {
  return (
    <section id="admission" className="bg-white py-16 px-4 md:px-20">
      <motion.h2
        className="text-3xl font-bold text-red-700 mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Admission Process
      </motion.h2>

      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="p-6 border-l-4 border-red-500 bg-gray-50 rounded-md shadow"
            variants={cardVariants}
          >
            <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
            <p className="text-gray-700 mt-2">
              {step.description}
              {step.link && (
                <>
                  {' '}
                  (
                  <a
                    href={step.link.url}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {step.link.text}
                  </a>
                  )
                </>
              )}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AdmissionProcess;
