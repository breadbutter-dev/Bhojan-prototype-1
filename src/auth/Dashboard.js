import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, getUserItems } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from "../components/Navbar/Navbar";

import * as ReactDOM from "react-dom";

import { useDispatch } from "react-redux";
import { itemAction } from "../store/items";
import { userAction } from "../store/user";
import { useSelector } from "react-redux";
import Modal from "../components/Modal/Modal";

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteItem } from "./../firebase";
function Dashboard() {
  const dispatch = useDispatch();

  const itemsState = useSelector((state) => state.item.items);
  const userStateName = useSelector((state) => state.user.name);
  const userStateEmail = useSelector((state) => state.user.email);

  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [selectItems, setSelectItems] = useState(false);

  useEffect(() => {
    setItems(itemsState);
  }, [itemsState]);

  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      dispatch(userAction.setUserData(data));
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
            itemsList.push({ ...doc.data(), id: doc.id });
          });
          dispatch(itemAction.getItems(itemsList));
          // setItems(itemsList);
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

  const deleteDocument = (object) => {
    deleteItem(object)
      .then((data) => {
        dispatch(itemAction.deleteItem(object));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="dashboard">
      <Navbar name={name}></Navbar>
      {ReactDOM.createPortal(<Modal />, document.getElementById("the-modal"))}
      {/* Modal */}

      {/* Modal Ends */}
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
        <button
          type="button"
          className="btn btn-outline-primary"
          data-toggle="modal"
          data-target="#myModal"
        >
          Create item
        </button>
      </div>
      {/* Unordered List */}
      <ul className="list-group" style={{ margin: "10px" }}>
        {items.length > 0 &&
          items.map((x, index) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={index}
              >
                <span>
                  {selectItems && (
                    <span style={{ padding: "10px" }}>
                      {/* <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked={false}
                      /> */}
                      <FontAwesomeIcon
                        style={{ color: "red", cursor: "pointer" }}
                        icon={faTrashCan}
                        onClick={() => deleteDocument({ ...x, id: x.id })}
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
