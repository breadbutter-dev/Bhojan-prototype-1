import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ToBuy.css";
import { useDispatch } from "react-redux";
import { updateItem } from "../../services/item.service";
import { itemAction } from "../../store/items";

const ToBuy = (props) => {
  const dispatch = useDispatch();

  const addToInventory = (item) => {
    const modifiedItemObject =
      item.quantity === 0
        ? { ...item, listType: "inInventory", quantity: 1 }
        : { ...item, listType: "inInventory" };
    updateItem(modifiedItemObject)
      .then((resp) => {
        dispatch(itemAction.updateItem(modifiedItemObject));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addToArchive = (item) => {
    const modifiedItemObject = { ...item, listType: "archived" };
    updateItem(modifiedItemObject)
      .then((resp) => {
        dispatch(itemAction.updateItem(modifiedItemObject));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="col-lg-4 col-md-4">
      <div className="title">
        <h3>To buy</h3>
      </div>
      <ul className="list-group" style={{ margin: "10px" }}>
        {props.suggestedItems.length > 0 &&
          props.items.map((x, index) => {
            return x.listType === "toBuy" ? (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={index}
              >
                <span>
                  {props.selectItems && (
                    <span style={{ padding: "10px" }}>
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
                <br />

                <span>
                  {/* <span className="badge badge-primary badge-pill">
                    {x.quantity}
                  </span> */}
                  <button
                    className="btn btn-outline-info"
                    style={{ marginLeft: "10px" }}
                    onClick={(event) => {
                      addToInventory(x);
                    }}
                  >
                    &#10004;
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    style={{ marginLeft: "10px" }}
                    onClick={(event) => {
                      addToArchive(x);
                    }}
                  >
                    &#x274C;
                  </button>
                </span>
              </li>
            ) : null;
          })}
      </ul>
      <ul className="list-group" style={{ margin: "10px" }}>
        {props.items.length > 0 &&
          props.items.map((x, index) => {
            return x.listType === "toBuy" ? (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={index}
              >
                <span>
                  {props.selectItems && (
                    <span style={{ padding: "10px" }}>
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
                <br />

                <span>
                  {/* <span className="badge badge-primary badge-pill">
                    {x.quantity}
                  </span> */}
                  <button
                    className="btn btn-outline-info"
                    style={{ marginLeft: "10px" }}
                    onClick={(event) => {
                      addToInventory(x);
                    }}
                  >
                    &#10004;
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    style={{ marginLeft: "10px" }}
                    onClick={(event) => {
                      addToArchive(x);
                    }}
                  >
                    &#x274C;
                  </button>
                </span>
              </li>
            ) : null;
          })}
      </ul>
    </div>
  );
};

export default ToBuy;
