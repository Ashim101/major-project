const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-blue-600 text-white pt-16"
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-6">
          Seismic Image Superresolution and Denoising
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Revolutionizing seismic imaging with advanced superresolution and
          denoising techniques for clearer geological insights and better
          decision-making.
        </p>
        <button
          onClick={() => {
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
        >
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Home;