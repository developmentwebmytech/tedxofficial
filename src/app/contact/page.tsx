'use client';

import { useState } from 'react';
import { Calendar, Instagram, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { SuccessMessage } from '@/components/SuccessMessage';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto py-10 px-4 sm:px-8 lg:px-28">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-[#EC0029]">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-start">
        {/* LEFT: Contact Info */}
        <div className="space-y-8 sm:space-y-10">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Get In Touch</h2>

            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  icon: <Mail className="w-6 h-6 text-white" />,
                  title: 'Email',
                  value: 'info@tedxthaltejyouth.in',
                },
                {
                  icon: <Phone className="w-6 h-6 text-white" />,
                  title: 'Phone',
                  value: '+91 98765 43210',
                },
                {
                  icon: <MapPin className="w-6 h-6 text-white" />,
                  title: 'Location',
                  value: 'Thaltej, Ahmedabad, Gujarat',
                },
                {
                  icon: <Calendar className="w-6 h-6 text-white" />,
                  title: 'Office Hours',
                  value: 'Mon - Fri: 9:00 AM - 6:00 PM',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#EC0029] rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Follow Us</h2>
            <div className="flex space-x-3 sm:space-x-4">
              <Link
                href="/"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-xl flex items-center justify-center hover:bg-red-700 transition transform hover:scale-110 hover:rotate-3"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-[10px] sm:text-xs">TED</span>
                </div>
              </Link>
              <Link
                href="https://www.linkedin.com/company/tedxthaltej-youth/"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition transform hover:scale-110 hover:rotate-3"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </Link>
              <Link
                href="https://www.instagram.com/tedxthaltejyouth?igsh=MTNyeGZ6NGxzcHMxNA=="
                className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-600 rounded-xl flex items-center justify-center hover:bg-pink-700 transition transform hover:scale-110 hover:rotate-3"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-5 sm:space-y-6 hover:shadow-2xl transition"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Send us a Message</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your name"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              required
              placeholder="Your message here..."
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl outline-none resize-none focus:ring-2 focus:ring-red-600"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#EC0029] text-white font-semibold py-3 sm:py-4 px-6 rounded-xl hover:bg-red-700 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </button>

          {status === 'success' && <SuccessMessage />}
          {status === 'error' && (
            <p className="text-center text-red-600">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}
