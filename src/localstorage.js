const APP_KEY = "NOTES";

export const getItem = () => JSON.parse(localStorage.getItem(APP_KEY));

export const setItem = (item) => {
  if (!Array.isArray(item))
    throw new Error("The items to set in ls should be an array");
  localStorage.setItem(APP_KEY, JSON.stringify(item));
};
