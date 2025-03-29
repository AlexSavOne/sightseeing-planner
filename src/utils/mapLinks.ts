// src\utils\mapLinks.ts

export const generateMapLink = (
  lat: number,
  lng: number,
  provider: "google" | "yandex" = "google"
): string => {
  if (provider === "google") {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }
  return `https://yandex.ru/maps/?pt=${lng},${lat}&z=16&l=map`;
};
