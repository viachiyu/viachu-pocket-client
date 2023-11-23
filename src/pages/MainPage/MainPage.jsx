// import "./MainPage.scss";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import PocketsPage from "../PocketsPage/PocketsPage";
// import ExpensesPage from "../ExpensesPage/ExpensesPage";
// import AddExpensePage from "../AddExpensePage/AddExpensePage";
// import ProfilesPage from "../ProfilesPage/ProfilesPage";
// // import EditExpensePage from "./components/EditExpensePage/EditExpensePage";
// // import EditProfilePage from "./components/EditProfilePage/EditProfilePage";

// function MainPage() {
//   const [pocketsList, setPocketsList] = useState([]);
//   const [selectedPocket, setSelectedPocket] = useState(null);
//   const [showExpensesPage, setShowExpensesPage] = useState(false);
//   const [showAddExpensePage, setShowAddExpensePage] = useState(false);
//   const [showProfilesPage, setShowProfilesPage] = useState(false);

//   const handlePocketClick = (pocketId) => {
//     setSelectedPocket(pocketId);
//     setShowExpensesPage(false);
//     setShowAddExpensePage(false);
//     setShowProfilesPage(false);
//   };

//   const handleExpensesClick = () => {
//     setShowExpensesPage(true);
//     setShowAddExpensePage(false);
//     setShowProfilesPage(false);
//   };

//   const handleAddExpenseClick = () => {
//     setShowExpensesPage(false);
//     setShowAddExpensePage(true);
//     setShowProfilesPage(false);
//   };

//   const handleProfilesClick = () => {
//     setShowExpensesPage(false);
//     setShowAddExpensePage(false);
//     setShowProfilesPage(true);
//   };

//   useEffect(() => {
//     const fetchPockets = async () => {
//       const token = sessionStorage.getItem("token");

//       try {
//         const { data } = await axios.get(
//           process.env.REACT_APP_BASE_URL + "/pockets",
//           {
//             headers: {
//               Authorization: "Bearer " + token,
//             },
//           }
//         );
//         setPocketsList(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchPockets();
//   });

//   if (pocketsList === null) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <Header />
//       {selectedPocket === null && (
//         <PocketsPage
//           pocketsList={pocketsList}
//           onPocketClick={handlePocketClick}
//         />
//       )}
//       {/* <ExpensesPage /> */}
//       {showExpensesPage ? (
//         <ExpensesPage
//           pocketId={selectedPocket}
//           onExpensesClick={handleExpensesClick}
//         />
//       ) : (
//         ""
//       )}
//       {showAddExpensePage && (
//         <AddExpensePage
//           pocketId={selectedPocket}
//           onAddExpenseClick={handleAddExpenseClick}
//         />
//       )}
//       {showProfilesPage && (
//         <ProfilesPage
//           pocketId={selectedPocket}
//           onProfilesClick={handleProfilesClick}
//         />
//       )}

//       <Footer
//         pocketId={selectedPocket}
//         onPocketClick={handlePocketClick}
//         onExpensesClick={handleExpensesClick}
//         onAddExpenseClick={handleAddExpenseClick}
//         onProfilesClick={handleProfilesClick}
//       />
//     </>
//   );
// }

// export default MainPage;
