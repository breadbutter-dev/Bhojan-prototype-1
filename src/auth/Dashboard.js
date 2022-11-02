import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout, getUserItems } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [selectItems, setSelectItems] = useState(false);

  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    getUserItems(user ? user.email : "")
      .then((data) => {
        if (data) {
          const itemsList = [];
          data.forEach((doc) => {
            itemsList.push(doc.data());
          });
          setItems(itemsList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      {/* Navigation bar */}
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <a className="navbar-brand" href="#">
          Bhojan
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          {/* <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
          </ul> */}
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
              <div className="nav-link" style={{ color: "white" }}>
                {name}
              </div>
            </li> */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbardrop"
                data-toggle="dropdown"
                style={{ color: "white" }}
              >
                {name}
              </a>
              <div className="dropdown-menu">
                <div className="dropdown-item" style={{ cursor: "pointer" }}>
                  Profile
                </div>
                <div className="dropdown-item" style={{ cursor: "pointer" }}>
                  Settings
                </div>
                <div
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={logout}
                >
                  Logout
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="menu-bar">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            setSelectItems(!selectItems);
          }}
        >
          {selectItems && "Unselect items"}
          {!selectItems && "Select items"}
        </button>
      </div>

      {/* Unordered List */}
      <ul className="list-group" style={{ margin: "10px" }}>
        {items.map((x, index) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={index}
            >
              <span>
                {selectItems && (
                  <span style={{ padding: "10px" }}>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      checked={false}
                    />
                  </span>
                )}
                <strong>{x.itemName}</strong>{" "}
                {x.unitName !== "count" && x.unitName}
              </span>
              <span>
                <span className="badge badge-primary badge-pill">
                  {x.quantity}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dashboard;
