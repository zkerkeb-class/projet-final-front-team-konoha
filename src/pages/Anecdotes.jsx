import { useState,useEffect } from 'react';
import { fetchAnecdotes, searchAnecdotes } from '../api/api.js';
import AnecdoteBox from '../components/AnecdoteBox.jsx';
import SearchBar from '../components/SearchBar.jsx';

function Anecdotes () {
  const [anecdotes, setAnecdotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState(1);
  
  useEffect(()=>{
    loadAnecdotes();
  },[page]);

  const loadAnecdotes = async () => {
    setLoading(true);
    try {
      const result = search ? await searchAnecdotes(search) : await fetchAnecdotes(page);
      if (result && result.data) {
        setAnecdotes(result.data);
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
    loadAnecdotes();
  };

  if (loading) return <p>Chargement des anecdotes...</p>;

  return (
    <>
      <h1>Anecdotes</h1>
      <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch} placeholder="Rechercher par titre"/>
      {anecdotes.map((anecdote) => (
          <AnecdoteBox key={anecdote._id} anecdote={anecdote} />
      ))}
      <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Précédent
      </button>
      <button disabled={page === nbPages} onClick={() => setPage(page + 1)}>
        Suivant
      </button>
    </div>
    </>
  )
};
export default Anecdotes;