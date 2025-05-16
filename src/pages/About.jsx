import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Context } from '../../Context/Context';

function About() {
  const { college } = useContext(Context);
  
  const hero = {
    title: "Welcome to Our College",
    subtitle: "Shaping the future since 2017",
  };

  const about = {
    title: "About Our College",
    description: "Established in 2017, our college is dedicated to academic excellence, innovation, and holistic development. We offer a dynamic learning environment where students can explore their full potential.",
    raggingFree: "Our college is a ragging-free college, ensuring a safe and friendly environment for all students."
  };

  const whyChooseUs = [
    {
      title: "Academic Excellence",
      description: "Highly qualified faculty and modern curriculum.",
      icon: "🎓"
    },
    {
      title: "Modern Infrastructure",
      description: "State-of-the-art labs, libraries, and research centers.",
      icon: "🏛️"
    },
    {
      title: "Vibrant Student Life",
      description: "Clubs, cultural events, and sports activities.",
      icon: "🎭"
    }
  ];

  const journey = [
    {
      year: "2017",
      event: "Foundation Year",
      description: "College established with a vision for excellence."
    },
    {
      year: "2020",
      event: "Expansion & Growth",
      description: "New departments and facilities introduced."
    },
    {
      year: "2024",
      event: "National Recognition",
      description: "Ranked among the top emerging institutions."
    }
  ];

  const contact = {
    address: "123 College Road, City, Country",
    email: "contact@college.edu",
    phone: "+123 456 7890"
  };

  // Animation variants
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
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen text-gray-900">
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: college?.college_image ? `url(${college.college_image})` : 'linear-gradient(to right, #4a044e, #1a1a2e)',
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-1" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            {hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light">
            {hero.subtitle}
          </p>
          <div className="mt-8">
            <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore More
            </button>
          </div>
        </motion.div>
      </section>

      <div className="relative z-10 bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto py-20 px-6 text-center"
        >
          <motion.div variants={itemVariants}>
            <span className="text-red-600 font-semibold tracking-wider">ABOUT US</span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-6">
              {about.title}
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                {about.description}
              </p>
              <div className="mt-6 inline-flex items-center bg-green-100 px-4 py-2 rounded-full">
                <span className="text-green-800 font-medium">
                  {about.raggingFree}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-12"
            >
              <motion.div variants={itemVariants}>
                <span className="text-red-600 font-semibold tracking-wider">WHY CHOOSE US</span>
                <h2 className="text-4xl font-bold text-gray-800 mt-2">
                  Our Key Differentiators
                </h2>
              </motion.div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey - Fixed Timeline */}
        <section className="py-20 bg-gradient-to-r from-red-50 to-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-12"
            >
              <motion.div variants={itemVariants}>
                <span className="text-red-600 font-semibold tracking-wider">OUR JOURNEY</span>
                <h2 className="text-4xl font-bold text-gray-800 mt-2">
                  Milestones & Achievements
                </h2>
              </motion.div>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-red-200 to-red-400 transform -translate-x-1/2 hidden md:block"></div>
              
              {journey.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  className={`mb-12 md:flex items-center w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className={`p-6 bg-white rounded-xl shadow-md relative ${
                      index % 2 === 0 ? 'md:ml-0' : 'md:mr-0'
                    }`}>
                      {/* Timeline dot */}
                      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full z-10" 
                        style={{
                          left: index % 2 === 0 ? 'calc(100% + 32px)' : '-36px',
                          right: index % 2 !== 0 ? 'calc(100% + 32px)' : 'auto'
                        }}></div>
                      <div className="text-red-600 font-bold text-lg mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {milestone.event}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  {/* Empty space for alignment */}
                  <div className="hidden md:block md:w-2/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-12"
            >
              <motion.div variants={itemVariants}>
                <span className="text-red-400 font-semibold tracking-wider">CONTACT US</span>
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
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div 
                variants={itemVariants}
                className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-all duration-300"
              >
                <div className="text-4xl text-red-400 mb-4">📍</div>
                <h3 className="text-xl font-bold mb-2">Address</h3>
                <p className="text-gray-300">{contact.address}</p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-all duration-300"
              >
                <div className="text-4xl text-red-400 mb-4">✉️</div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <a href={`mailto:${contact.email}`} className="text-gray-300 hover:text-red-400 transition">
                  {contact.email}
                </a>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-all duration-300"
              >
                <div className="text-4xl text-red-400 mb-4">📞</div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-gray-300 hover:text-red-400 transition">
                  {contact.phone}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About;