// src/components/AttractionTable/AttractionTable.tsx

import { Table, Button } from "@gravity-ui/uikit";
import { Attraction } from "../Attraction/Attractions";
import { generateMapLink } from "../../utils/mapLinks";
import styles from "./AttractionTable.module.css";
import { useState } from "react";

type AttractionTableProps = {
  data: Attraction[];
  isAdmin: boolean;
  toggleStatus: (id: string) => void;
  handleEdit: (attraction: Attraction) => void;
  handleDelete: (id: string) => void;
};

const AttractionTable = ({
  data,
  isAdmin,
  toggleStatus,
  handleEdit,
  handleDelete,
}: AttractionTableProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const columns = [
    {
      id: "name",
      name: "Название",
      template: (item: Attraction) => (
        <div className={styles.imageWrapper}>
          {item.imageUrl && (
            <img
              className={styles.image}
              src={item.imageUrl}
              alt={item.name}
              onClick={() => openImageModal(item.imageUrl ?? "")}
            />
          )}
          <span className={styles.attractionName}>{item.name}</span>
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
            className={styles.mapLink}
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
          className={styles.statusButton}
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
                <Button
                  size="s"
                  view="action"
                  onClick={() => handleEdit(item)}
                  className={styles.actionButton}
                >
                  ✏️
                </Button>
                <Button
                  size="s"
                  view="outlined-danger"
                  onClick={() => handleDelete(item.id)}
                  className={styles.deleteButton}
                >
                  🗑️
                </Button>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div>
      {data.length === 0 ? (
        <div className={styles.noData}>Нет достопримечательностей</div>
      ) : (
        <Table data={data} columns={columns} className={styles.table} />
      )}

      {selectedImage && (
        <div className={styles.modal} onClick={closeImageModal}>
          <img
            className={styles.modalImage}
            src={selectedImage}
            alt="Enlarged"
          />
        </div>
      )}
    </div>
  );
};

export default AttractionTable;
