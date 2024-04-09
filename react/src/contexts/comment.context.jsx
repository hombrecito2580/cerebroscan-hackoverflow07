// comment.context.js
import { createContext, useState } from "react";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comm, setComm] = useState(false);

  const toggleComm = () => {
    setComm(prevComm => !prevComm);
  };

  const contextValue = {
    comm,
    toggleComm,
  };

  return (
    <CommentContext.Provider value={contextValue}>
      {children}
    </CommentContext.Provider>
  );
};
