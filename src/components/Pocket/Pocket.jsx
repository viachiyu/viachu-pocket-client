import "./Pocket.scss";
import { Link } from "react-router-dom";
import Black from "../../assets/pockets/pocket__black.svg";
import Red from "../../assets/pockets/pocket__red.svg";
import Orange from "../../assets/pockets/pocket__orange.svg";
import Green from "../../assets/pockets/pocket__green.svg";
import Blue from "../../assets/pockets/pocket__blue.svg";
import Purple from "../../assets/pockets/pocket__purple.svg";
import Pink from "../../assets/pockets/pocket__pink.svg";

function Pocket({ pocketsList }) {
  //   const pocketIcons = [Green, Orange, Blue, Purple, Pink, Red];
  return (
    <article className="pocket">
      {pocketsList.map((pocket) => (
        <Link to={`/pockets/${pocket.id}/expenses`} className="pocket__link">
          <div className="pocket__card" key={pocket.id}>
            <img className="pocket__image" src={Black} />
            <div className="pocket__text">
              <h2 className="pocket__name">{pocket.name}</h2>
              <h3 className="pocket__label">Notes:</h3>
              <p className="pocket__notes">{pocket.notes}</p>
            </div>
          </div>
        </Link>
      ))}
    </article>
  );
}

export default Pocket;
