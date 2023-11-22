import "./MainPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PocketsPage from "../../components/PocketsPage/PocketsPage";
import ExpensesPage from "../../components/ExpensesPage/ExpensesPage";

function MainPage() {
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
      <PocketsPage pocketsList={pocketsList} />
      <ExpensesPage />
      <Footer />
    </>
  );
}

export default MainPage;
