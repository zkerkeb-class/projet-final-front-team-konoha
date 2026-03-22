const SearchBar = ({ value, onChange, onSubmit, placeholder }) => {
  return (
    <form onSubmit={onSubmit} className="search-bar">
      <h3> Filtre de recherche :</h3>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
};

export default SearchBar;