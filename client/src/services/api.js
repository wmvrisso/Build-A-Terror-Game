import axios from "axios";

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
