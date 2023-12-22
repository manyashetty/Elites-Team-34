import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState({ destination1: '', city1: '', destination2: '', city2: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from MongoDB
        const response = await axios.get('your-mongodb-api-endpoint');
        setData(response.data); // Assuming the response is an object with the desired fields
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const baseIframeSrc = 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyCnl9q30JEXBUt-g7pYe9XOc2f6vpy-fgc&origin=';
  const isDataValid = data.destination1 && data.city1 && data.destination2 && data.city2;
  const iframeSrc = isDataValid
    ? ${baseIframeSrc}${encodeURIComponent(data.destination1)}&destination=${encodeURIComponent(data.destination2)}&avoid=tolls|highways
    : null;

  return (
    <div>
      <h1>Your Component</h1>
      {isDataValid && (
        <iframe src={iframeSrc} width="600" height="400" title="Embedded content"></iframe>
      )}
    </div>
  );
};

export default MyComponent;