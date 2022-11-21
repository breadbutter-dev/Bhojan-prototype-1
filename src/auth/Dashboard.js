import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db } from "../services/auth.service";
import { query, collection, getDocs, where } from "firebase/firestore";
import Navbar from "../components/Navbar/Navbar";

import * as ReactDOM from "react-dom";

import { useDispatch } from "react-redux";
import { itemAction } from "../store/items";
import { userAction } from "../store/user";
import { useSelector } from "react-redux";
import Modal from "../components/Modal/Modal";

import { deleteItem, getUserItems } from "../services/item.service";
import Inventory from "../components/Inventory/Inventory";
import ToBuy from "../components/ToBuy/ToBuy";
import Archived from "../components/Archived/Archived";

function Dashboard() {
  const dispatch = useDispatch();

  const itemsState = useSelector((state) => state.item.items);
  // const userStateName = useSelector((state) => state.user.name);
  // const userStateEmail = useSelector((state) => state.user.email);

  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [suggestedItems, setSuggestedItems] = useState([]);
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
  const backupItems = [...items];
  const filterBySearch = (event) => {
    console.log("filterBySearch");
    // Access input value
    const query = event.target.value;
    if(query==="") return setSuggestedItems([])
    // Create copy of item list
    // Include all elements which includes the search query
    var updatedList = items.filter((item) => {
      if (item.itemName.toLowerCase().includes(query.toLowerCase()))
        return item;
    });
    // Trigger render with updated values
    if (updatedList.length == 0) setSuggestedItems(backupItems);
    else setSuggestedItems(updatedList);
  };

  return (
    <div className="dashboard">
      <Navbar name={name}></Navbar>
      {/* Modal */}
      {ReactDOM.createPortal(<Modal />, document.getElementById("the-modal"))}
      {/* Modal Ends */}
      {/* Search bar */}
      <div
        className="input-group mb-3 col-sm-10 col-md-6 col-lg-4"
        id="search-bar"
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={filterBySearch}
        />
      </div>
      {/* Search bar ends*/}
      <div className="menu-bar">
        <button
          type="button"
          className="btn btn-outline-secondary menu-button"
          onClick={() => {
            setSelectItems(!selectItems);
          }}
        >
          {selectItems && "Unselect items"}
          {!selectItems && "Select items"}
        </button>
        <button
          type="button"
          className="btn btn-outline-primary menu-button"
          data-toggle="modal"
          data-target="#myModal"
        >
          Create item
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* Inventory */}
        <Inventory
          items={items}
          suggestedItems={suggestedItems}
          selectItems={selectItems}
          deleteDocument={deleteDocument}
        />
        {/* To Buy */}
        <ToBuy
          items={items}
          suggestedItems={suggestedItems}
          selectItems={selectItems}
          deleteDocument={deleteDocument}
        />
        {/* Archived */}
        <Archived
          items={items}
          suggestedItems={suggestedItems}
          selectItems={selectItems}
          deleteDocument={deleteDocument}
        />
      </div>

      {/* Unordered List */}
    </div>
  );
}

export default Dashboard;
