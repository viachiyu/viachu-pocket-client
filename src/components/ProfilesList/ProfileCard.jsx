import "./ProfileCard.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chevronDown from "../../assets/icons/chevron_down.svg";

function ProfileCard({ filteredProfiles }) {
  const [collapsedStates, setCollapsedStates] = useState({});

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const initialCollapsedStates = {};
    filteredProfiles.forEach((profile) => {
      initialCollapsedStates[profile.id] = true;
    });
    setCollapsedStates(initialCollapsedStates);
  }, [filteredProfiles]);

  const handleToggle = (clickedProfileId) => {
    setCollapsedStates((prev) => ({
      ...prev,
      [clickedProfileId]: !prev[clickedProfileId],
    }));
  };

  return (
    <>
      {filteredProfiles.map((profile) => (
        <article className="profile">
          <div className="profile__wrapper">
            <div className="profile__top">
              <h2 className="profile__name">{profile.name}</h2>
              <div className="profile__totals">
                <p className="profile__total">total owed / $100</p>
                <p className="profile__total">total debt / $100</p>
              </div>
            </div>
            <button
              className="profile__trigger-button"
              onClick={() => handleToggle(profile.id)}
            >
              <img
                className={`profile__down-icon ${
                  collapsedStates[profile.id] ? "rotated" : ""
                }`}
                src={chevronDown}
                alt="Toggle"
              />
            </button>
          </div>

          {!collapsedStates[profile.id] && (
            <div className="profile__container">
              <div className="profile__tabs">
                <button
                  className={`profile__tab
                ${toggleState === 1 ? "profile__tab--active" : ""}`}
                  onClick={() => toggleTab(1)}
                >
                  Info
                </button>
                <button
                  className={`profile__tab
                ${toggleState === 2 ? "profile__tab--active" : ""}`}
                  onClick={() => toggleTab(2)}
                >
                  Owed
                </button>
                <button
                  className={`profile__tab
                ${toggleState === 3 ? "profile__tab--active" : ""}`}
                  onClick={() => toggleTab(3)}
                >
                  Debt
                </button>
              </div>
              <div className="profile__contents">
                <div
                  className={`profile__content
                ${toggleState === 1 ? "profile__content--active" : ""}`}
                >
                  <h3 className="profile__label">Payment Details:</h3>
                  <p> PayPal: {profile.payment_info}</p>
                </div>

                <div
                  className={`profile__content
                ${toggleState === 2 ? "profile__content--active" : ""}`}
                >
                  <h3 className="profile__label">Owes Breakdown</h3>
                  <p> mimimimi</p>
                </div>
                <div
                  className={`profile__content
                ${toggleState === 3 ? "profile__content--active" : ""}`}
                >
                  <h3 className="profile__label">Debt Breakdown</h3>
                  <p> mimimimi</p>
                </div>
              </div>
            </div>
          )}
        </article>
      ))}
    </>
  );
}

export default ProfileCard;
