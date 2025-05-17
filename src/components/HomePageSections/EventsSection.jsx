// components/home/EventsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import EventCard from '../../components/Events/EventCard';

const EventsSection = ({ events, eventsLoading, containerVariants, itemVariants }) => (
  <section id="events" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="text-center mb-12">
        <motion.div variants={itemVariants}>
          <span className="text-red-600 font-semibold tracking-wider">NEWS & EVENTS</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2 sm:text-3xl md:text-4xl lg:text-5xl">Upcoming Events</h2>
        </motion.div>
      </motion.div>

      {eventsLoading ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
        </motion.div>
      ) : events.length > 0 ? (
        <>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {events.slice(0, 2).map((event) => (
              <motion.div key={event.id} variants={itemVariants}>
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mt-12">
            <Link to="/events" className="inline-block px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-sm">
              View All Events
            </Link>
          </motion.div>
        </>
      ) : (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-600">No events available.</motion.p>
      )}
    </div>
  </section>
);

export default EventsSection;
