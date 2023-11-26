import "./ProfileCard.scss";
import { useEffect, useState } from "react";
import chevronDown from "../../assets/icons/chevron_down.svg";

function ProfileCard({ filteredProfiles, expenseProfilesList, profileList }) {
  const [collapsedStates, setCollapsedStates] = useState({});
  const [toggleState, setToggleState] = useState({});

  const toggleTab = (index, profileId) => {
    setToggleState((prev) => ({
      ...prev,
      [profileId]: index,
    }));
  };

  useEffect(() => {
    const initialCollapsedStates = {};
    const initialToggleState = {};
    filteredProfiles.forEach((profile) => {
      initialCollapsedStates[profile.id] = true;
      initialToggleState[profile.id] = 1;
    });
    setCollapsedStates(initialCollapsedStates);
    setToggleState(initialToggleState);
  }, [filteredProfiles]);

  const handleToggle = (clickedProfileId) => {
    setCollapsedStates((prev) => ({
      ...prev,
      [clickedProfileId]: !prev[clickedProfileId],
    }));
  };

  return (
    <>
      {filteredProfiles.map((profile) => {
        return (
          <article className="profile" key={profile.id}>
            <div className="profile__wrapper">
              <div className="profile__top">
                <h2 className="profile__name">{profile.name}</h2>
                <div className="profile__totals">
                  <p className="profile__total">total owed / $idk</p>
                  <p className="profile__total">total debt / $idk</p>
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
                  ${
                    toggleState[profile.id] === 1 ? "profile__tab--active" : ""
                  }`}
                    onClick={() => toggleTab(1, profile.id)}
                  >
                    Info
                  </button>
                  <button
                    className={`profile__tab
                  ${
                    toggleState[profile.id] === 2 ? "profile__tab--active" : ""
                  }`}
                    onClick={() => toggleTab(2, profile.id)}
                  >
                    Owed
                  </button>
                  <button
                    className={`profile__tab
                  ${
                    toggleState[profile.id] === 3 ? "profile__tab--active" : ""
                  }`}
                    onClick={() => toggleTab(3, profile.id)}
                  >
                    Debt
                  </button>
                </div>
                <div className="profile__contents">
                  <div
                    className={`profile__content
                  ${
                    toggleState[profile.id] === 1
                      ? "profile__content--active"
                      : ""
                  }`}
                  >
                    <h3 className="profile__label">Payment Details:</h3>
                    <p> PayPal: {profile.payment_info}</p>
                  </div>

                  <div
                    className={`profile__content
                  ${
                    toggleState[profile.id] === 2
                      ? "profile__content--active"
                      : ""
                  }`}
                  >
                    <h3 className="profile__label">Owes Breakdown</h3>
                    {profileList
                      .filter((miniprofile) => miniprofile.id !== profile.id)
                      .map((miniprofile) => (
                        <div className="profile__box" key={miniprofile.id}>
                          <p className="profile__names">
                            {miniprofile.name} owes you / $idk
                          </p>
                        </div>
                      ))}
                  </div>
                  <div
                    className={`profile__content
                  ${
                    toggleState[profile.id] === 3
                      ? "profile__content--active"
                      : ""
                  }`}
                  >
                    <h3 className="profile__label">Debt Breakdown</h3>
                    {profileList
                      .filter((miniprofile) => miniprofile.id !== profile.id)
                      .map((miniprofile) => (
                        <div className="profile__box" key={miniprofile.id}>
                          <p className="profile__names">
                            You owe {miniprofile.name} / $idk
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </>
  );
}

export default ProfileCard;
