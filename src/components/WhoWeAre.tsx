
import Image from 'next/image';

const CollaborationSection = () => {
  return (
    <section className="px-4 md:px-20 py-16 text-center bg-white">
      {/* Collaboration Tag */}
      <div className="flex justify-center items-center gap-1 mb-4">
        <Image src="/vision1.png" alt="collaboration" width={35} height={35} />
        <span className="text-[#EB0028] md:text-5xl text-4xl font-sans mr-13 font-semibold tracking-wider">Vision</span>
      </div>

      {/* Main Heading */}
      <h2 className="text-2xl md:text-3xl text-black font-bold mb-6">
        A vision to bring TEDxThaltej Youth to life.
      </h2>

      {/* Paragraph */}
      <p className="text-black font-sans max-w-4xl mx-auto  text-lg md:text-md mb-12 leading-relaxed">
       To inspire and empower the youth of today to become the visionary leaders of tomorrow by fostering a culture of learning, innovation, and transformative change in education.



      </p>

      {/* Logos */}
      <div className="flex   justify-center   items-center gap-6 flex-wrap">
        <Image src="/logo-black.png" alt="Detroit Logo" width={350} height={150} />
       
      </div>
    </section>
  );
};

export default CollaborationSection;

