// src/components/Attraction/Attractions.tsx

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AttractionForm } from "../AttractionForm/AttractionForm";
import {
  saveAttractionsToLocalStorage,
  getAttractionsFromLocalStorage,
} from "../../utils/localStorage";
import AttractionActions from "../AttractionActions/AttractionActions";
import AttractionStats from "../AttractionStats/AttractionStats";
import AttractionTable from "../AttractionTable/AttractionTable";
import SearchBar from "../SearchBar/SearchBar";

// Тип для достопримечательности
export type Attraction = {
  id: string;
  name: string;
  description: string;
  dateAdded: string;
  rating: number;
  imageUrl?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  status: "в планах" | "осмотрена";
};

type AttractionsProps = {
  isAdmin: boolean;
};

const Attractions = ({ isAdmin }: AttractionsProps) => {
  // Состояния для данных, формы и поиска
  const [data, setData] = useState<Attraction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAttraction, setEditingAttraction] = useState<Attraction | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [hideVisited, setHideVisited] = useState(false);

  // Загружаем данные из localStorage при монтировании компонента
  useEffect(() => {
    const storedData = getAttractionsFromLocalStorage();
    if (storedData.length > 0) {
      setData(storedData);
    }
  }, []);

  // Сохраняем данные в localStorage при изменении состояния данных
  useEffect(() => {
    if (data.length === 0) {
      localStorage.removeItem("attractions");
    } else {
      saveAttractionsToLocalStorage(data);
    }
  }, [data]);

  // Статистика: общее количество, посещенные и в планах
  const stats = {
    total: data.length,
    visited: data.filter((item) => item.status === "осмотрена").length,
    planned: data.filter((item) => item.status === "в планах").length,
  };

  // Обработчик открытия формы для добавления новой достопримечательности
  const handleAdd = () => {
    setEditingAttraction(null);
    setIsFormOpen(true);
  };

  // Обработчик открытия формы для редактирования существующей достопримечательности
  const handleEdit = (attraction: Attraction) => {
    setEditingAttraction(attraction);
    setIsFormOpen(true);
  };

  // Обработчик удаления достопримечательности
  const handleDelete = (id: string) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  // Обработчик изменения статуса достопримечательности
  const toggleStatus = (id: string) => {
    setData(
      data.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "в планах" ? "осмотрена" : "в планах",
            }
          : item
      )
    );
  };

  // Обработчик отправки формы для добавления или редактирования достопримечательности
  const handleSubmit = (
    newAttraction: Omit<Attraction, "id" | "dateAdded">
  ) => {
    if (editingAttraction) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editingAttraction.id
            ? { ...item, ...newAttraction }
            : item
        )
      );
    } else {
      const attraction: Attraction = {
        ...newAttraction,
        id: uuidv4(),
        dateAdded: new Date().toISOString().split("T")[0],
        status: "в планах",
      };
      setData((prevData) => [...prevData, attraction]);
    }
    setIsFormOpen(false);
    setEditingAttraction(null);
  };

  // Фильтрация данных по запросу поиска и скрытию посещенных достопримечательностей
  const filteredData = data.filter((attraction) => {
    return (
      (!hideVisited || attraction.status !== "осмотрена") &&
      (attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <>
      {/* Статистика */}
      <AttractionStats stats={stats} />

      {/* Панель поиска */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Действия (добавить, скрыть посещенные) */}
      <AttractionActions
        isAdmin={isAdmin}
        handleAdd={handleAdd}
        hideVisited={hideVisited}
        setHideVisited={setHideVisited}
      />

      {/* Таблица с достопримечательностями */}
      <AttractionTable
        data={filteredData}
        isAdmin={isAdmin}
        toggleStatus={toggleStatus}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Форма для добавления/редактирования достопримечательности */}
      <AttractionForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingAttraction(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingAttraction || undefined}
      />
    </>
  );
};

export default Attractions;
