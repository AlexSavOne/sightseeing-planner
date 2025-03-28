import { Table, Button, Card } from "@gravity-ui/uikit";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AttractionForm } from "../AttractionForm/AttractionForm";
import { generateMapLink } from "../../utils/mapLinks";
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

const initialData: Attraction[] = [
  {
    id: uuidv4(),
    name: "Эйфелева башня",
    description: "Знаменитая достопримечательность в Париже.",
    dateAdded: new Date().toISOString().split("T")[0],
    rating: 5,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/800px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
    location: "Париж, Франция",
    latitude: 48.8584,
    longitude: 2.2945,
    status: "в планах",
  },
  {
    id: uuidv4(),
    name: "Колизей",
    description: "Древнеримский амфитеатр.",
    dateAdded: new Date().toISOString().split("T")[0],
    rating: 4,
    location: "Рим, Италия",
    latitude: 41.8902,
    longitude: 12.4924,
    status: "осмотрена",
  },
];

const Attractions = ({ isAdmin }: AttractionsProps) => {
  const [data, setData] = useState<Attraction[]>(initialData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAttraction, setEditingAttraction] = useState<Attraction | null>(
    null
  );

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
    setData(data.filter((item) => item.id !== id));
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
      setData(
        data.map((item) =>
          item.id === editingAttraction.id
            ? { ...item, ...newAttraction }
            : item
        )
      );
    } else {
      setData([
        ...data,
        {
          ...newAttraction,
          id: uuidv4(),
          dateAdded: new Date().toISOString().split("T")[0],
          status: "в планах",
        },
      ]);
    }
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

      <Table data={data} columns={columns} />

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
