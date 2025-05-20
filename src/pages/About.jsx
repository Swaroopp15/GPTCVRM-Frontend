import { useContext, useEffect } from 'react';
import { Context } from '../../Context/Context';
import HeroSection from '../components/AboutPageSections/HeroSection';
import StatsSection from '../components/AboutPageSections/StatsSection';
import AboutSection from '../components/AboutPageSections/AboutSection';
import VisionMissionSection from '../components/AboutPageSections/VisionMissionSection';
import WhyChooseUsSection from '../components/AboutPageSections/WhyChooseUsSection';
import JourneySection from '../components/AboutPageSections/JourneySection';
import Spinner from '../components/hero/Spinner';
import Fotter from '../pages/Footer';
import AdmissionProcess from '../components/AboutPageSections/AdmissionProcess';
import GoToTop from '../components/hero/GoToTop';
import Academics from '../components/Academics/Academics';


function About() {
  const { college } = useContext(Context);
  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

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
    ],
    contact: {
      address: "123 College Road, Knowledge City, India - 560001",
      email: "contact@college.edu",
      phone: "+91 80 1234 5678",
      hours: "Monday - Friday: 9:00 AM - 5:00 PM"
    }
  };

  return (
    <div className="text-gray-900">
      <HeroSection data={pageData.hero} />
      <div className="relative z-10 bg-white">
        {/* <StatsSection data={pageData.stats} /> */}
        <AboutSection data={pageData.about} />
        <VisionMissionSection data={college} />
        <WhyChooseUsSection data={pageData.whyChooseUs} />
        <AdmissionProcess/>
        <Academics/>
        <JourneySection data={pageData.journey} />
        <Fotter />
        <GoToTop />
      </div>
    </div>
  );
}

export default About;
