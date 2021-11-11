import { getSuggestedQuery } from "@testing-library/react";
import React, { useState } from "react";

const Search = ({ handleSearch, handleChange, inputText }) => {
  const handleChangeHandler = (e) => {
    let cunt = e.target.value;
    handleChange(cunt);
  };
  return (
    <section className="search">
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch(inputText);
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search characters"
          value={inputText}
          onChange={handleChangeHandler}
          autoFocus
        />
        <button type="submit" className="btn">
          Search<sup>S</sup>
        </button>
      </form>
    </section>
  );
};

export default Search;
