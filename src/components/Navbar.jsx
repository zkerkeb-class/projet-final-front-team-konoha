import { NavLink } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

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