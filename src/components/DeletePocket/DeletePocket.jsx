import "./DeletePocket.scss";
import axios from "axios";
import TickIcon from "../../assets/icons/tick_icon.svg";
import XIcon from "../../assets/icons/close_icon.svg";

function DeletePocket({ pocketId, onCancel }) {
  const handleDelete = async () => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(
        process.env.REACT_APP_BASE_URL + "/pockets/" + pocketId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting pocket:", error);
    }
  };

  return (
    <div className="delete-pocket">
      <div className="delete-pocket__card">
        <h2 className="delete-pocket__title">DELETE THIS EXPENSE?</h2>
        <div className="delete-pocket__actions">
          <img
            className="delete-pocket__cancel"
            src={XIcon}
            onClick={onCancel}
            alt="cancel delete"
          />
          <img
            className="delete-pocket__yes"
            src={TickIcon}
            onClick={handleDelete}
            alt="tick delete"
          />
        </div>
      </div>
    </div>
  );
}

export default DeletePocket;
