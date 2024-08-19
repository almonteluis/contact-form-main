'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  queryType: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  queryType?: string;
  message?: string;
  consent?: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};
    if (!formData.firstName) newErrors.firstName = 'This field is required';
    if (!formData.lastName) newErrors.lastName = 'This field is required';
    if (!formData.email) {
      newErrors.email = 'This field is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.queryType) newErrors.queryType = 'Please select a query type';
    if (!formData.message) newErrors.message = 'This field is required';
    if (!formData.consent) newErrors.consent = 'To submit this form, please consent to being contacted';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png" />
        <title>Frontend Mentor | Contact form</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center  p-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
          <h1 className='text-3xl font-bold mb-6 text-center'>Contact Us</h1>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className='mb-4'>
                <label htmlFor="firstName" className='block mb-2'>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                  aria-invalid={errors.firstName ? "true" : "false"}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                />
                {errors.firstName && <p id='firstName-error' className="text-red-500">{errors.firstName}</p>}
              </div>

              <div className='mb-4'>
                <label htmlFor="lastName" className='block mb-2'>Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                  aria-invalid={errors.lastName ? "true" : "false"}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                />
                {errors.lastName && <p id='lastName-error' className="text-red-500">{errors.lastName}</p>}
              </div>

              <div className='mb-4'>
                <label htmlFor="email" className='block mb-2'>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id='email-error' className="text-red-500">{errors.email}</p>}
              </div>

              <div className='mb-4'>
                <label htmlFor="queryType" className='block mb-2'>Query Type</label>
                <select
                  id="queryType"
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                  aria-invalid={errors.queryType ? "true" : "false"}
                  aria-describedby={errors.queryType ? "queryType-error" : undefined}
                >
                  <option value="">Select a query type</option>
                  <option value="general">General Enquiry</option>
                  <option value="support">Support Request</option>
                </select>
                {errors.queryType && <p id='queryType-error' className="text-red-500">{errors.queryType}</p>}
              </div>

              <div className='mb-4'>
                <label htmlFor="message" className='block mb-2'>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                  rows={4}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                ></textarea>
                {errors.message && <p id='message-error' className="text-red-500">{errors.message}</p>}
              </div>

              <div className='mb-4'>
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  className="mr-2"
                  aria-invalid={errors.consent ? "true" : "false"}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                />
                <label htmlFor="consent">I consent to being contacted by the team</label>
                {errors.consent && <p id='consent-error' className="text-red-500">{errors.consent}</p>}
              </div>

              <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Submit</button>
            </form>
          ) : (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
              <h2 className="font-bold">Message Sent!</h2>
              <p>Thanks for completing the form. We&apos;ll be in touch soon!</p>
            </div>
          )}

          <div className="mt-8 text-center text-sm">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Frontend Mentor</a>.
            Coded by <a href="#" className="text-blue-500 hover:underline">Luis Almonte</a>.
          </div>
        </div>
      </main>
    </>
  );
}