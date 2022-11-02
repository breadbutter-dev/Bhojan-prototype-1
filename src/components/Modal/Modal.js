import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { itemAction } from "../../store/items";
import { createItem } from "./../../firebase";

const Modal = (prop) => {
  const dispatch = useDispatch();

  const [itemNameInput, setItemNameInput] = useState("");
  const [itemQuantityInput, setItemQuantityInput] = useState(0);
  const [itemUnitTypeInput, setItemUnitTypeInput] = useState("count");

  const itemNameInputChangeHandler = (event) => {
    setItemNameInput(event.target.value);
  };
  const itemQuantityInputChangeHandler = (event) => {
    setItemQuantityInput(event.target.value);
  };
  const itemUnitTypeInputChangeHandler = (event) => {
    setItemUnitTypeInput(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Reached here");
    console.log(itemNameInput);
    console.log(itemUnitTypeInput);
    if (itemNameInput !== "" && itemQuantityInput > 0) {
      const obj = {
        itemName: itemNameInput,
        quantity: parseFloat(itemQuantityInput),
        unitName: itemUnitTypeInput,
        creatorEmail: "rishabbahal@gmail.com",
      };
      // Update Database
      createItem(obj)
        .then((data) => {
          console.log(data);
          // Update state
          dispatch(itemAction.createItem(obj));
          // Resetting form
          setItemNameInput("");
          setItemQuantityInput(0);
          setItemUnitTypeInput("count");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="modal" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Create item</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <div className="modal-body">
            <form onSubmit={formSubmitHandler}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={itemNameInput}
                  onChange={itemNameInputChangeHandler}
                />
              </div>
              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={itemQuantityInput}
                  onChange={itemQuantityInputChangeHandler}
                />
              </div>
              <div className="form-group">
                <label>Unit type:</label>
                <input
                  type="text"
                  className="form-control"
                  id="unit"
                  value={itemUnitTypeInput}
                  onChange={itemUnitTypeInputChangeHandler}
                />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-success"
              data-dismiss="modal"
              onClick={formSubmitHandler}
            >
              Create
            </button>
            {/* <button type="button" className="btn btn-outline-danger" data-dismiss="modal">
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
