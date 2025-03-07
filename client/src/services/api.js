import axios from "axios";

<<<<<<< HEAD
const API_URL = "http://localhost:5000"; // Change if deployed

export const getRandomCard = async (part) => {
  try {
    const response = await axios.get(`${API_URL}/cards/random?part=${part}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching random card:", error);
    return null;
  }
};
=======
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default api;
>>>>>>> 00f9df51bb6bfa962fb440b6b2f3fc51903229c4
