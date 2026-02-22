import { useEffect, useState } from "react";
import GuideContent from "../components/GuideContent";
import SearchBar from '../components/SearchBar.jsx';

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [search, setSearch] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nbPages, setNbPages] = useState(1); 

  const fetchGuides = async (query = "", pageNumber = 1) => {
    setLoading(true);
    try {
        const url = query ? `http://localhost:3000/api/guides/search?title=${encodeURIComponent(query)}&page=${pageNumber}`: `http://localhost:3000/api/guides?page=${pageNumber}`;
        const res = await fetch(url);
        const json = await res.json();
        setGuides(json.data || json);
        setNbPages(json.nbPages || 1);
    } catch (err) {
        console.error("Erreur fetch guides :", err);
    }finally{
        setLoading(false);
    }
  };
  useEffect(() => {
    fetchGuides(search, page);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchGuides(search,1);
  };

  return (
    <div>
      <h1>Guides</h1>
      <SearchBar value={search} onChange={setSearch} onSubmit={handleSearch} placeholder="Rechercher par titre"/>
      {guides.map((guide) => (
        <GuideContent key={guide._id} guide={guide} />
      ))}
      <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Précédent
      </button>
      <button disabled={page === nbPages} onClick={() => setPage(page + 1)}>
        Suivant
      </button>
    </div>
    </div>
  );
};

export default Guides;