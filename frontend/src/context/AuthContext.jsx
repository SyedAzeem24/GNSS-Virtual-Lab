import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    // Ensure we have a token AND actual data that isn't the literal "undefined" string
    if (token && userData && userData !== "undefined") {
      try {
        const parsedData = JSON.parse(userData);
        
        // If userData was saved as a plain string (like a role "admin"), 
        // we convert it to an object so destructuring (...parsedData) doesn't fail
        const userObj = typeof parsedData === "object" && parsedData !== null 
          ? parsedData 
          : { role: parsedData };

        setUser({
          token,
          ...userObj
        });
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        // If storage is corrupted, log them out silently so the app doesn't crash
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);

    // Safeguard: Ensure userData is saved as valid stringified JSON
    localStorage.setItem("user", JSON.stringify(userData));

    // Convert to an object state format if a plain string/role was passed
    const userObj = typeof userData === "object" && userData !== null 
      ? userData 
      : { role: userData };

    setUser({
      token,
      ...userObj
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};