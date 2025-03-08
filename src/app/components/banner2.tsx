const Banner = () => {
    return (
      <div className="w-full h-screen bg-gray-300 flex items-center justify-center overflow-hidden" style={{
        backgroundImage: "url('/assets/job-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: 'absolute',
        bottom:0,
        left:0
      }}>
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div className="text-center z-20">
          <h1 className="text-white text-6xl font-bold mb-4 shadow-md">Una plataforma sostenible</h1>
          <p className="text-white text-2xl shadow-md">Que ofrece rapida ayuda , colaboración y trabajo.</p>
        </div>
      </div>
    );
};

export default Banner;  