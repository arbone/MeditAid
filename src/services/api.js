import axios from "axios";

const API_BASE_URL = "https://your-api-url.com"; // Sostituisci con un'API reale

export const fetchMeditationData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/meditations`);
    return response.data;
  } catch (error) {
    console.error("Errore nel caricamento dei dati:", error);
    return [];
  }
};