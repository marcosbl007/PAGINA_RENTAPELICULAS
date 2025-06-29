import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." />
      <button type="submit">
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
