import "./ProfilesPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileList from "../../components/ProfileCard/ProfileCard";
import ActiveProfile from "../../components/ActiveProfile/ActiveProfile";
import chevronRight from "../../assets/icons/Expand_white.svg";

function ProfilesPage() {
  const [chosenProfile, setChosenProfile] = useState(null);
  const [expenseProfileList, setExpenseProfileList] = useState(null);
  const [profileList, setProfileList] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [message, setMessage] = useState(null);

  const { pocketsId } = useParams();
  const { profileId } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const fetchProfiles = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL +
            "/pockets/" +
            pocketsId +
            "/profiles",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setProfileList(data);

        const loggedInUser = data.find(
          (profile) => profile.email === sessionStorage.getItem("email")
        );
        setChosenProfile(loggedInUser);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchExpenseProfileList = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL +
            "/pockets/" +
            pocketsId +
            "/expensesprofiles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExpenseProfileList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExpenseProfileList();
    fetchProfiles();
  }, [pocketsId, profileId]);

  if (chosenProfile === null) {
    return <p>Loading...</p>;
  }

  const filteredProfiles = profileList.filter(
    (profile) => profile.id !== chosenProfile.id
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    if (email.includes("@")) {
      setMessage("Invitation sent!");
    } else {
      setMessage("Invalid email address");
    }
  };

  return (
    <>
      <main className="profiles">
        <div className="profiles__wrapper">
          <h1 className="profiles__title">Your Profile</h1>
          <ActiveProfile
            chosenProfile={chosenProfile}
            expenseProfilesList={expenseProfileList}
            filteredProfiles={filteredProfiles}
          />
        </div>
        <div className="profiles__wrapper profiles__wrapper--bottom">
          <h2 className="profiles__title">Pocket People</h2>
          <ProfileList
            profileList={profileList}
            filteredProfiles={filteredProfiles}
            expenseProfilesList={expenseProfileList}
          />
          <div className="profiles__add">
            <button
              className={`profiles__button ${
                isFormVisible ? "profiles__button--active" : ""
              }`}
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              + ADD
            </button>
            {isFormVisible && (
              <form className="profiles__invite" onSubmit={handleSubmit}>
                <label className="profiles__group">
                  <p className="profiles__label">
                    Invite your friends via Email!
                  </p>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="profiles__input"
                    placeholder="type their email..."
                  />
                </label>
                <button type="submit" className="profiles__send">
                  <p className="profiles__button-text">SEND </p>
                  <img
                    className="profiles__arrow"
                    src={chevronRight}
                    alt="arrow"
                  />
                </button>
                {message && (
                  <p
                    className={`profiles__message ${
                      message.includes("Invalid")
                        ? "profiles__error"
                        : "profiles__success"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfilesPage;
