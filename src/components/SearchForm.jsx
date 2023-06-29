import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import searchSvg from '../assets/search.svg'
import SearchPage from '../pages/SearchPage'
import '../styles/SearchBar.css';


const SearchForm = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

 
  const handleSubmit = (event) => {
    setValue(event.target.value.toLowerCase())
    event.preventDefault();
    navigate(`/SearchPage/${encodeURIComponent(event.target.value)}`);
  };
  
  const handleInputChange = (event) => {
    setValue(event.target.value.toLowerCase())
    const query = event.target.value;
    if (query.length > 3) {
      navigate(`/SearchPage/${encodeURIComponent(query)}`);
    }
  };
  


  return (
  <div className="searchBar">I'm looking for News about :&nbsp;
    <form onSubmit={handleSubmit}>
      <input className="searchBox" placeholder="type game name here..."
        type="text" 
        value={value}
        onChange={handleInputChange}
      />
      <button type="submit" className="searchButton"><img src={searchSvg} alt="search" className="searchImg" /></button>
    </form>
    </div>
  );
};

export default SearchForm;