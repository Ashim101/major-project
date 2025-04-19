const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-blue-600 text-white pt-16"
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-6">
          Seismic Image Denoising and Fault Segmentation
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-4xl mx-auto">
          Revolutionizing seismic imaging through advanced superresolution,
          denoising, and fault segmentation techniques to enhance image clarity,
          accurately identify geological faults, and support more informed
          exploration and decision-making in geoscience applications.
        </p>
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/report.pdf"; // Public folder path
            link.download = "report.pdf"; // Optional: sets file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
        >
          Download report
        </button>
      </div>
    </section>
  );
};

export default Home;
