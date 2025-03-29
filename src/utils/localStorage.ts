// src/utils/localStorage.ts

import { Attraction } from "../components/Attraction/Attractions";

export const getAttractionsFromLocalStorage = (): Attraction[] => {
  const data = localStorage.getItem("attractions");
  if (data) {
    try {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        return parsedData;
      } else {
        return [];
      }
    } catch {
      return [];
    }
  }
  return [];
};

export const saveAttractionsToLocalStorage = (attractions: Attraction[]) => {
  if (attractions && attractions.length > 0) {
    localStorage.setItem("attractions", JSON.stringify(attractions));
  }
};
