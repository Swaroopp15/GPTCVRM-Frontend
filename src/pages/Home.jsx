import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Context } from '../../Context/Context';
import Footer from './Footer';
// Section components
import AboutSection from '../components/HomePageSections/AboutSection';
import DepartmentsSection from '../components/HomePageSections/DepartmentsSection';
import LabsSection from '../components/HomePageSections/LabsSection';
import PlacementsSection from '../components/HomePageSections/PlacementsSection';
import EventsSection from '../components/HomePageSections/EventsSection';
import NotificationsSection from '../components/HomePageSections/NotificationsSection';
import Hero from '../components/hero/Hero';
import Spinner from '../components/hero/Spinner';
import PrincipalMessageSection from '../components/AboutPageSections/PrincipalMessageSection';
import CommissionerMessageSection from '../components/AboutPageSections/CommissionerMessageSection';
import GoToTop from '../components/hero/GoToTop';

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

  const principalMessage = {
    name: "Dr. Nagaraju",
    title: "Principal",
    message: "At our college, we believe in nurturing not just academic excellence but also character and creativity. Our dedicated faculty and state-of-the-art facilities provide students with the perfect environment to grow into responsible global citizens.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  };

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
        const deptResponse = await fetch(`${import.meta.env.VITE_BACKEND}departments`);
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
      <Spinner />
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
        <CommissionerMessageSection
          commissioner_name={ college.commissioner_name}
          commissioner_message={college.commissioner_message}
          commissioner_image={import.meta.env.VITE_BACKEND + college.commissioner_image}
        />
        <PrincipalMessageSection principal_message={college.principal_message} principal_name={college.principal_name} principal_image={""} />
        <DepartmentsSection departments={departments} containerVariants={containerVariants} itemVariants={itemVariants} />
        <LabsSection labs={labs} containerVariants={containerVariants} itemVariants={itemVariants} />
        <PlacementsSection containerVariants={containerVariants} itemVariants={itemVariants} />
        <EventsSection events={events} eventsLoading={eventsLoading} containerVariants={containerVariants} itemVariants={itemVariants} />
        <NotificationsSection notifications={notifications} notificationsLoading={notificationsLoading} containerVariants={containerVariants} itemVariants={itemVariants} />
        <Footer />
        <GoToTop />
      </div>
    </div>
  );
};

export default Home;