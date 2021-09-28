import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/UI/Header";
import CharacterGrid from "./components/characters/CharacterGrid";
import Search from "./components/UI/Search";
import Pagination from "./components/pagination/Pagination";
import Spinner from "./components/UI/Spinner";

const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const result = await axios(
          `https://www.breakingbadapi.com/api/characters?name=${search}`
        );
        setItems(result.data);
        setQuery("");
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchItems();
  }, [search]);

  const handleChange = (q) => {
    setQuery(q);
  };
  const handleSearch = () => {
    setSearch(query);
    setCurrentPage(1);
  };

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
        <CharacterGrid isLoading={isLoading} items={currentItems} />
      )}

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
