import { getSuggestedQuery } from "@testing-library/react";
import React, { useState } from "react";

const Search = ({ getQuery, getSearch }) => {
  const [text, setText] = useState("");
  const onChange = (q) => {
    setText(q);
    getQuery(q);
  };

  return (
    <section className="search">
      <form
        onSubmit={(event) => {
          getSearch(text);
          event.preventDefault();
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search characters"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
};

export default Search;
