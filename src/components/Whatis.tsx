'use client';

export default function LeadershipSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left side */}
        <div>
          <h1 className="text-3xl md:text-5xl  text-black leading-tight">
            What is a <span className="font-bold text-[#EA0027]">Youth</span> Event?
          </h1>
          <button className="mt-8 bg-[#EA0027] hover:bg-black hover:text-white text-black font-semibold py-3 px-6 rounded-md shadow transition">
            Enroll Now
          </button>
        </div>

        {/* Right side */}
        <div>
          <p className="text-black text-lg leading-relaxed">
            TEDx Youth events are independently organized TEDx events designed specifically for and by young people, giving them a platform to share ideas, inspire action, and spark meaningful conversations. These events provide a unique opportunity to showcase youth-driven innovation, creativity, and leadership. With a focus on empowering the next generation, TEDx Youth events feature inspiring talks from students, educators, and thought leaders, all aimed at shaping a better future.

            TEDxThaltej Youth is part of this global initiative, aiming to amplify the voices of young changemakers and create a ripple effect of ideas worth spreading.  </p>
        </div>
      </div>
    </section>
  );
}
