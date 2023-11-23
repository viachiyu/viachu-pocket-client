import "./Footer.scss";
import { Link, useMatch, useParams } from "react-router-dom";
import pocketIcon from "../../assets/icons/pocket__box.svg";
import expensesIcon from "../../assets/icons/menu_icon.svg";
import addIcon from "../../assets/icons/add_icon.svg";
import profilesIcon from "../../assets/icons/profiles_icon.svg";

function Footer() {
  const { pocketsId } = useParams;
  console.log(pocketsId);

  const matchPockets = useMatch("/pockets/");
  const matchExpenses = useMatch("/pockets/:pocketsId/expenses");
  const matchAdd = useMatch("/pockets/:pocketsId/expenses/add");
  const matchProfiles = useMatch("/pockets/:pocketsId/profiles");

  const pocketClicked = matchExpenses || matchAdd || matchProfiles;

  return (
    <footer className="footer">
      <div className="footer__wrapper footer__wrapper--pocket">
        <Link to="/pockets" className="footer__link">
          <img
            className={`footer__icon
             ${matchPockets ? "footer__icon--active" : ""}`}
            src={pocketIcon}
          />
        </Link>
      </div>
      {pocketClicked && (
        <div className="footer__wrapper footer__wrapper--nav">
          <Link to={`/pockets/${pocketsId}/expenses`}>
            <img
              className={`footer__icon ${
                matchExpenses ? "footer__icon--active" : ""
              }`}
              src={expensesIcon}
              alt="Expenses"
            />
          </Link>
          <Link to={`/pockets/${pocketsId}/expenses/add`}>
            <img
              className={`footer__icon ${
                matchAdd ? "footer__icon--active" : ""
              }`}
              src={addIcon}
              alt="Add"
            />
          </Link>
          <Link to={`/pockets/${pocketsId}/profiles`}>
            <img
              className={`footer__icon ${
                matchProfiles ? "footer__icon--active" : ""
              }`}
              src={profilesIcon}
              alt="Profiles"
            />
          </Link>
        </div>
      )}
    </footer>
  );
}
export default Footer;
