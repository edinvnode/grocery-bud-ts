import React, { useEffect } from "react";

// Define the types for the props
type AlertProps = {
  type: string; // The type of alert, e.g., "success", "danger"
  msg: string; // The alert message
  removeAlert: () => void; // Function to remove the alert
  list: Array<{ id: string; title: string }>; // The list of items, expected to be an array of objects
};

const Alert: React.FC<AlertProps> = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list, removeAlert]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
