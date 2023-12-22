import React, { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import veg from "../images/veg.jpg";
import non from "../images/non.jpg";
import moment from "moment";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await Axios.get("http://localhost:4000/projects", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [accessToken]);

  const formatDate = (dateString) => {
    // Assuming dateString is in ISO 8601 format or a format that Date can parse
    const date = new Date(dateString);
    return moment(date).format("MMMM Do YYYY, h:mm:ss a"); // Customize the date format as needed
  };

  return (
    <div className="md:mt-0  ">
      <h2 className="text-3xl font-bold  mb-6 mt-10 font-tech text-center text-crimson">
        Current Available Services
      </h2>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-crimson bg-opacity-70 p-4 rounded-xl shadow-black shadow-lg hover:shadow-lg transition-transform transform hover:scale-105 hover:border-gray-900 border-2 border-transparent cursor-pointer"
          >
           {project.food_type === "veg" ? (
              <img
                src={veg}
                alt={project.food_type}
                className="w-full h-60 object-cover"
              />
            ) : (
              <img
                src={non}
                alt={project.food_type}
                className="w-full h-60 object-cover"
              />
            )}
            <h2 className="text-xl text-white font-semibold mb-2">
             Location: {project.location}
            </h2>
            <p className="text-white-600 mb-4 text-white">
             Servings: {project.servings}
            </p>
            <p className="text-white-600 mb-4 text-white">
             Time: {project.timings}
            </p>
            <p className="text-white-600 mb-4 text-white">
             Date: {formatDate(project.date)}
            </p>
          </div>
        ))}
          
      </div>
    
    </div>
  );
};

export default Projects;
