import "./PocketsPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Pocket from "../../components/PocketCard/Pocket";

function PocketsPage({ setSelectedPocketId }) {
  const [pocketsList, setPocketsList] = useState([]);

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
        </div>
      </main>
    </>
  );
}

export default PocketsPage;
