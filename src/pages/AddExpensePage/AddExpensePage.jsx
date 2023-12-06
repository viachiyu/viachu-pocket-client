import "./AddExpensePage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import chevronRight from "../../assets/icons/Expand_white.svg";

function AddExpensePage() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [profileNameList, setProfileNameList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const { pocketsId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileNameList = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL + "pockets/" + pocketsId + "/profiles",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setProfileNameList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfileNameList();
  }, [pocketsId]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL + "categories",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setCategoryList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategoryList();
  }, []);

  const handleCheckboxChange = (value) => {
    if (selectedPeople.includes(value)) {
      setSelectedPeople(selectedPeople.filter((person) => person !== value));
    } else {
      setSelectedPeople([...selectedPeople, value]);
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const token = sessionStorage.getItem("token");

      const formData = new FormData(event.target);
      const expenseData = {};
      formData.forEach((value, key) => {
        expenseData[key] = value;
      });

      const totalExpense = parseFloat(expenseData.total_expense);
      const numberOfPeople = selectedPeople.length;
      const singleExpense = totalExpense / numberOfPeople;
      expenseData.single_expense = singleExpense.toFixed(2);
      expenseData.headcount = numberOfPeople;
      expenseData.pocket_id = pocketsId;

      const selectedPayerId = formData.get("profile_id");
      expenseData.profile_id = selectedPayerId;

      const selectedCategoryId = formData.get("category_id");
      expenseData.category_id = selectedCategoryId;

      const { data: newExpense } = await axios.post(
        process.env.REACT_APP_BASE_URL +
          "/pockets/" +
          pocketsId +
          "/expenses/add",
        expenseData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const expenseId = newExpense && newExpense.id;
      if (expenseId) {
        const expenseProfileData = selectedPeople.map((profileId) => ({
          expense_id: expenseId,
          profile_id: profileId,
        }));

        await axios.post(
          process.env.REACT_APP_BASE_URL +
            "/pockets/" +
            pocketsId +
            "/expense_profile/add",
          expenseProfileData,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setSuccess("Success!");
        setTimeout(() => {
          navigate(`/pockets/${pocketsId}/expenses`);
        }, 1000);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Please fill out all the fields.");
    }
  };

  if (profileNameList === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main className="add">
        <div className="add__wrapper">
          <h1 className="add__title">Add New Expense</h1>

          <form className="add__form" onSubmit={handleSubmit}>
            <div className="add__card">
              <div className="add__one">
                <label className="add__group">
                  <p className="add__label">Total</p>
                  <input
                    name="total_expense"
                    id="total_expense"
                    type="number"
                    placeholder="00.00"
                    className="add__input add__input--total"
                  />
                </label>

                <label className="add__group">
                  <p className="add__label">Date</p>
                  <input
                    name="date"
                    id="date"
                    type="date"
                    className="add__input"
                  />
                </label>
              </div>

              <label className="add__group">
                <p className="add__label">Name</p>
                <input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Description of expense"
                  className="add__input add__input--description"
                />
              </label>

              <div className="add__two">
                <label className="add__group">
                  <p className="add__label">Paid By</p>
                  <select
                    name="profile_id"
                    id="profile_id"
                    placeholder="Please Select"
                    className="add__input add__input--selection"
                  >
                    {profileNameList.map((profileName) => (
                      <option value={profileName.id}>{profileName.name}</option>
                    ))}
                  </select>
                </label>

                <label className="add__group">
                  <p className="add__label">Category</p>
                  <select
                    name="category_id"
                    id="category_id"
                    placeholder="Please Select"
                    className="add__input add__input--selection"
                  >
                    {categoryList.map((category) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="add__check-multiple">
                <label className="add__group">
                  <p className="add__label">Who's Involved?</p>
                  <div className="add__input add__input--group">
                    {profileNameList.map((profileName) => (
                      <label className="add__checkbox">
                        <input
                          name="headcount"
                          id="headcount"
                          type="checkbox"
                          value={profileName.id}
                          checked={selectedPeople.includes(profileName.id)}
                          onChange={() => handleCheckboxChange(profileName.id)}
                        />
                        <p className="add__single">{profileName.name}</p>
                      </label>
                    ))}
                  </div>
                </label>
              </div>
              {error && <div className="add__error">{error}</div>}
              <button type="submit" className="add__button">
                <p className="add__button-text">CREATE </p>
                <img
                  className="add__arrow"
                  src={chevronRight}
                  alt="right arrow"
                />
              </button>
              {success && <p className="add__success">{success}</p>}
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default AddExpensePage;
