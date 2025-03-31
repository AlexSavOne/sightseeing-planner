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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formIncomplete, setFormIncomplete] = useState(false)

  // Загружаем начальные данные в форму (если они есть)
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

  // Функция для сброса формы
  const resetForm = () => {
    setName("");
    setDescription("");
    setRating(3);
    setLocation("");
    setLatitude("");
    setLongitude("");
    setImageUrl("");
    setErrors({});
    setFormIncomplete(false);
  };

  // Обработчик отправки формы
  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    // Проверка обязательных полей
    if (!name) newErrors.name = "Название обязательно";
    if (!description) newErrors.description = "Описание обязательно";
    if (!location) newErrors.location = "Местоположение обязательно";
    if (!latitude || !longitude) {
      newErrors.coordinates = "Широта и долгота обязательны";
    }

    // Если есть ошибки, выводим их и не отправляем данные
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormIncomplete(true);
      return;
    }

    // Отправляем данные на обработку
    onSubmit({
      name,
      description,
      rating,
      location,
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
      imageUrl: imageUrl || undefined,
      status: initialData?.status || "в планах", // Устанавливаем статус по умолчанию или из initialData
    });

    // После отправки формы сбрасываем её
    resetForm();
  };

  return (
    <Modal
      open={open}
      onOpenChange={(isOpen) => {
        // Если форма закрыта, сбрасываем все данные и закрываем её
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

        {/* Поле для названия */}
        <div className={styles.field}>
          <div className={styles.label}>Название</div>
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название"
            className={styles.input}
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </div>

        {/* Поле для описания */}
        <div className={styles.field}>
          <div className={styles.label}>Описание</div>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Введите описание"
            className={styles.input}
          />
          {errors.description && (
            <div className={styles.error}>{errors.description}</div>
          )}
        </div>

        {/* Поле для рейтинга */}
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

        {/* Поле для местоположения */}
        <div className={styles.field}>
          <div className={styles.label}>Местоположение</div>
          <TextInput
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Город, страна"
            className={styles.input}
          />
          {errors.location && (
            <div className={styles.error}>{errors.location}</div>
          )}
        </div>

        {/* Поле для широты */}
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

        {/* Поле для долготы */}
        <div className={styles.field}>
          <div className={styles.label}>Долгота</div>
          <TextInput
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="2.2945"
            type="number"
            className={styles.input}
          />
          {errors.coordinates && (
            <div className={styles.error}>{errors.coordinates}</div>
          )}
        </div>

        {/* Поле для ссылки на изображение */}
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
                (e.target as HTMLImageElement).style.display = "none"; // Прячем изображение, если оно не загружается
              }}
            />
          )}
        </div>

        {/* Кнопки для сохранения и отображение ошибок */}
        <div className={styles.footer}>
          <Button
            view="action"
            onClick={handleSubmit}
            className={styles.button}
          >
            {initialData?.id ? "Сохранить изменения" : "Добавить"}
          </Button>

          {formIncomplete && (
            <div className={styles.errorMessage}>Заполните форму</div>
          )}
        </div>
      </div>
    </Modal>
  );
};
