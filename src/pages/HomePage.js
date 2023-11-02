import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://api.newsmuncher.com/api/countries/');
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-4 p-8 rounded-lg shadow-md bg-white">
        {countries.map(country => (
          <Link 
            to={`/trending/${country.country}`} 
            key={country.country} 
            className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {country.flag} {country.country}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
