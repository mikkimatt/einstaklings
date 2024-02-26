import React from 'react';
import { motion, Variants } from "framer-motion";

const CategorySelection = ({ onSelectCategory }) => {
    const categories = ['Fullorðins', 'Krakka', 'Íþrótta'];
  
    return (
      <div>
        <h2>Veldu flokk</h2>
        {categories.map((category, index) => (
          <button key={index} onClick={() => onSelectCategory(category)}>
            {category}
          </button>
        ))}
      </div>
    );
  };

export default CategorySelection;