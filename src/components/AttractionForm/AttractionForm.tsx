// src/components/AttractionForm.tsx

import { useEffect, useState } from "react";
import { Button, Modal, Select, TextArea, TextInput } from "@gravity-ui/uikit";
import { Attraction } from "../Attraction/Attractions";
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number>(3);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState<string | "">("");
  const [longitude, setLongitude] = useState<string | "">("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setRating(initialData.rating || 3);
      setLocation(initialData.location || "");
      setLatitude(initialData.latitude ? initialData.latitude.toString() : "");
      setLongitude(
        initialData.longitude ? initialData.longitude.toString() : ""
      );
      setImageUrl(initialData.imageUrl || "");
    }
  }, [initialData]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setRating(3);
    setLocation("");
    setLatitude("");
    setLongitude("");
    setImageUrl("");
  };

  const handleSubmit = () => {
    onSubmit({
      name,
      description,
      rating,
      location,
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
      imageUrl: imageUrl || undefined,
      status: initialData?.status || "в планах",
    });

    resetForm();
  };

  return (
    <Modal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetForm();
          onClose();
        }
      }}
      contentOverflow="visible"
    >
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
            value={[rating.toString()]}
            onUpdate={(vals) => setRating(parseInt(vals[0]))}
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
