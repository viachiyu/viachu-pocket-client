import "./PocketsPage.scss";
import Pocket from "../PocketCard/Pocket";

function PocketsPage({ pocketsList, onPocketClick }) {
  const handlePocketClick = (pocketId) => {
    // Pass the pocket click event up to the parent component (MainPage)
    onPocketClick(pocketId);
  };

  return (
    <main className="pockets">
      <div className="pockets__wrapper">
        <h1 className="pockets__title">Your Pockets</h1>
        <section className="pockets__container">
          <Pocket pocketsList={pocketsList} onPocketClick={handlePocketClick} />
        </section>
      </div>
    </main>
  );
}

export default PocketsPage;
