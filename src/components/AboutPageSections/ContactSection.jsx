import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

function ContactSection({ data }) {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span className="text-red-400 font-semibold tracking-wider text-lg">CONTACT US</span>
            <h2 className="text-4xl font-bold text-white mt-2">
              Get In Touch
            </h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              We're here to answer any questions you may have about our programs, admissions, or campus life.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="text-4xl text-red-400 mb-4">📍</div>
            <h3 className="text-xl font-bold mb-2">Address</h3>
            <p className="text-gray-300">{data.address}</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="text-4xl text-red-400 mb-4">✉️</div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <a href={`mailto:${data.email}`} className="text-gray-300 hover:text-red-400 transition block mb-1">
              {data.email}
            </a>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="text-4xl text-red-400 mb-4">📞</div>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <a href={`tel:${data.phone.replace(/\s+/g, '')}`} className="text-gray-300 hover:text-red-400 transition block mb-1">
              {data.phone}
            </a>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="text-4xl text-red-400 mb-4">⏰</div>
            <h3 className="text-xl font-bold mb-2">Working Hours</h3>
            <p className="text-gray-300">{data.hours}</p>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={fadeIn}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
          <div className="flex justify-center space-x-4">
            {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                aria-label={social}
              >
                <span className="text-white">📱</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;