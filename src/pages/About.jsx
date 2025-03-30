import React, { useContext } from 'react'
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
      description: "Highly qualified faculty and modern curriculum."
    },
    {
      title: "Modern Infrastructure",
      description: "State-of-the-art labs, libraries, and research centers."
    },
    {
      title: "Vibrant Student Life",
      description: "Clubs, cultural events, and sports activities."
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

 const  contact = {
    address: "123 College Road, City, Country",
    email: "contact@college.edu",
    phone: "+123 456 7890"
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
    <section className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: `url(${college?.college_image})` }} >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-white text-center">
            <h1 className="text-4xl font-bold">{ hero.title }</h1>
            <p className="mt-2 text-lg">{hero.subtitle }</p>
        </div>
    </section>

    <section className="max-w-6xl mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-red-800">{ about.title }</h2>
        <p className="mt-4 text-gray-700">{ about.description }</p>
        <p className="mt-2 text-green-600 font-semibold">{ about.raggingFree }</p>
    </section>

    <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-red-800 text-center">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
            {whyChooseUs.map((item) => 
             <div className="bg-white p-6 shadow-md rounded-lg text-center">
                <h3 className="text-xl font-semibold text-red-700">{ item.title }</h3>
                <p className="text-gray-600 mt-2">{ item.description }</p>
            </div>
            )}
        </div>
    </section>

    <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-red-800">Our Journey</h2>
            <div className="mt-6 space-y-4">
                {journey.map((milestone) => <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-red-700">{ milestone.year } - { milestone.event }</h3>
                    <p className="text-gray-600">{ milestone.description }</p>
                </div>
              )}
            </div>
        </div>
    </section>

    <section className="max-w-6xl mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-red-800">Contact Us</h2>
        <p className="text-gray-600 mt-2">Get in touch for admissions and inquiries.</p>
        <div className="mt-6">
            <p className="text-red-700"><strong>Address:</strong> { contact.address }</p>
            <p className="text-red-700"><strong>Email:</strong> { contact.email }</p>
            <p className="text-red-700"><strong>Phone:</strong> { contact.phone }</p>
        </div>
    </section>
</div>

  )
}

export default About