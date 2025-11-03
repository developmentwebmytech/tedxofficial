'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
}

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('/api/team');
        if (!response.ok) throw new Error('Failed to fetch team data');

        const { data } = await response.json();

        setTeamMembers(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.map((member: any) => ({
            id: member._id,
            name: member.name,
            role: member.position,
            image: `/uploads/${member.image}`,
            description: member.about,
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-sans">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-red-600 font-sans">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h1>
          <div className="w-16 sm:w-24 h-1 bg-white mx-auto mb-4"></div>
          <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto">2025</p>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="space-y-12 sm:space-y-16">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
            >
              {/* Image Section */}
              <div className="relative w-64 h-64 rounded-2xl shadow-2xl bg-gray-100 mx-auto">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="256px"
                  className="object-contain rounded-2xl transition-transform duration-300 hover:scale-105"
                />
                {/* Decorative dots */}
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-600 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-black rounded-full"></div>
              </div>



              {/* Content Section */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
                    {member.name}
                  </h2>
                  <div className="inline-block">
                    <span className="text-lg sm:text-xl text-red-600 font-semibold border-b-2 border-red-600 pb-1">
                      {member.role}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-base sm:text-lg">{member.description}</p>
                </div>

                {/* Decorative line */}
                <div className="mt-4 sm:mt-6 flex justify-center lg:justify-start">
                  <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-red-600 to-black rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decorative Section */}
      <div className="bg-black py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-3 sm:space-x-4">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-600 rounded-full animate-pulse"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse delay-100"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-600 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
