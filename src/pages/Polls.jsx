import { useState,useEffect } from 'react';
import { fetchPolls, searchPolls } from '../api/api.js';
import PollBox from '../components/PollBox.jsx';
import SearchBar from '../components/SearchBar.jsx';

function Polls () {
  const [polls, setPolls] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState(1);

  const loadPolls = async () => {
    setLoading(true);
    try {
      const result = search ? await searchPolls(search) : await fetchPolls(page);
      if (result && result.data) {
        setPolls(result.data);
        setNbPages(result.nbPages || 1);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  
  useEffect(()=>{
    loadPolls();
  },[page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadPolls();
  };

  if (loading) return <p>Chargement des sondages...</p>;

  return (
    <>
      <h1>Sondages</h1>
      <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch} placeholder="Rechercher par titre"/>
      {polls.map((poll) => (
          <PollBox key={poll._id} poll={poll} />
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
export default Polls;