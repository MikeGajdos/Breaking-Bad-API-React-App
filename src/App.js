import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/UI/Header";
import CharacterGrid from "./components/characters/CharacterGrid";
import Search from "./components/UI/Search";

const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const result = await axios(
          `https://www.breakingbadapi.com/api/characters?name=${search}`
        );
        setItems(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchItems();
  }, [search]);

  return (
    <div className="container">
      <Header />
      <Search getQuery={(q) => setQuery(q)} getSearch={(s) => setSearch(s)} />
      {isError && <div> Something went wrong ...</div>}
      <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  );
};

export default App;
