import Image from 'next/image';

const services = [
  {
    icon: "/theme1.png",
    title: 'The Shift in Education',
    description:
      'From rote learning to forward-thinking wisdom, education is undergoing a powerful transformation that values curiosity, adaptability, and purpose.',
    bg: 'bg-white',
  },
  {
    icon: "/theme2.png",
    title: 'A Light Towards Wisdom',
    description:
      'This year’s theme symbolizes a beacon guiding students away from outdated methods and toward critical thinking, creativity, and meaningful growth.',
    bg: 'bg-gray-100',
  },
  {
    icon: "/theme3.png",
    title: 'Empowering Future Leaders',
    description:
      'By encouraging innovation and personal development, we aim to equip today’s youth with the tools to shape a better and more thoughtful tomorrow.',
    bg: 'bg-white',
  },
  {
    icon: "/theme4.png",
    title: 'Reimagining Possibilities',
    description:
      'Through inspiring stories and bold ideas, TEDxThaltej Youth 2025 invites us to reimagine what education can be in a future built on wisdom and vision.',
    bg: 'bg-white',
  },
];

const CustomisedConsultancy = () => {
  return (
    <>
      {/* Section 1: Image + Service List */}
      <section className="flex flex-col md:flex-row mb-10">
        {/* Left Image */}
        <div className="relative w-full md:w-1/2 h-[300px] sm:h-auto md:h-auto mb-6 md:mb-0">
          <Image
            src="/theme.jpg"
            alt="themeimage"
            fill
            className="md:object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>



        {/* Right Service List */}
        <div className="w-full md:w-1/2 mt-5">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 sm:p-8 md:p-10 lg:p-14 flex items-start gap-4 ${service.bg} border-b border-gray-200`}
            >
              <Image
                src={service.icon}
                alt="icon"
                width={40}
                height={40}
                className="w-10 h-10 object-contain flex-shrink-0"
              />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-700 mt-1">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Content + Video */}
      <section className="bg-white text-black py-12 sm:py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
              Experience the Journey <span className="text-red-500">Visually</span> in Action
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              Witness how TEDxThaltej Youth 2025 brings <strong>‘A Light Towards Wisdom’</strong> to life —
              a powerful glimpse into stories of innovation, growth, and the reimagination of education.
            </p>
          </div>

          {/* Right Video */}
          <div className="border-2 border-red-600 rounded-xl overflow-hidden shadow-lg">
            <video controls className="w-full h-auto rounded-lg">
              <source src="/Invite.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomisedConsultancy;
