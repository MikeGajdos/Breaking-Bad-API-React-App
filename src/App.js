import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/UI/Header";
import CharacterGrid from "./components/characters/CharacterGrid";
import Search from "./components/UI/Search";
import Pagination from "./components/pagination/Pagination";
import Spinner from "./components/UI/Spinner";
import { useDataFetch } from "./useDataFetch";

const App = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentItems, setCurrentItems] = useState([]);
  const [itemsPerPage] = useState(8);
  const [{ items, isLoading, isError, search }, setSearch] =
    useDataFetch(query);

  const handleChange = (q) => {
    setQuery(q);
  };
  const handleSearch = () => {
    setSearch(query);
    setCurrentPage(1);
    setQuery("");
  };

  // useEffect(() => {
  //   const indexOfLastItem = currentPage * itemsPerPage; // 16
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 8
  //   setCurrentItems(items.slice(indexOfFirstItem, indexOfLastItem)); // items.slice(8,16)
  // }, [currentPage, items, itemsPerPage]);

  // Get current posts
  const indexOfLastItem = currentPage * itemsPerPage; // 16
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 8
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem); // items.slice(8,16)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <Header />
      <Search
        handleChange={handleChange}
        handleSearch={handleSearch}
        inputText={query}
      />
      {isError && <div> Something went wrong ...</div>}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <CharacterGrid items={currentItems} />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={items.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default App;
