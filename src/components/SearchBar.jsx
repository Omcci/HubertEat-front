import { useState } from 'react'

function SearchBar({search, setSearch}) {
    // const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
        <div className="search-container">
        <form>
        <label htmlFor="search">Search for recipes or ingredients</label>
        <input
          className="searchbar"
          type="search"
          onChange={handleSearch}
          value={search}
          placeholder="Search your recipe or ingredients"
        />
        <button type="submit">Go</button>  
        </form>
      </div>
  )
}

export default SearchBar