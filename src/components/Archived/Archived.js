import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Archived.css";
import { updateItem } from "./../../services/item.service";
import { itemAction } from "../../store/items";
import { useDispatch } from "react-redux";

const Archived = (props) => {
  const dispatch = useDispatch();
  const moveToBuy = (item) => {
    const modifiedItemObject = { ...item, listType: "toBuy" };
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
        <h3>Archived</h3>
      </div>
      <ul className="list-group" style={{ margin: "10px" }}>
        {props.items.length > 0 &&
          props.items.map((x, index) => {
            // Show item in archived if listType doesn't exis in item or list type is 'archived'
            return !x.listType || x.listType === "archived" ? (
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
                  {/* <span className="badge badge-primary badge-pill">
                    {x.quantity}
                  </span> */}
                  <button
                    className="btn btn-warning"
                    onClick={(event) => {
                      moveToBuy(x);
                    }}
                  >
                    &#x2190; Move to To Buy
                  </button>
                </span>
              </li>
            ) : null;
          })}
      </ul>
    </div>
  );
};

export default Archived;
