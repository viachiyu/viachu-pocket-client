import "./PocketsPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Pocket from "../../components/Pocket/Pocket";

function PocketsPage() {
  const [pocketsList, setPocketsList] = useState(null);

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

  if (pocketsList === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <main className="pockets">
        <div className="pockets__wrapper">
          <h1 className="pockets__title">Your Pockets</h1>
          <section className="pockets__container">
            <Pocket pocketsList={pocketsList} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PocketsPage;
