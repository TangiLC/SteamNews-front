import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import searchSvg from '../assets/search.svg'
import '../styles/SearchBar.css';

const SearchForm = () => {
  const [termSearch, setTermSearch] = useState('');
  const [redirectToSearch, setRedirectToSearch] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    if (termSearch.length > 3) {
      setRedirectToSearch(true);
    }
  };

  if (redirectToSearch) {
    return (<Route path={`../pages/SearchPage?term=${termSearch}`} />);
  }

  return (
  <div className="searchBar">I'm looking for News about :&nbsp;
    <form onSubmit={handleSearch}>
      <input className="searchBox" placeholder="type game name here..."
        type="text" 
        value={termSearch}
        onChange={(event) => setTermSearch(event.target.value)}
      />
      <button type="submit" className="searchButton"><img src={searchSvg} alt="search" className="searchImg" /></button>
    </form>
    </div>
  );
};

export default SearchForm;