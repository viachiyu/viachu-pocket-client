import "./PocketsPage.scss";
import Pocket from "../PocketCard/Pocket";

function PocketsPage({ pocketsList }) {
  return (
    <main className="pockets">
      <div className="pockets__wrapper">
        <h1 className="pockets__title">Your Pockets</h1>
        <section className="pockets__container">
          <Pocket pocketsList={pocketsList} />
        </section>
      </div>
    </main>
  );
}

export default PocketsPage;
