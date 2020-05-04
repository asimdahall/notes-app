import React from "react";
import { getItem, setItem } from "../localstorage";

const INITIAL_STATE = [
  {
    id: "home",
    heading: "Home",
    theme: "yellow",
    notes: [],
  },
  {
    id: "work",
    heading: "Work",
    theme: "default",
    notes: [],
  },
  {
    id: "office",
    heading: "Office",
    notes: [],
  },
  {
    id: "school",
    heading: "School",
    theme: "pink",
    notes: [],
  },
  {
    id: "misc",
    heading: "Misc",
    notes: [],
  },
];

const CategoryContext = React.createContext([]);

const useCategory = () => {
  const { categories, setCategories } = React.useContext(CategoryContext);
  return {
    categories,
    setCategories,
  };
};

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = React.useState(
    getItem() || INITIAL_STATE
  );
  React.useEffect(() => setItem(categories), [categories]);
  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryProvider, useCategory };
