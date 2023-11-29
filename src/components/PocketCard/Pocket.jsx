import "./Pocket.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import deleteIcon from "../../assets/icons/delete_icon.svg";
import coin from "../../assets/pockets/coin.svg";
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
          <img className="pocket__image" src={coin} />
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
