import { createContext, useEffect, useState } from "react";

import { allData } from "../allData";
export const Context = createContext();

export const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await allData;

      setData(response.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Context.Provider value={{ data }}>{children}</Context.Provider>
    </div>
  );
};
