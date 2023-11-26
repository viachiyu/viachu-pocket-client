import "./EditExpensePage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import chevronRight from "../../assets/icons/Expand_white.svg";
import leftArrow from "../../assets/icons/leftarrow_icon.svg";

function EditExpensePage() {
  const [fields, setFields] = useState({
    total_expense: "",
    date: "",
    name: "",
    category: "",
    profile_id: "",
    single_expense: "",
  });
  const [profileNameList, setProfileNameList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [expenseProfile, setExpenseProfile] = useState([]);
  const { pocketsId } = useParams();
  const { expenseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const getExpense = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL +
            "/pockets/" +
            pocketsId +
            "/expenses/" +
            expenseId,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setFields(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProfileNameList = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL +
            "/pockets/" +
            pocketsId +
            "/profiles",
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

    const fetchCategoryList = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL + "/categories",
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

    const getExpenseProfile = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL +
            "/pockets/" +
            pocketsId +
            "/expensesprofiles",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(data);
        setExpenseProfile(data);
      } catch (error) {
        console.error(error);
      }
    };
    getExpenseProfile();
    fetchCategoryList();
    fetchProfileNameList();
    getExpense();
  }, []);

  const formattedDate = new Date("2023-05-15T23:00:00.000Z")
    .toISOString()
    .split("T")[0];

  function filterExpenseProfileByExpenseId(expenseProfile, expenseId) {
    return expenseProfile.filter((item) => item.expense_id === expenseId);
  }
  const filteredExpenseProfile = filterExpenseProfileByExpenseId(
    expenseProfile,
    expenseId
  );

  console.log(filteredExpenseProfile);

  const handleCheckboxChange = (value) => {
    setSelectedPeople((prevSelectedPeople) => {
      if (prevSelectedPeople.includes(value)) {
        return prevSelectedPeople.filter((person) => person !== value);
      } else {
        return [...prevSelectedPeople, value];
      }
    });
  };

  const updateFields = (event) => {
    const currentField = event.target;
    if (
      currentField.name === "total_expense" ||
      currentField.name === "name" ||
      currentField.name === "description" ||
      currentField.name === "category_id" ||
      currentField.name === "profile_id"
    ) {
      setFields({ ...fields, [currentField.name]: currentField.value });
    } else if (currentField.name === "expense_id") {
      setFields({
        ...fields,
        id: expenseId,
      });
    }
    console.log(fields);
    return;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedExpenses = { ...fields };
    delete updatedExpenses.expense_name;
    console.log(updatedExpenses);

    try {
      await axios.put(
        process.env.REACT_APP_BASE_URL +
          "/pockets/" +
          pocketsId +
          "/expenses/" +
          expenseId,
        updatedExpenses
      );
      return setTimeout(() => {
        navigate(`/pockets/${pocketsId}/expenses}`);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="edit">
        <div className="edit__wrapper">
          <div className="edit__top">
            <Link
              to={`/pockets/${pocketsId}/expenses`}
              className="edit__back-link"
            >
              <img className="edit__back" src={leftArrow} />
            </Link>
            <h1 className="edit__title">Edit expense</h1>
          </div>

          <form className="edit__form" onSubmit={handleSubmit}>
            <div className="edit__card">
              <div className="edit__one">
                <label className="edit__group">
                  <p className="edit__label">Total</p>
                  <input
                    name="total_expense"
                    id="total_expense"
                    type="number"
                    onChange={updateFields}
                    value={fields.total_expense}
                    className="edit__input edit__input--total"
                  />
                </label>

                <label className="edit__group">
                  <p className="edit__label">Date</p>
                  <input
                    name="date"
                    id="date"
                    type="date"
                    value={formattedDate}
                    onChange={updateFields}
                    className="edit__input"
                  />
                </label>
              </div>

              <label className="edit__group">
                <p className="edit__label">Name</p>
                <input
                  name="name"
                  id="name"
                  type="text"
                  onChange={updateFields}
                  className="edit__input edit__input--description"
                  value={fields.name}
                />
              </label>

              <div className="edit__two">
                <label className="edit__group">
                  <p className="edit__label">Paid By</p>
                  <select
                    name="profile_id"
                    id="profile_id"
                    placeholder="Please Select"
                    className="edit__input edit__input--selection"
                    onChange={updateFields}
                    value={fields.profile_id}
                  >
                    {profileNameList.map((profileName) => (
                      <option value={profileName.id}>{profileName.name}</option>
                    ))}
                  </select>
                </label>

                <label className="edit__group">
                  <p className="edit__label">Category</p>
                  <select
                    name="category_id"
                    id="category_id"
                    placeholder="Please Select"
                    className="edit__input edit__input--selection"
                    onChange={updateFields}
                    value={fields.category_id}
                  >
                    {categoryList.map((category) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="edit__check-multiple">
                <label className="edit__group">
                  <p className="edit__label">Who's Involved?</p>
                  <div className="edit__input edit__input--group">
                    {profileNameList.map((profileName) => (
                      <label className="edit__checkbox" key={profileName.id}>
                        <input
                          name="headcount"
                          id="headcount"
                          type="checkbox"
                          value={profileName.id}
                          checked={selectedPeople.includes(profileName.id)}
                          onChange={() => handleCheckboxChange(profileName.id)}
                        />
                        <p className="edit__single">{profileName.name}</p>
                      </label>
                    ))}
                  </div>
                </label>
              </div>
              {/* {error && <div className="edit__error">{error}</div>} */}
              <button type="submit" className="edit__button">
                <p className="edit__button-text">UPDATE </p>
                <img className="edit__arrow" src={chevronRight} />
              </button>
              {/* {success && <p className="edit__success">{success}</p>} */}
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default EditExpensePage;
