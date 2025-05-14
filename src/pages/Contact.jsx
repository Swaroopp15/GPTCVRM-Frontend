import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react'; 

const email = 'gptcvrm@gmail.com';
const phone = "+91-8367777635";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-red-700 mb-8 animate-fade-in">
                Contact Us
            </h1>

            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl w-full animate-slide-up">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Address</h2>

                <div className="space-y-4 text-gray-700 text-lg">
                    <p className="flex items-center gap-2">
                        <MapPin className="text-red-600 w-5 h-5" />
                        Government Polytechnic Chodavaram
                    </p>
                    <p className="pl-7">Chodavaram, Andhra Pradesh, India</p>
                    <p className="pl-7">Pin Code: 531036</p>

                    <p className="flex items-center gap-2 mt-4">
                        <Phone className="text-green-600 w-5 h-5" />
<a
                            href={`tel:${phone}`}
                            className="underline hover:text-green-700"
                        >
                            {phone}
                        </a>                    </p>

                    <p className="flex items-center gap-2">
                        <Mail className="text-blue-600 w-5 h-5" />
                        <a
                            href={`https://mail.google.com/mail/?view=cm&to=${email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-800"
                        >
                            {email}
                        </a>
                    </p>
                </div>
            </div>

            <div className="mt-10 w-full max-w-4xl h-96 shadow-lg rounded-xl overflow-hidden animate-fade-in">
                <iframe
                    className="w-full h-full border-0"
                    src="https://www.google.com/maps?q=Govt.polytechnicCollege,+RWHJ+74C,+Kandarpa+Colony,+Chodavaram,+Andhra+Pradesh+531036&hl=en&z=18&output=embed"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
