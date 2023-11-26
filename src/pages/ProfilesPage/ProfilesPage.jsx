import "./ProfilesPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileList from "../../components/ProfilesList/ProfileCard";
import ActiveProfile from "../../components/ActiveProfile/ActiveProfile";

function ProfilesPage() {
  const [chosenProfile, setChosenProfile] = useState(null);
  const [expenseProfileList, setExpenseProfileList] = useState(null);
  const [profileList, setProfileList] = useState(null);

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
  }, [profileId]);

  if (chosenProfile === null) {
    return <p>Loading...</p>;
  }

  const filteredProfiles = profileList.filter(
    (profile) => profile.id !== chosenProfile.id
  );

  console.log(profileList);

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
        </div>
      </main>
    </>
  );
}

export default ProfilesPage;
