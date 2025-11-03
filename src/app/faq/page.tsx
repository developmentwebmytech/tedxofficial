"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Faq {
  _id: string;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/faq")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch FAQs");
        return res.json();
      })
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-gray-600 font-medium text-base sm:text-lg">
            Loading FAQs...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Unable to load FAQs
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 sm:py-20 px-4 sm:px-6 md:px-8 -mt-7">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 px-2">
        <div className="inline-block">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-[#EB0029] bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-700 mb-4">
            Frequently Asked Questions
          </h1>
          <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-red-600 to-red-500 mx-auto rounded-full"></div>
        </div>
        <p className="text-gray-600 text-base sm:text-lg mt-4 sm:mt-6 max-w-2xl mx-auto">
          Find answers to the most common questions about our services
        </p>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto">
        {faqs.length === 0 ? (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              No FAQs Available
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Check back soon for frequently asked questions!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-4 sm:px-6 md:px-8 py-5 sm:py-6 text-left flex justify-between items-center transition-all duration-300 hover:bg-gray-50"
                >
                  <h3 className="font-sans text-base sm:text-lg text-gray-900 pr-2 sm:pr-4 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-2 sm:ml-4">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-red-600 flex items-center justify-center transition-all duration-300 ${
                        openIndex === index
                          ? "bg-red-600 rotate-180"
                          : "bg-transparent group-hover:bg-red-50"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 transition-colors duration-300 ${
                          openIndex === index ? "text-white" : "text-red-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 sm:px-6 md:px-8 pb-5 sm:pb-6">
                    <div className="h-px bg-gradient-to-r from-red-600/20 via-red-500/20 to-transparent mb-4"></div>
                    <div className="bg-gradient-to-r from-red-50 to-gray-50 rounded-xl p-4 sm:p-6">
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-sans break-words">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact CTA */}
      {faqs.length > 0 && (
        <div className="max-w-4xl mx-auto font-sans mt-12 sm:mt-16 text-center px-4">
          <div className="bg-[#EC022A] rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
              Still have questions?
            </h3>
            <p className="text-red-100 text-sm sm:text-base mb-4 sm:mb-6">
              Can&apos;t find what you&apos;re looking for? We&apos;re here to
              help!
            </p>
            <button className="bg-white text-[#EC022A] font-semibold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Link href="/contact">Contact Us</Link>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
