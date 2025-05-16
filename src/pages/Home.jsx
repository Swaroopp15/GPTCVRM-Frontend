import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Context } from '../../Context/Context';
import Footer from './Footer';
// Section components
import AboutSection from '../pages/HomePageSections/AboutSection';
import DepartmentsSection from '../pages/HomePageSections/DepartmentsSection';
import LabsSection from '../pages/HomePageSections/LabsSection';
import PlacementsSection from '../pages/HomePageSections/PlacementsSection';
import EventsSection from '../pages/HomePageSections/EventsSection';
import NotificationsSection from '../pages/HomePageSections/NotificationsSection';
import Hero from '../components/hero/Hero';

const Home = () => {
  const { college } = useContext(Context);
  const [departments, setDepartments] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [notificationsLoading, setNotificationsLoading] = useState(true);

  const labs = [
    {
      name: "Computer Lab",
      description: "State-of-the-art computing facility with latest hardware and software",
      equipment: "50 Computers, 3D Printers, Scanners",
      image: "💻"
    },
    {
      name: "Electronics Lab",
      description: "Fully equipped with modern electronic testing and measurement equipment",
      equipment: "Oscilloscopes, Function Generators, Power Supplies",
      image: "🔌"
    },
    {
      name: "Mechanical Workshop",
      description: "Industrial-grade machinery for hands-on training",
      equipment: "Lathes, Milling Machines, CNC Machines",
      image: "⚙️"
    }
  ];

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptResponse = await fetch('http://localhost:3000/departments');
        if (!deptResponse.ok) throw new Error('Failed to fetch departments');
        const deptData = await deptResponse.json();
        setDepartments(deptData);

        const eventsResponse = await fetch(import.meta.env.VITE_BACKEND + "events/");
        if (!eventsResponse.ok) throw new Error('Failed to fetch events');
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        const notificationsResponse = await fetch(import.meta.env.VITE_BACKEND + "notifications/");
        if (!notificationsResponse.ok) throw new Error('Failed to fetch notifications');
        const notificationsData = await notificationsResponse.json();
        setNotifications(notificationsData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setEventsLoading(false);
        setNotificationsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">
      <Hero />
      <div className="relative z-10 bg-gradient-to-b from-gray-50 to-gray-100">
        <AboutSection containerVariants={containerVariants} itemVariants={itemVariants} />
        <DepartmentsSection departments={departments} containerVariants={containerVariants} itemVariants={itemVariants} />
        <LabsSection labs={labs} containerVariants={containerVariants} itemVariants={itemVariants} />
        <PlacementsSection containerVariants={containerVariants} itemVariants={itemVariants} />
        <EventsSection events={events} eventsLoading={eventsLoading} containerVariants={containerVariants} itemVariants={itemVariants} />
        <NotificationsSection notifications={notifications} notificationsLoading={notificationsLoading} containerVariants={containerVariants} itemVariants={itemVariants} />
        <Footer />
      </div>
    </div>
  );
};

export default Home;