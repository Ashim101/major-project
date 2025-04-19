import amrit from "../assets/amrit.jpg";
import biraj from "../assets/biraj.jpg";
import ashim from "../assets/ashim.jpg";

const teamMembers = [
  {
    id: 1,
    name: "Amrit Sharma",
    role: "Backend Developer",
    description: "Oversees the project and ensures all deliverables are met.",
    image: amrit,
  },
  {
    id: 2,
    name: "Ashim Sapkota",
    role: "Frontend Developer",
    description: "Develops themaintainable frontend for the project.",
    image: ashim,
  },
  {
    id: 3,
    name: "Biraj Acharya",
    role: "AI/ML Engineer",
    description: "Develops AI models for seismic image processing.",
    image: biraj,
  },
];

const Team = () => {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-96"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
