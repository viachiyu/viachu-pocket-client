import "./ProfileCard.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chevronDown from "../../assets/icons/chevron_down.svg";

function ProfileCard({ filteredProfiles }) {
  const [collapsedStates, setCollapsedStates] = useState({});
  const [toggleState, setToggleState] = useState({});
  const [expenseProfile, setExpenseProfile] = useState(null);
  const { pocketsId } = useParams();

  const toggleTab = (index, profileId) => {
    setToggleState((prev) => ({
      ...prev,
      [profileId]: index,
    }));
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const fetchExpenseToken = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL +
            "/pockets/" +
            pocketsId +
            "/expensesprofiles",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setExpenseProfile(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExpenseToken();
  }, [pocketsId]);

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

  const calculateTotalOwed = (expenses, chosenProfileId) => {
    if (!expenses) {
      return 0;
    }
    const totalOwed = expenses.reduce((total, expense) => {
      if (expense.paid_by === chosenProfileId) {
        total += expense.single_expense;
      }
      return total;
    }, 0);
    return totalOwed;
  };

  const calculateTotalDebt = (expenses, profileId) => {
    if (!expenses) {
      return 0;
    }
    return expenses.reduce((totalDebt, expense) => {
      if (expense.profile_id === profileId && expense.paid_by !== profileId) {
        totalDebt += expense.single_expense;
      }
      return totalDebt;
    }, 0);
  };

  return (
    <>
      {filteredProfiles.map((profile) => {
        const totalOwed = calculateTotalOwed(expenseProfile, profile.id);
        const totalDebt = calculateTotalDebt(expenseProfile, profile.id);

        return (
          <article className="profile" key={profile.id}>
            <div className="profile__wrapper">
              <div className="profile__top">
                <h2 className="profile__name">{profile.name}</h2>
                <div className="profile__totals">
                  <p className="profile__total">total owed / ${totalOwed}</p>
                  <p className="profile__total">total debt / ${totalDebt}</p>
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
                    <p> mimimimi</p>
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
                    <p> mimimimi</p>
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
