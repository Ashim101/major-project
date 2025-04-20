import { Zap, Search, BarChart3, Brain } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-12 h-12 text-purple-600" />,
    title: "Fast Processing",
    description:
      "Advanced algorithms optimized for rapid seismic data processing and analysis.",
  },
  {
    icon: <Search className="w-12 h-12 text-purple-600" />,
    title: "Enhanced Resolution",
    description:
      "State-of-the-art superresolution techniques for clearer seismic imagery.",
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-purple-600" />,
    title: "Accurate Analysis",
    description:
      "Precise data interpretation for better geological understanding.",
  },
  {
    icon: <Brain className="w-12 h-12 text-purple-600" />,
    title: "AI-Powered",
    description:
      "Machine learning algorithms for intelligent seismic processing.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 ">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-xl border-2 border-gray-300 "
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
