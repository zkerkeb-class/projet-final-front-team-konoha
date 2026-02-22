const API_URL = "http://localhost:3000/api";

export const fetchGames = async (page = 1) => {
  try {
    const response = await fetch(`${API_URL}/games?page=${page}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des jeux");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchAnecdotes = async (page = 1) => {
  try {
    const response = await fetch(`${API_URL}/anecdotes?page=${page}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des anecdotes");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchPolls = async (page = 1) => {
  try {
    const response = await fetch(`http://localhost:3000/api/sondages?page=${page}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des sondages");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const searchGames = async (title) => {
  try {
    const response = await fetch(
      `${API_URL}/games/search?title=${encodeURIComponent(title)}`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la recherche");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const searchAnecdotes = async (title) => {
  try {
    const response = await fetch(
      `${API_URL}/anecdotes/search?title=${encodeURIComponent(title)}`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la recherche");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const searchPolls = async (title) => {
  try {
    const response = await fetch(
      `${API_URL}/sondages/search?title=${encodeURIComponent(title)}`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la recherche");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const votePoll = async (pollId, optionIndex) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:3000/api/polls/${pollId}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ optionIndex })
    });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};