import "./AddPocketCard.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import chevronRight from "../../assets/icons/Expand_white.svg";

function AddPocketCard() {
  const [message, setMessage] = useState(null);
  const [chosenProfile, setChosenProfile] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const fetchProfiles = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL + "/pockets/profiles",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const loggedInUser = data.find(
          (profile) => profile.email === sessionStorage.getItem("email")
        );
        setChosenProfile(loggedInUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfiles();
  }, []);

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
      await axios.post(
        process.env.REACT_APP_BASE_URL + "/pockets/pocket_profile",
        {
          pocket_id: newPocket.id,
          profile_id: chosenProfile.id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setMessage("Success!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("Please fill out all the fields.");
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
            placeholder="Name"
          />
        </label>
        <label className="add-pocket__group">
          <p className="add-pocket__label">Notes</p>
          <input
            id="notes"
            name="notes"
            type="text"
            className="add-pocket__input"
            placeholder="Description of the pocket"
          />
        </label>
        <label className="add-pocket__group">
          <p className="add-pocket__label">Invite your friends!</p>
          <input
            type="text"
            className="add-pocket__input"
            placeholder="Type their email..."
          />
        </label>
        <button type="submit" className="add-pocket__button">
          <p className="add-pocket__button-text">CREATE </p>
          <img className="add-pocket__arrow" src={chevronRight} />
        </button>
        {message && (
          <p
            className={`add__message ${
              message.includes("Please")
                ? "add-pocket__error"
                : "add-pocket__success"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </article>
  );
}
export default AddPocketCard;
