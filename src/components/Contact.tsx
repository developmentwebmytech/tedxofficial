import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Calendar } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="inline-block">
              <span className="text-4xl font-bold text-red-600">TEDx</span>
              <span className="text-4xl font-bold text-black ml-1">Thaltej</span>
              <span className="text-5xl font-bold text-black ml-2">Youth</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">x = independently organized TED event</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 relative inline-block">
            Contact Us
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded-full"></div>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ready to share your ideas worth spreading? Get in touch with the TEDx Thaltej Youth team and join our community of innovators and changemakers.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors duration-300 group">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@tedxthaltejyouth.in</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors duration-300 group">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors duration-300 group">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">Thaltej, Ahmedabad, Gujarat</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors duration-300 group">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Hours</h3>
                    <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center hover:bg-red-700 transition-all duration-300 transform hover:scale-110 hover:rotate-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xs">TED</span>
                  </div>
                </a>
                <a href="#" className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:rotate-3">
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
                <a href="#" className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center hover:bg-pink-700 transition-all duration-300 transform hover:scale-110 hover:rotate-3">
                  <Instagram className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 hover:border-red-300"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 hover:border-red-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 hover:border-red-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 hover:border-red-300 resize-none"
                  placeholder="Tell us more about your ideas, questions, or how you'd like to get involved..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-red-700 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="text-2xl font-bold text-red-600">TEDx</span>
            <span className="text-2xl font-bold text-white ml-1">Thaltej</span>
            <span className="text-3xl font-bold text-white ml-2">Youth</span>
          </div>
          <p className="text-gray-400 mb-4">© 2025 - All Rights Reserved</p>
          <p className="text-gray-500 text-sm">
            Contact us at info@tedxthaltejyouth.in
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;