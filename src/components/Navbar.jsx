import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  return (
    <nav className="navbar">
      <ul>
        <li><NavLink to="/">Accueil</NavLink></li>
        <li><NavLink to="/guides">Guides</NavLink></li>
        <li><NavLink to="/anecdotes">Anecdotes</NavLink></li>
        {token && (
          <li><NavLink to="/sondages">Sondages</NavLink></li>
        )}
        <li><div className="account">
          {!token ? (
            <>
              <NavLink to="/login">Connexion</NavLink>
              <NavLink to="/signup">Créer un compte</NavLink>
            </>
          ):(
            <NavLink to="/login" onClick={handleLogout}>Déconnexion</NavLink>
          )}
        </div></li>
      </ul>
    </nav>
  );
};

export default Navbar;