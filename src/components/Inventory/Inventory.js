import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateItem } from "../../services/item.service";
import { useDispatch } from "react-redux";
import "./Inventory.css";
import { itemAction } from "../../store/items";

const Inventory = (props) => {
  const dispatch = useDispatch();
  const reduceItemQuantitybyOne = (item) => {
    const updatedItemObject = { ...item, quantity: item.quantity - 1 };
    updateItem(updatedItemObject)
      .then((resp) => {
        dispatch(itemAction.updateItem(updatedItemObject));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const increaseItemQuantitybyOne = (event, item) => {
    const updatedItemObject = { ...item, quantity: item.quantity + 1 };
    updateItem(updatedItemObject)
      .then((resp) => {
        dispatch(itemAction.updateItem(updatedItemObject));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="col-lg-4 col-md-4">
      <div className="title">
        <h3>Inventory</h3>
      </div>
      <ul className="list-group" style={{ margin: "10px" }}>
        {props.items.length > 0 &&
          props.items.map((x, index) => {
            return x.listType === "inInventory" ? (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={index}
              >
                <span>
                  {props.selectItems && (
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
                        onClick={() => props.deleteDocument({ ...x, id: x.id })}
                      />
                    </span>
                  )}
                  <strong>{x.itemName}</strong>{" "}
                  {x.unitName !== "count" && x.unitName}
                </span>
                <span>
                  <button
                    className="btn btn-default"
                    onClick={(event) => {
                      reduceItemQuantitybyOne(x);
                    }}
                  >
                    -
                  </button>
                  <span className="badge badge-primary badge-pill">
                    {x.quantity}
                  </span>
                  <button
                    className="btn btn-default"
                    onClick={(event) => {
                      increaseItemQuantitybyOne(event, x);
                    }}
                  >
                    +
                  </button>
                </span>
              </li>
            ) : null;
          })}
      </ul>
    </div>
  );
};

export default Inventory;
