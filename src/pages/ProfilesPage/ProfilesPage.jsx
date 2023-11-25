import "./ProfilesPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

function ProfilesPage() {
  const [profileList, setProfileList] = useState([]);
  const { pocketsId } = useParams();

  return (
    <>
      <main className="profiles">
        <div className="profiles__wrapper">
          <h1 className="profiles__title">Pocket Members</h1>
          <ProfileCard />
        </div>
      </main>
    </>
  );
}

export default ProfilesPage;
