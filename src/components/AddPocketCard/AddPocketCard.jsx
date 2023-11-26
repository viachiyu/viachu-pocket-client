import "./AddPocketCard.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import chevronRight from "../../assets/icons/Expand_white.svg";

function AddPocketCard() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const token = sessionStorage.getItem("token");

      const formData = new FormData(event.target);
      const pocketData = {};
      formData.forEach((value, key) => {
        pocketData[key] = value;
      });

      const { data: newPocket } = await axios.post(
        process.env.REACT_APP_BASE_URL + "/pockets",
        pocketData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setSuccess("Success!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Please fill out all the fields.");
    }
  };

  return (
    <article className="add-pocket">
      <form className="add-pocket__form" onSubmit={handleSubmit}>
        <label className="add-pocket__group">
          <p className="add-pocket__label">Pocket Name</p>
          <input
            id="name"
            name="name"
            type="text"
            className="add-pocket__input"
            placeholder="name of the pocket"
          />
        </label>
        <label className="add-pocket__group">
          <p className="add-pocket__label">Notes</p>
          <input
            id="notes"
            name="notes"
            type="text"
            className="add-pocket__input"
            placeholder="description of the pocket"
          />
        </label>
        <label className="add-pocket__group">
          <p className="add-pocket__label">Invite your friends!</p>
          <input
            id="email"
            name="email"
            type="text"
            className="add-pocket__input"
            placeholder="type their email..."
          />
        </label>
        {error && <div className="add__error">{error}</div>}
        <button type="submit" className="add-pocket__button">
          <p className="add-pocket__button-text">CREATE </p>
          <img className="add-pocket__arrow" src={chevronRight} />
        </button>
        {success && <p className="add__success">{success}</p>}
      </form>
    </article>
  );
}
export default AddPocketCard;
