// src/utils/localStorage.ts

import { Attraction } from "../components/Attraciton/Attractions";

export const getAttractionsFromLocalStorage = (): Attraction[] => {
  const data = localStorage.getItem("attractions");
  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Ошибка при парсинге данных из localStorage:", error);
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
