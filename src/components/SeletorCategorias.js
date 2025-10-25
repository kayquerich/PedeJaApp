import React from "react";
import styles from '../styles/categorias.module.css'
import { categorias } from "../static/categorias";

const categories = categorias.map((cat, index) => ({
  id: index,
  name: cat.Name,
  image: cat.Image,
}));

export default function CategorySelector({ onSelect }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Categorias</h2>
      <div className={styles.scrollContainer}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={styles.categoryCard}
            onClick={() => onSelect && onSelect(cat)}
          >
            <img src={cat.image} alt={cat.name} className={styles.image} />
            <p className={styles.label}>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
