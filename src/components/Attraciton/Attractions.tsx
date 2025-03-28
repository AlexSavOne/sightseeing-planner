// src/components/Attraciton/Attractions.tsx

import { Table, Button, Card } from "@gravity-ui/uikit";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AttractionForm } from "../AttractionForm/AttractionForm";
import { generateMapLink } from "../../utils/mapLinks";
import {
  saveAttractionsToLocalStorage,
  getAttractionsFromLocalStorage,
} from "../../utils/localStorage";
import styles from "./Attractions.module.css";

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

    if (updatedData.length === 0) {
      localStorage.removeItem("attractions");
    } else {
      saveAttractionsToLocalStorage(updatedData);
    }
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
    const attraction: Attraction = {
      ...newAttraction,
      id: uuidv4(),
      dateAdded: new Date().toISOString().split("T")[0],
      status: "в планах",
    };
    setData((prevData) => [...prevData, attraction]);
    setIsFormOpen(false);
  };

  const columns = [
    {
      id: "name",
      name: "Название",
      template: (item: Attraction) => (
        <div className={styles.imageWrapper}>
          {item.imageUrl && (
            <img className={styles.image} src={item.imageUrl} alt={item.name} />
          )}
          {item.name}
        </div>
      ),
    },
    { id: "description", name: "Описание" },
    { id: "dateAdded", name: "Дата добавления" },
    { id: "rating", name: "Рейтинг" },
    {
      id: "location",
      name: "Местоположение",
      template: (item: Attraction) =>
        item.latitude && item.longitude ? (
          <a
            href={generateMapLink(item.latitude, item.longitude)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.location}
          </a>
        ) : (
          item.location
        ),
    },
    {
      id: "status",
      name: "Статус",
      template: (item: Attraction) => (
        <Button
          view={item.status === "осмотрена" ? "outlined-success" : "outlined"}
          onClick={() => toggleStatus(item.id)}
          size="s"
        >
          {item.status}
        </Button>
      ),
    },
    ...(isAdmin
      ? [
          {
            id: "actions",
            name: "Действия",
            template: (item: Attraction) => (
              <div className={styles.actions}>
                <Button size="s" view="action" onClick={() => handleEdit(item)}>
                  ✏️
                </Button>
                <Button
                  size="s"
                  view="outlined-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  🗑
                </Button>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <div className={styles.statsContainer}>
        <Card type="container" view="filled" className={styles.card}>
          <div className={styles.statLabel}>Всего</div>
          <div className={styles.statValue}>{stats.total}</div>
        </Card>
        <Card type="container" view="filled" className={styles.card}>
          <div className={styles.statLabel}>Посещено</div>
          <div className={styles.statValue}>{stats.visited}</div>
        </Card>
        <Card type="container" view="filled" className={styles.card}>
          <div className={styles.statLabel}>В планах</div>
          <div className={styles.statValue}>{stats.planned}</div>
        </Card>
      </div>

      {isAdmin && (
        <Button view="action" onClick={handleAdd} className={styles.addButton}>
          Добавить достопримечательность
        </Button>
      )}

      <Table data={data.length > 0 ? data : []} columns={columns} />

      <AttractionForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingAttraction || undefined}
      />
    </>
  );
};

export default Attractions;
