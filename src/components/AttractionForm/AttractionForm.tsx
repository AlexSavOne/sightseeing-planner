// src\components\AttractionForm.tsx

import { Button, Modal, Select, TextArea, TextInput } from "@gravity-ui/uikit";
import { useState } from "react";
import { Attraction } from "../Attraciton/Attractions";
import styles from "./AttractionForm.module.css";

type AttractionFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (attraction: Omit<Attraction, "id" | "dateAdded">) => void;
  initialData?: Partial<Attraction>;
};

export const AttractionForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: AttractionFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [rating, setRating] = useState(initialData?.rating?.toString() || "3");
  const [location, setLocation] = useState(initialData?.location || "");
  const [latitude, setLatitude] = useState(
    initialData?.latitude?.toString() || ""
  );
  const [longitude, setLongitude] = useState(
    initialData?.longitude?.toString() || ""
  );
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");

  const handleSubmit = () => {
    onSubmit({
      name,
      description,
      rating: parseInt(rating),
      location,
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
      imageUrl: imageUrl || undefined,
      status: initialData?.status || "в планах",
    });
  };

  return (
    <Modal open={open} onClose={onClose} contentOverflow="visible">
      <div className={styles.modalContent}>
        <h2 className={styles.title}>
          {initialData?.id ? "Редактировать" : "Добавить"} достопримечательность
        </h2>

        <div className={styles.field}>
          <div className={styles.label}>Название</div>
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.label}>Описание</div>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Введите описание"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.label}>Рейтинг (1-5)</div>
          <Select
            value={[rating]}
            onUpdate={(vals) => setRating(vals[0])}
            options={[1, 2, 3, 4, 5].map((num) => ({
              value: num.toString(),
              content: num.toString(),
            }))}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.label}>Местоположение</div>
          <TextInput
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Город, страна"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.label}>Широта</div>
          <TextInput
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="48.8584"
            type="number"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.label}>Долгота</div>
          <TextInput
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="2.2945"
            type="number"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.label}>Ссылка на изображение</div>
          <TextInput
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className={styles.input}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Превью"
              className={styles.imagePreview}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
        </div>

        <Button view="action" onClick={handleSubmit} className={styles.button}>
          {initialData?.id ? "Сохранить изменения" : "Добавить"}
        </Button>
      </div>
    </Modal>
  );
};
