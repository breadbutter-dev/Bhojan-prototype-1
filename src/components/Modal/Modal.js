import React from "react";
import ReactDOM from "react-dom";
const Modal = (prop) => {
  return (
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Create item</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <div class="modal-body">Modal body..</div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success" data-dismiss="modal">
              Create
            </button>
            {/* <button type="button" class="btn btn-outline-danger" data-dismiss="modal">
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
