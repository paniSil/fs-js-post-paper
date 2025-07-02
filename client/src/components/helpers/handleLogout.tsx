import axios from "axios";

export const handleLogout = async () => {
  try {
    await axios.post("/auth/logout");
  } catch (error) {
    alert("Logout failed!");
  }
};
