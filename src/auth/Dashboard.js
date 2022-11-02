import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, getUserItems } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from "../components/Navbar/Navbar";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
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
      <Navbar name={name}></Navbar>
      {/* Navigation bar */}

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
                      className="form-check-input"
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
