import "./Pocket.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import Black from "../../assets/pockets/pocket__black.svg";
import deleteIcon from "../../assets/icons/delete_icon.svg";
import Red from "../../assets/pockets/pocket__red.svg";
import Orange from "../../assets/pockets/pocket__orange.svg";
import Green from "../../assets/pockets/pocket__green.svg";
import Blue from "../../assets/pockets/pocket__blue.svg";
import Purple from "../../assets/pockets/pocket__purple.svg";
import Pink from "../../assets/pockets/pocket__pink.svg";
import DeletePocket from "../DeletePocket/DeletePocket";

function Pocket({ pocket, setSelectedPocketId }) {
  const [deleteToggle, setDeleteToggle] = useState(null);

  const handleSelectDelete = () => {
    setDeleteToggle({ delete: true, pocket_id: pocket.id });
  };

  const handleCancelDelete = () => {
    setDeleteToggle(null);
  };

  return (
    <div className="pocket__card" key={pocket.id}>
      <div className="pocket__wrapper">
        <Link
          to={`/pockets/${pocket.id}/expenses`}
          className="pocket__link"
          onClick={() => setSelectedPocketId(pocket.id)}
        >
          <img className="pocket__image" src={Black} />
          <div className="pocket__text">
            <h2 className="pocket__name">{pocket.name}</h2>
            <p className="pocket__notes">{pocket.notes}</p>
          </div>
        </Link>
        <img
          className="pocket__icon"
          src={deleteIcon}
          onClick={handleSelectDelete}
          alt="Delete Icon"
        />
      </div>
      {deleteToggle?.delete && (
        <DeletePocket onCancel={handleCancelDelete} pocketId={pocket.id} />
      )}
    </div>
  );
}

export default Pocket;
