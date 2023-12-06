import "./DeleteExpense.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import TickIcon from "../../assets/icons/tick_icon.svg";
import XIcon from "../../assets/icons/close_icon.svg";

function DeleteExpense({ expenseId, onCancel }) {
  const { pocketsId } = useParams();

  const handleDelete = async () => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(
        process.env.REACT_APP_BASE_URL +
          "/pockets/" +
          pocketsId +
          "/expenses/" +
          expenseId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="delete">
      <h2 className="delete__title">DELETE THIS EXPENSE?</h2>
      <div className="delete__actions">
        <img
          className="delete__cancel"
          src={XIcon}
          onClick={onCancel}
          alt="cancel icon"
        />
        <img
          className="delete__yes"
          src={TickIcon}
          onClick={handleDelete}
          alt="tick icon"
        />
      </div>
    </div>
  );
}

export default DeleteExpense;
