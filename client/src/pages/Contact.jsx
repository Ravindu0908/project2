import React, { useState } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    // Validate firstname
    if (!formData.firstname.trim()) {
      errors.firstname = 'First Name is required';
    }

    // Validate lastname
    if (!formData.lastname.trim()) {
      errors.lastname = 'Last Name is required';
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    // Validate message
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    // If errors, set formErrors state and prevent form submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Clear form data and errors after successful submission (for demonstration)
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      message: ''
    });
    setFormErrors({
      firstname: '',
      lastname: '',
      email: '',
      message: ''
    });

    // Handle form submission logic (e.g., send data to server)
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <Navbar />
      <PageHeader title="Contact Us" />
      <div className="pt-[5%] pb-[5%] px-[10%]">
        <div className="sm:mx-auto sm:w-full sm:max-w-8xl shadow-lg bg-[white] drop-shadow-md rounded-xl transform hover:scale-103 duration-300 hover:shadow-lg p-8">
          <div className="w-full items-center grid lg:grid-cols-2 gap-16">
            <div className="">
              <div className="flex flex-row pb-8">
                <h1 className="text-pink-500 text-4xl font-semibold">
                  Getting Touch With Us
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="w-full grid lg:grid-cols-2 gap-4 py-[2%]">
                  <input
                    className={`peer block w-full appearance-none rounded-lg border ${formErrors.firstname ? 'border-red-500' : 'border-pink-400'} bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0`}
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    placeholder="First Name"
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.firstname && <p className="text-red-500 text-sm">{formErrors.firstname}</p>}
                  <input
                    className={`peer block w-full appearance-none rounded-lg border ${formErrors.lastname ? 'border-red-500' : 'border-pink-400'} bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0`}
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    placeholder="Last Name"
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.lastname && <p className="text-red-500 text-sm">{formErrors.lastname}</p>}
                </div>
                <div className="py-[2%]">
                  <input
                    className={`peer block w-full appearance-none rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-pink-400'} bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0`}
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                </div>
                <div className="py-[2%]">
                  <textarea
                    className={`peer block w-full appearance-none rounded-lg border ${formErrors.message ? 'border-red-500' : 'border-pink-400'} bg-transparent py-2.5 px-4 text-sm text-gray-900 focus:border-pink-600 focus:outline-none focus:ring-0`}
                    name="message"
                    value={formData.message}
                    placeholder="Message"
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
                  <button
                    type="submit"
                    className="mt-5 rounded-md bg-pink-500 px-10 py-2 text-white"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full grid lg:grid-cols-2 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-pink-500 text-xl font-semibold py-4">
                  Kandy
                </h2>
                <p className="text-base text-gray-500">Rest of Address</p>
                <hr className="w-1/2 border-[#8EC2F2]" />
                <div className="w-full flex flex-row justify-start">
                  <p className="font-bold font-md text-gray-500 py-4">
                    Phone:{" "}
                  </p>
                  <p className="font-md text-gray-500 py-4 pl-4">
                    +94 55 123 4567
                  </p>
                </div>
                <div className="w-full flex flex-row justify-start">
                  <p className="font-bold font-md  text-gray-500 pb-4">
                    Email:
                  </p>
                  <p className="font-md text-gray-500 pb-4 pl-4">
                    kandy@ruby.com
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-pink-500 text-xl font-semibold py-4">
                  Colombo
                </h2>
                <p className="text-base text-gray-500">Rest of Address</p>
                <hr className="w-1/2 border-[#8EC2F2]" />
                <div className="w-full flex flex-row justify-start">
                  <p className="font-bold font-md text-gray-500 py-4">
                    Phone:{" "}
                  </p>
                  <p className="font-md text-gray-500 py-4 pl-4">
                    +94 55 123 4567
                  </p>
                </div>
                <div className="w-full flex flex-row justify-start">
                  <p className="font-bold font-md  text-gray-500 pb-4">
                    Email:
                  </p>
                  <p className="font-md text-gray-500 pb-4 pl-4">
                    colombo@ruby.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
