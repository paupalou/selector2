import React, { useState } from "react";
import Data from "./Data";

function Selector() {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Data search={search} />
    </>
  );
}

export default Selector;
