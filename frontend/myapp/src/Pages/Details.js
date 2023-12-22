import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Details = () => {
  const [projectDetails, setProjectDetails] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3000/projects/${id}`)
      .then((response) => {
        console.log(response.data); 
        setProjectDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the Project:", error);
      });
  }, [id]);

  return (
    <div>
      <h1>Project Details</h1>
      {projectDetails ? (
        <div>
          <p>Food Type: {projectDetails.food_type}</p>
          <p>Location: {projectDetails.location}</p>
          <p>Servings: {projectDetails.servings}</p>
          <p>Timings: {projectDetails.timings}</p>
          <p>Date: {projectDetails.date}</p>
        </div>
      ) : (
        <p>Loading project details...</p>
      )}
      {projectDetails && (
        <iframe
          width="600"
          height="450"
          style={{ border: '0' }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=${projectDetails.origin}&destination=${projectDetails.destination}&avoid=tolls|highways`}
          title="Google Maps"
        ></iframe>
      )}
    </div>
  );
};

export default Details;
