// components/home/NotificationsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const NotificationsSection = ({ notifications, notificationsLoading, containerVariants, itemVariants }) => (
  <section id="notifications" className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="text-center mb-12">
        <motion.div variants={itemVariants}>
          <span className="text-red-600 font-semibold tracking-wider">ANNOUNCEMENTS</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2 sm:text-3xl md:text-4xl lg:text-5xl">Latest Notifications</h2>
        </motion.div>
      </motion.div>

      {notificationsLoading ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
        </motion.div>
      ) : notifications.length > 0 ? (
        <>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="space-y-4 max-w-4xl mx-auto">
            {notifications.slice(0, 3).map((notification, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ x: 5 }} className="bg-gray-50 p-6 rounded-xl shadow-sm border-l-4 border-red-600">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-800 sm:text-base">{notification.title}</h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{new Date(notification.date).toLocaleDateString()}</span>
                </div>
                {notification.link && (
                  <a href={notification.link} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline mt-2 inline-block">
                    {notification.link}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mt-12">
            <Link to="/notifications" className="inline-block px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              See Previous Notifications
            </Link>
          </motion.div>
        </>
      ) : (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-600">No notifications available.</motion.p>
      )}
    </div>
  </section>
);

export default NotificationsSection;
