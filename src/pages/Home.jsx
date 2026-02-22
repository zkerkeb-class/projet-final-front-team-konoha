import { useState,useEffect } from 'react';
import { fetchGames, searchGames } from '../api/api.js';
import GameBox from '../components/GameBox.jsx';

function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState({title: "", series: "", editor: "", studio: "", genre: "", platform: ""});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState(1);
  
  useEffect(()=>{
    loadGames();
  },[page]);

  const loadGames = async () => {
    setLoading(true);

    const params = new URLSearchParams({ page });
    Object.entries(search).forEach(([key, value]) => {
      if (value.trim()) params.append(key, value.trim());
    });

    try {
      const res = await fetch(`http://localhost:3000/api/games/search?${params.toString()}`);
      const result = await res.json();
      if (result && result.data) {
        setGames(result.data);
        setNbPages(result.nbPages || 1);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadGames();
  };
    
  if (loading) return <p>Chargement des jeux vidéo...</p>;

  return (
    <>
    <h1>Le Bureau des Gamers</h1>
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Titre"
        value={search.title}
        onChange={(e) => setSearch({ ...search, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Série"
        value={search.series}
        onChange={(e) => setSearch({ ...search, series: e.target.value })}
      />
      <input
        type="text"
        placeholder="Éditeur"
        value={search.editor}
        onChange={(e) => setSearch({ ...search, editor: e.target.value })}
      />
      <input
        type="text"
        placeholder="Studio"
        value={search.studio}
        onChange={(e) => setSearch({ ...search, studio: e.target.value })}
      />
      <input
        type="text"
        placeholder="Genre"
        value={search.genre}
        onChange={(e) => setSearch({ ...search, genre: e.target.value })}
      />
      <input
        type="text"
        placeholder="Plateforme"
        value={search.platform}
        onChange={(e) => setSearch({ ...search, platform: e.target.value })}
      />
      <button type="submit">Rechercher</button>
    </form>
    <ul  className="games-container">
        {games.map((game) => (
            <GameBox key={game._id} game={game} />
        ))}
    </ul>
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Précédent
      </button>
      <button disabled={page === nbPages} onClick={() => setPage(page + 1)}>
        Suivant
      </button>
    </div>
    </>
  );
}

export default Home;