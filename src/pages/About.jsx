import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/Context';
import HeroSection from '../components/AboutPageSections/HeroSection';
import AboutSection from '../components/AboutPageSections/AboutSection';
import VisionMissionSection from '../components/AboutPageSections/VisionMissionSection';
import WhyChooseUsSection from '../components/AboutPageSections/WhyChooseUsSection';
import JourneySection from '../components/AboutPageSections/JourneySection';
import Spinner from '../components/hero/Spinner';
import Footer from '../pages/Footer';
import AdmissionProcess from '../components/AboutPageSections/AdmissionProcess';
import GoToTop from '../components/hero/GoToTop';
import Academics from '../components/Academics/Academics';

function About() {
  const { college } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading (replace with actual data loading logic)
    const timer = setTimeout(() => {
      if (college) {
        setLoading(false);
      } else {
        setError("Failed to load college data");
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [college]);

  const pageData = {
    hero: {
      title: "Welcome to Our College",
      subtitle: "Shaping the future since 2017",
      collegeImage: college?.college_image
    },
    stats: [
      { value: "95%", label: "Placement Rate", description: "Average placement rate over last 3 years" },
      { value: "50+", label: "Faculty Members", description: "With PhDs and industry experience" },
      { value: "2000+", label: "Students", description: "Currently pursuing various programs" },
      { value: "30+", label: "Acres Campus", description: "Green campus with modern amenities" }
    ],
    about: {
      title: "About Our College",
      description: "Established in 2017, our college is dedicated to academic excellence, innovation, and holistic development. We offer a dynamic learning environment where students can explore their full potential.",
      raggingFree: "Our college is a ragging-free campus, ensuring a safe and friendly environment for all students."
    },
    whyChooseUs: [
      {
        title: "Academic Excellence",
        description: "Highly qualified faculty and modern curriculum designed for industry relevance.",
        icon: "🎓",
        color: "bg-blue-100 text-blue-800"
      },
      {
        title: "Modern Infrastructure",
        description: "State-of-the-art labs, digital libraries, and advanced research centers.",
        icon: "🏛️",
        color: "bg-purple-100 text-purple-800"
      },
      {
        title: "Vibrant Campus Life",
        description: "30+ clubs, cultural festivals, sports tournaments, and technical events.",
        icon: "🎭",
        color: "bg-red-100 text-red-800"
      },
      {
        title: "Industry Connect",
        description: "Strong corporate partnerships with 100+ placement opportunities annually.",
        icon: "🤝",
        color: "bg-green-100 text-green-800"
      }
    ],
    journey: [
      {
        year: "2017",
        event: "Foundation Year",
        description: "College established with a vision for excellence in technical education."
      },
      {
        year: "2020",
        event: "Expansion & Growth",
        description: "Introduced 5 new departments and modernized all laboratories."
      },
      {
        year: "2022",
        event: "Accreditation",
        description: "Received NAAC 'A' Grade accreditation for academic excellence."
      },
      {
        year: "2024",
        event: "National Recognition",
        description: "Ranked among India's top 50 emerging technical institutions."
      }
    ]
  };

  if (loading) {
    return <Spinner message="Loading college information..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Error Loading Data</h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-900">
      <HeroSection data={pageData.hero} />
      <div className="relative z-10 bg-white">
        <AboutSection data={pageData.about} />
        <VisionMissionSection data={college} />
        <WhyChooseUsSection data={pageData.whyChooseUs} />
        <AdmissionProcess />
        <Academics />
        <JourneySection data={pageData.journey} />
        <Footer />
        <GoToTop />
      </div>
    </div>
  );
}

export default About;