import React, { useState } from "react";
import { AutocompleteMatch } from "../../controllers/search";
const AutoComplete = () => {
  const [suggestion, setSuggestion] = useState([]);
  const [text, setText] = useState("");

  const ontextchange = e => {
    try {
      setText(e.target.value);
      AutocompleteMatch(text);
    } catch (e) {
      console.log(e);
    }
  };

  const suggSeleted = value => {
    setText(value);
    setSuggestion([]);
  };

  const rendersuggs = () => {
    const mapdata = suggestion;
    if (mapdata.length === 0) {
      return null;
    }
    return (
      <ul>
        {mapdata.map(item => (
          <li onClick={() => suggSeleted(item.redWrestler.fullName)}>
            {item.redWrestler.fullName}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <input onChange={ontextchange} type='text' value={text} />
      {rendersuggs()}
    </div>
  );
};

export default AutoComplete;
