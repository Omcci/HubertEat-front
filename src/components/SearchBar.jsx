import React, { useState } from "react";
import { Input, Button } from "antd";

function SearchBar({ search, setSearch }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <form>
        <label htmlFor="search"></label>
        <Input
          className="searchbar"
          type="search"
          onChange={handleSearch}
          value={search}
          placeholder="Search your recipe or ingredients"
        />
      </form>
    </div>
  );
}

export default SearchBar;
