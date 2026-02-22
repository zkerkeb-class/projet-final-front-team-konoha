import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try{
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Identifiants incorrects");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    }
    catch{
      setError("Erreur serveur");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <input placeholder="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} required/>
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required/>
      <button>Se connecter</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Pas encore de compte ? <Link to="/signup">Créer mon compte</Link>
      </p>
    </form>
  );
};

export default Login;