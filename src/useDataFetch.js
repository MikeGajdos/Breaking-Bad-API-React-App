import React, { useState, useEffect } from "react";
import axios from "axios";

export const useDataFetch = (query) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState(query);
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const result = await axios(
          `https://www.breakingbadapi.com/api/characters?name=${search}`
        );
        setItems(result.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchItems();
  }, [search]);

  return [{ items, isLoading, isError, search }, setSearch];
};
