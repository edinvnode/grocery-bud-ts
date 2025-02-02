import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import List from "./List";
import Alert from "./Alert";

import "./styles.css";

// Define the type for a single list item
type ListItem = {
  id: string;
  title: string;
};

// Define the type for alert state
type AlertState = {
  show: boolean;
  msg: string;
  type: string;
};

// Get local storage function with proper return type
const getLocalStorage = (): ListItem[] => {
  const list = localStorage.getItem("list");
  return list ? JSON.parse(list) : [];
};

function App() {
  const [name, setName] = useState<string>("");
  const [list, setList] = useState<ListItem[]>(getLocalStorage());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editID, setEditID] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    msg: "",
    type: "",
  });

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      // Display alert
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem: ListItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  // Function to display alerts
  const showAlert = (
    show: boolean = false,
    type: string = "",
    msg: string = ""
  ) => {
    setAlert({ show, type, msg });
  };

  // Clear the entire list
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  // Remove a specific item
  const removeItem = (id: string) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  // Edit a specific item
  const editItem = (id: string) => {
    const specificItem = list.find((item) => item.id === id);
    if (specificItem) {
      setIsEditing(true);
      setEditID(id);
      setName(specificItem.title);
    }
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
