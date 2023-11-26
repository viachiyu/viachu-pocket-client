import "./ProfilesPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileList from "../../components/ProfilesList/ProfileCard";
import ActiveProfile from "../../components/ActiveProfile/ActiveProfile";

function ProfilesPage() {
  const [chosenProfile, setChosenProfile] = useState(null);
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
    fetchProfiles();
  }, [profileId]);

  if (chosenProfile === null) {
    return <p>Loading...</p>;
  }

  const filteredProfiles = profileList.filter(
    (profile) => profile.id !== chosenProfile.id
  );

  return (
    <>
      <main className="profiles">
        <div className="profiles__wrapper">
          <h1 className="profiles__title">Your Profile</h1>
          <ActiveProfile chosenProfile={chosenProfile} />
        </div>
        <div className="profiles__wrapper profiles__wrapper--bottom">
          <h2 className="profiles__title">Pocket People</h2>
          <ProfileList filteredProfiles={filteredProfiles} />
        </div>
      </main>
    </>
  );
}

export default ProfilesPage;
