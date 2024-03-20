import React, { useState } from "react";

function PdfModal({ pdfUrl, onHide }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div
      className="modal"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div
            className="pdf-view-header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              padding: "20px",
            }}
          >
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body">
            <iframe
              src={pdfUrl}
              style={{ width: "100%", height: "600px", border: "none" }}
            ></iframe>
          </div>
          {/* <div className="modal-footer">
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default PdfModal;
