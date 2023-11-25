import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

function ShellPage({ selectedPocketId, setSelectedPocketId }) {
  return (
    <>
      <Header />
      <Outlet />
      <Footer selectedPocketId={selectedPocketId} />
    </>
  );
}
export default ShellPage;
