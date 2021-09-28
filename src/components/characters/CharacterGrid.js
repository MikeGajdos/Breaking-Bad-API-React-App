import React from "react";
import CharacterItem from "./CharacterItem";
import Spinner from "../UI/Spinner";

const CharacterGrid = ({ items, isLoading }) => {
  console.log(items);
  return isLoading ? (
    <Spinner />
  ) : (
    <section className="cards">
      {items.length > 0 ? (
        items.map((item) => <CharacterItem key={item.char_id} item={item} />)
      ) : (
        <div>NO character with that name</div>
      )}
    </section>
  );
};

export default CharacterGrid;
