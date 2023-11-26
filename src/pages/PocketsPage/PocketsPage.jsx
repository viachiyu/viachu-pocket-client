import "./PocketsPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Pocket from "../../components/PocketCard/Pocket";
import AddPocketCard from "../../components/AddPocketCard/AddPocketCard";

function PocketsPage({ setSelectedPocketId }) {
  const [pocketsList, setPocketsList] = useState([]);
  const [isAddCardVisible, setIsAddCardVisible] = useState(false);

  useEffect(() => {
    const fetchPockets = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL + "/pockets",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setPocketsList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPockets();
  }, []);

  const toggleAddCardVisibility = () => {
    setIsAddCardVisible(!isAddCardVisible);
  };

  return (
    <>
      <main className="pockets">
        <div className="pockets__wrapper">
          <h1 className="pockets__title">Your Pockets</h1>
          <section className="pockets__container">
            <article className="pocket">
              {pocketsList.map((pocket) => (
                <Pocket
                  pocket={pocket}
                  setSelectedPocketId={setSelectedPocketId}
                  key={pocket.id}
                />
              ))}
            </article>
          </section>
          <div className="pockets__add">
            <button
              className={`pockets__button ${
                isAddCardVisible ? "pockets__button--active" : ""
              }`}
              onClick={toggleAddCardVisibility}
            >
              + ADD NEW POCKET
            </button>
            {isAddCardVisible && <AddPocketCard />}
          </div>
        </div>
      </main>
    </>
  );
}

export default PocketsPage;
