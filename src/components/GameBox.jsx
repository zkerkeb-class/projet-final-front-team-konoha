import {Link} from "react-router-dom";

const GameBox = ({ game }) => {
  return (
    <>
  <li style={{ margin: "1rem 0", listStyle: "none" }}>
    <h2>{game.title}</h2>
    <img src={game.image} alt={game.title}/>
    <p>{game.genres.join(", ")}</p>
    <p>{game.platforms.join(", ")}</p>
    <p>Date de sortie :{" "} 
      {game.releaseDate?.america ? new Date(game.releaseDate.america).getFullYear() : "Inconnue"} (Amérique du Nord) {", "}
      {game.releaseDate?.europe ? new Date(game.releaseDate.europe).getFullYear() : "Inconnue"} (Europe) {", "}
      {game.releaseDate?.japon ? new Date(game.releaseDate.japon).getFullYear() : "Inconnue"} (Japon)</p>
    <button><Link to={`/games/${game._id}`}>Plus de détails...</Link></button>
  </li>
  </>
  );
}
export default GameBox;