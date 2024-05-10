import React, { useEffect, useState } from "react";
import "./bookDetails.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

function BookDetails({ book }) {
  const navigate = useNavigate();
  const api = "http://127.0.0.1:8000";
  const [username, setUsername] = useState("");
  const [bookDetails, setBookDetails] = useState({});

  const getBookDetails = () => {
    if (book) {
      try {
        axios.get(`${api}/books/get_book_by_id=${book}`).then((res) => {
          res?.data && setBookDetails(res.data);
        });
      } catch (err) {
        NotificationManager.error(err);
      }
    }
  };

  useEffect(() => {
    const myModal = document.getElementById("myModal");
    const myInput = document.getElementById("myInput");

    if (myModal) {
      myModal.addEventListener("shown.bs.modal", () => {
        myInput.focus();
      });
    }

    return () => {
      if (myModal) {
        myModal.removeEventListener("shown.bs.modal", () => {
          myInput.focus();
        });
      }
    };
  }, []);

  useEffect(() => {
    getBookDetails();
  }, [book]);

  return (
    <div>
      <div class="details-modal-overlay"></div>
      <div class="details-modal">
        <div class="details-modal-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="details-modal-title">
          <h1>Issue Book Here</h1>
        </div>
        <div class="details-modal-content">
          <div>
            <div class="card">
              <div class="card-body">
                <div className="book-title">
                  <AutoStoriesIcon />
                  <h5 class="card-title">{bookDetails?.title}</h5>
                </div>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                  by {bookDetails?.author}
                </h6>
                <p class="card-text">published by: {bookDetails?.publisher}</p>
                <span>total copies available: {bookDetails?.copies}</span>
              </div>
            </div>
          </div>
          <div className="user-issue">
            <input
              type="text"
              placeholder="User Name"
              className="input-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="issue-bbok-button-div">
              <input
                type="button"
                value="clear form"
                disabled={username === ""}
                // onClick={() => handleClearForm()}
              />
              <input
                type="button"
                value="Back"
                onClick={() => navigate("/user/issue-book")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
