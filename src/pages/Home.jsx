import React, { useState, useEffect } from 'react';
import Hero from '../components/hero/Hero';
import { Link } from 'react-router';
import EventCard from '../components/Events/EventCard';
import Footer from './Footer';

const Home = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch departments
        const deptResponse = await fetch('http://localhost:3000/departments');
        if (!deptResponse.ok) throw new Error('Failed to fetch departments');
        const deptData = await deptResponse.json();
        setDepartments(deptData);

        // Fetch events
        const eventsResponse = await fetch(import.meta.env.VITE_BACKEND + "events/");
        if (!eventsResponse.ok) throw new Error('Failed to fetch events');
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        // Fetch notifications
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
    <div className="bg-white text-black">
      {/* === HERO BANNER === */}
      <Hero />

      {/* === ABOUT === */}
      <section id="about" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-4 text-center text-red-600">About Our College</h2>
          <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto">
            Established in 1985, Government Polytechnic College, Chodavaram provides high-quality technical education to produce skilled engineers and technicians ready for industry. 
            We offer diploma programs in various engineering disciplines with state-of-the-art facilities and experienced faculty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">35+</div>
              <div className="text-gray-700">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">1500+</div>
              <div className="text-gray-700">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">85%</div>
              <div className="text-gray-700">Placement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* === DEPARTMENTS === */}
      <section id="departments" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6 text-center text-red-600">Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departments.slice(0, 3).map((dept) => (
              <div key={dept.depo_code} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-600 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="text-4xl mb-3">{dept.icon || '🏛️'}</div>
                <h3 className="text-xl font-bold mb-2">{dept.department_name}</h3>
                <p className="text-gray-700">{dept.description || 'Department offering quality technical education.'}</p>
                <Link 
                  to={`/departments/${dept.depo_code}`}
                  className="inline-block mt-4 text-red-600 hover:text-red-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/departments" className="bg-red-600 text-white py-3 px-8 rounded-lg hover:bg-red-700 transition inline-block">
              View All Departments
            </Link>
          </div>
        </div>
      </section>

      {/* === LABS === */}
      <section id="labs" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6 text-center text-red-600">Our Laboratory Facilities</h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-8 text-gray-700">
            We provide modern, well-equipped laboratories to give students hands-on experience with industry-standard equipment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {labs.map((lab, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                <div className="text-6xl text-center py-6 bg-red-50 text-red-600">
                  {lab.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-red-700">{lab.name}</h3>
                  <p className="text-gray-700 mb-4">{lab.description}</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-semibold text-gray-800 mb-1">Equipment:</h4>
                    <p className="text-gray-600">{lab.equipment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/labs" className="inline-block border-2 border-red-600 text-red-600 py-2 px-8 rounded-lg hover:bg-red-600 hover:text-white transition">
              Explore All Labs
            </Link>
          </div>
        </div>
      </section>

      {/* === PLACEMENTS === */}
      <section id="placements" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6 text-center text-red-600">Placements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
              <h3 className="text-xl font-bold mb-4 text-red-700">Top Recruiters</h3>
              <div className="flex flex-wrap gap-4">
                {['TCS', 'Infosys', 'Wipro', 'Tech Mahindra', 'L&T', 'HCL'].map((company, index) => (
                  <span key={index} className="bg-gray-100 px-4 py-2 rounded-lg text-gray-800">
                    {company}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
              <h3 className="text-xl font-bold mb-4 text-red-700">Placement Statistics</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>2024 Batch</span>
                    <span>82%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>2023 Batch</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>2022 Batch</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/placements" className="inline-block bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition">
              View Placement Details
            </Link>
          </div>
        </div>
      </section>

      {/* === EVENTS === */}
      <section id="events" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6 text-center text-red-600">News & Events</h2>
          {eventsLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : events.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events.slice(0, 2).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/events" className="border-2 border-red-600 text-red-600 py-2 px-8 rounded-lg hover:bg-red-600 hover:text-white transition inline-block">
                  View All Events
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center">No events available.</p>
          )}
        </div>
      </section>

      {/* === NOTIFICATIONS === */}
      <section id="notifications" className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6 text-center text-red-600">Latest Notifications</h2>
          {notificationsLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : notifications.length > 0 ? (
            <>
              <div className="space-y-4 max-w-4xl mx-auto">
                {notifications.slice(0, 3).map((notification, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-600">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-red-700">{notification.title}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(notification.date).toLocaleDateString()}
                      </span>
                    </div>
                    {notification.link && (
                      <a 
                        href={notification.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline mt-1 block"
                      >
                        {notification.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link 
                  to="/notifications" 
                  className="inline-block bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition"
                >
                  See Previous Notifications
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center">No notifications available.</p>
          )}
        </div>
      </section>

      {/* === FOOTER === */}
      {/* <footer className="bg-red-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GPC Chodavaram</h3>
            <p className="text-red-100">Providing quality technical education since 1985.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-red-100 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-red-100 hover:text-white">About</Link></li>
              <li><Link to="/departments" className="text-red-100 hover:text-white">Departments</Link></li>
              <li><Link to="/labs" className="text-red-100 hover:text-white">Laboratories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <address className="not-italic text-red-100">
              Near RTC Bus Stand<br />
              Chodavaram, Andhra Pradesh<br />
              PIN - 531036<br />
              Email: gpchodavaram@gmail.com<br />
              Phone: 08934-XXXXXX
            </address>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-red-100 hover:text-white">🌐</a>
              <a href="#" className="text-red-100 hover:text-white">🐦</a>
              <a href="#" className="text-red-100 hover:text-white">📘</a>
            </div>
          </div>
        </div>
      </footer> */}
      <Footer/>
    </div>
  );
};

export default Home;