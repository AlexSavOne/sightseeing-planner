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
  const [data, setData] = useState<Attraction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAttraction, setEditingAttraction] = useState<Attraction | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [hideVisited, setHideVisited] = useState(false);

  useEffect(() => {
    const storedData = getAttractionsFromLocalStorage();
    if (storedData.length > 0) {
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      localStorage.removeItem("attractions");
    } else {
      saveAttractionsToLocalStorage(data);
    }
  }, [data]);

  const stats = {
    total: data.length,
    visited: data.filter((item) => item.status === "осмотрена").length,
    planned: data.filter((item) => item.status === "в планах").length,
  };

  const handleAdd = () => {
    setEditingAttraction(null);
    setIsFormOpen(true);
  };

  const handleEdit = (attraction: Attraction) => {
    setEditingAttraction(attraction);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

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
      <AttractionStats stats={stats} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AttractionActions
        isAdmin={isAdmin}
        handleAdd={handleAdd}
        hideVisited={hideVisited}
        setHideVisited={setHideVisited}
      />
      <AttractionTable
        data={filteredData}
        isAdmin={isAdmin}
        toggleStatus={toggleStatus}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
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
