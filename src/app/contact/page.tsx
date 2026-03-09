'use client';

import { useState } from 'react';
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32">
        <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest mb-8">
          Contact Us
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
                Get in Touch
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Have questions about our courses? Want to learn more about AICE? 
                We're here to help. Reach out to us through the form or contact information below.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Email
                </h3>
                <p className="text-gray-400">
                  info@aice.com
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Response Time
                </h3>
                <p className="text-gray-400">
                  We typically respond within 24-48 hours
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-white/30 bg-black/30 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-white/30 bg-black/30 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
                  placeholder="youremail@gmail.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full border border-white/30 bg-black/30 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition duration-300 resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full border border-white bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black hover:bg-white/90 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

