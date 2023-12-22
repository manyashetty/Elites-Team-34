
// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useParams, useNavigate } from "react-router-dom";

// const accessToken = Cookies.get("accessToken");

// const ProjectForm = () => {
//   const [formData, setFormData] = useState({
//     food_type: "",
//     location: "",
//     servings: "",
//     timings: "",
//     date: "",
//   });
//   const { projectId } = useParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/projects?projectId=${projectId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       const existingProjectData = response.data.data;
//       setFormData(existingProjectData);
//     } catch (error) {
//       console.error("Error fetching project data:", error);
//     }
//   };

//   useEffect(() => {
//     if (projectId) {
//       fetchData();
//     }
//   }, [projectId]);

//   const handleChange = (e) => {
//     const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
//     setFormData({ ...formData, [e.target.name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       if (projectId) {
//         await axios.put(
//           `http://localhost:4000/projects?id=${projectId}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         alert("Project updated successfully");
//         navigate("/projects");
//       } else {
//         await axios.post("http://localhost:4000/projects", formData, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         alert("Project submitted successfully");
//         navigate("/projects");
//       }
//     } catch (error) {
//       console.error("Error submitting project:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <>
//       <Navbar />
//       <div className="bg-gradient-to-r from-red-100 to-red-400 h-screen flex flex-col justify-center items-center">
//         {/* Circular component for company logo */}

//         {/* Heading */}
//         <h1 className="text-4xl font-bold text-crimson mb-8">
//           Enter Project Details
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-crimson p-8  rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4"
//         >
//          <div>
//         <label htmlFor="food_type">Food Type:</label>
//         <input
//           type="text"
//           id="food_type"
//           name="food_type"
//           value={formData.food_type}
//           onChange={handleChange}
//         />
//       </div>

//       <div>
//         <label htmlFor="location">Location:</label>
//         <input
//           type="text"
//           id="location"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//         />
//       </div>

//       <div>
//         <label htmlFor="servings">Servings:</label>
//         <input
//           type="text"
//           id="servings"
//           name="servings"
//           value={formData.servings}
//           onChange={handleChange}
//         />
//       </div>

//       <div>
//         <label htmlFor="timings">Timings:</label>
//         <input
//           type="text"
//           id="timings"
//           name="timings"
//           value={formData.timings}
//           onChange={handleChange}
//         />
//       </div>

//       <div>
//         <label htmlFor="date">Date:</label>
//         <input
//           type="date"
//           id="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//         />
//       </div>

//           <div className="mt-4">
//             {isLoading ? (
//               <div className="text-center mt-4">
//                 <div className="inline-block animate-spin ease-linear rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//                 <span className="sr-only">Loading...</span>
//               </div>
//             ) : (
//               <button
//                 className="bg-white hover:bg-cyan-600  text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
//                 onClick={handleSubmit}
//               >
//                 {projectId ? "Update" : "Submit"}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default ProjectForm;
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

const accessToken = Cookies.get("accessToken");

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    food_type: "",
    location: "",
    servings: "",
    timings: "",
    date: "",
  });
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/projects?projectId=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const existingProjectData = response.data.data;
      setFormData(existingProjectData);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchData();
    }
  }, [projectId]);

  const handleChange = (e) => {
    const value =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (projectId) {
        await axios.put(
          `http://localhost:4000/projects?id=${projectId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        alert("Project updated successfully");
        navigate("/projects");
      } else {
        await axios.post("http://localhost:4000/projects", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert("Project submitted successfully");
        navigate("/projects");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-red-100 to-red-400 h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-crimson mb-8">
          Enter Project Details
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-crimson p-8  rounded-md max-w-xl w-full md:w-3/4 lg:w-1/2 xl:w-3/4"
        >
         <div>
        <label className="block text-sm font-medium  text-white">Food Type:</label>
        <input
          type="text"
          className="mt-1 p-2 w-full  mb-2 md:mr-2 border shadow-2xl rounded-md focus:outline-none focus:ring focus:border-blue-300"
          id="food_type"
          name="food_type"
          value={formData.food_type}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium  text-white">Location:</label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium  text-white">Servings:</label>
        <input
          type="text"
          id="servings"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          name="servings"
          value={formData.servings}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium  text-white">Timings:</label>
        <input
          type="text"
          id="timings"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          name="timings"
          value={formData.timings}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium  text-white">Date:</label>
        <input
          type="date"
          id="date"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
          <div className="mt-4">
            {isLoading ? (
              <div className="text-center mt-4">
                <div className="inline-block animate-spin ease-linear rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                className="bg-white hover:bg-cyan-600 text-crimson font-bold py-2 px-4 rounded-full shadow-2xl"
                onClick={handleSubmit}
              >
                {projectId ? "Update" : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ProjectForm;
