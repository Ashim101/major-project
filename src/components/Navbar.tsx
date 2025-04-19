import { useLocation, useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollLink = (section: string) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-blue-600 text-white py-4 px-8 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8" />
          <span className="text-xl font-bold">SeisRes</span>
        </div>
        <ul className="flex space-x-8 items-center">
          <li>
            <button
              onClick={() => handleScrollLink("home")}
              className="hover:text-gray-300 transition-colors"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollLink("features")}
              className="hover:text-gray-300 transition-colors"
            >
              Features
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollLink("team")}
              className="hover:text-gray-300 transition-colors"
            >
              Team
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollLink("contact")}
              className="hover:text-gray-300 transition-colors"
            >
              Contact
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/demo")}
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Demo
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
