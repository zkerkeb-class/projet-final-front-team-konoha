export const formatDate = (dateString) => {
  if (!dateString) return "Inconnue";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");      // jour sur 2 chiffres
  const month = String(date.getMonth() + 1).padStart(2, "0"); // mois sur 2 chiffres (0-indexé)
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};