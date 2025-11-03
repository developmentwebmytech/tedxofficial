type VideoSectionProps = {
  title?: string;
  highlight?: string;
  description?: string;
  videoUrl?: string; // optional
};

const VideoSection = ({
  title = 'Watch Our',
  highlight = 'Vision',
  description = 'Experience the spirit of TEDxThaltej Youth through our latest highlight video.',
  videoUrl,
}: VideoSectionProps) => {
  const safeVideoUrl =
    videoUrl && videoUrl.trim() !== ''
      ? videoUrl
      : 'https://www.youtube.com/embed/3nWF4UE4RL4?si=VGh5DdTClTk13jqi';

  return (
    <section className="bg-black py-16 px-4 md:px-20 text-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title} <span className="text-[#EB0129]">{highlight}</span> in Action
        </h2>

        {/* Description */}
        {description && (
          <p className="text-lg text-gray-300 mb-8">
            {description}
          </p>
        )}

        {/* Responsive Video */}
        <div className="w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden border-4 border-red-600 shadow-lg">
          <iframe
            src={safeVideoUrl}
            className="w-full h-full"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
