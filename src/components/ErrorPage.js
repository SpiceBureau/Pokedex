import { useRouteError } from "react-router-dom";
import '../css/style.css'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="centered">
      <h1>This page does not exist</h1>
      <a href="https://pokemondb.net/pokedex/unown">
        <img src="https://img.pokemondb.net/sprites/home/normal/unown-qm.png" alt="Unown"></img>
      </a>
    </div>
  );
}