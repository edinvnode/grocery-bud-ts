import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// Define the type for a single list item
type ListItem = {
  id: string;
  title: string;
};

// Define the props for the List component
type ListProps = {
  items: ListItem[]; // An array of list items
  removeItem: (id: string) => void; // Function to remove an item by id
  editItem: (id: string) => void; // Function to edit an item by id
};

const List: React.FC<ListProps> = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
