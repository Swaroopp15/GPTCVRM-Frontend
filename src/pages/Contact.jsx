import React from 'react';

const Contact = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">
                <h1 className="text-4xl font-bold text-red-700 mb-6">Contact Us</h1>

                <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Address</h2>
                    <p className="text-gray-700 text-lg">Government Polytechnic Chodavaram</p>
                    <p className="text-gray-700 text-lg">Chodavaram, Andhra Pradesh, India</p>
                    <p className="text-gray-700 text-lg">Pin Code: 531036</p>
                    <p className="text-gray-700 text-lg">Phone: +91-XXXXXXXXXX</p>
                    <p className="text-gray-700 text-lg">Email: gptcvrm.gmail.com</p>
                </div>

                <div className="mt-8 w-full max-w-4xl h-96 shadow-lg rounded-lg overflow-hidden">
                    <iframe
                        className="w-full h-96 border-0 rounded-lg shadow-md"
                        src="https://www.google.com/maps?q=Govt. polytechnic College,+RWHJ+74C,+Kandarpa+Colony,+Chodavaram,+Andhra+Pradesh+531036&hl=en&z=18&output=embed"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </>
    );
};

export default Contact;