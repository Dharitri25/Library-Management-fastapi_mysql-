/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./userHome.css";
import "../admin/login.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { checkToken } from "../utils/commonFunctionalities";
import BookDetails from "../utils/BookDetails";

function IssueBook() {
  const navigate = useNavigate();
  const api = "http://127.0.0.1:8000";

  const [userId, setUserId] = useState(0);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [openUserRegister, setOpenUserRegister] = useState(false);
  const [openIssueBook, setOpenIssueBook] = useState("");
  const [issueDetails, setIssueDetails] = useState({
    title: "",
    author: "",
    publisher: "",
  });

  const getBooksToShow = async () => {
    if (issueDetails.title !== "") {
      if (
        issueDetails.title !== "" &&
        issueDetails.author === "" &&
        issueDetails.publisher === ""
      ) {
        try {
          await axios
            .get(`${api}/bookSearch/get_book_by_title=${issueDetails.title}`)
            .then((res) => {
              res.data && setSearchedBooks(res.data);
            });
        } catch (err) {
          NotificationManager.error("Error in getting searched books!");
        }
      } else if (
        issueDetails.title !== "" &&
        issueDetails.author !== "" &&
        issueDetails.publisher === ""
      ) {
        try {
          await axios
            .get(
              `${api}/bookSearch/get_book_by_title_and_author/${issueDetails.title}/${issueDetails.author}`
            )
            .then((res) => {
              res.data && setSearchedBooks(res.data);
            });
        } catch (err) {
          NotificationManager.error("Error in getting searched books!");
        }
      } else if (
        issueDetails.title !== "" &&
        issueDetails.author === "" &&
        issueDetails.publisher !== ""
      ) {
        try {
          await axios
            .get(
              `${api}/bookSearch/get_book_by_title_and_publisher/${issueDetails?.title}/${issueDetails?.publisher}`
            )
            .then((res) => {
              res.data && setSearchedBooks(res.data);
            });
        } catch (err) {
          NotificationManager.error("Error in getting searched books!");
        }
      } else if (!Object.values(issueDetails).includes("")) {
        try {
          await axios
            .get(
              `${api}/bookSearch/get_book_by_title_author_publisher/${issueDetails?.title}/${issueDetails?.author}/${issueDetails?.publisher}`
            )
            .then((res) => {
              res.data && setSearchedBooks(res.data);
            });
        } catch (err) {
          NotificationManager.error("Error in getting searched books!");
        }
      }
    }
  };

  const checkNewUser = async () => {
    if (issueDetails.username !== "") {
      try {
        await axios
          .get(`${api}/users/check_user_in_db=${issueDetails.username}`)
          .then((res) => {
            res?.data && setUserId(res.data);
          });
      } catch (err) {
        NotificationManager.error(err);
      }
    }
  };

  const handleIssueBook = async () => {
    let isToken = await checkToken();
    if (issueDetails.username !== "" && isToken) {
      if (userId === 0) {
      }
    }
  };

  const handleClearForm = () => {
    const clearIssueDetails = {
      title: "",
      author: "",
      publisher: "",
    };

    setIssueDetails(clearIssueDetails);
    setSearchedBooks([]);
  };

  useEffect(() => {
    if (issueDetails.username !== "") {
      checkNewUser();
    }
  }, [issueDetails?.username]);

  useEffect(() => {
    getBooksToShow();
  }, [issueDetails]);

  return (
    <div>
      <NotificationContainer />
      <div className="issue-book-container">
        <h3>Enter Details</h3>
        <div className="book-issue-form">
          <form>
            <div>
              <input
                type="text"
                placeholder="Book Title"
                className="input-1"
                value={issueDetails.title}
                onChange={(e) =>
                  setIssueDetails({ ...issueDetails, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Author"
                className="input-1"
                value={issueDetails.author}
                onChange={(e) =>
                  setIssueDetails({ ...issueDetails, author: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Publisher"
                className="input-1"
                value={issueDetails.publisher}
                onChange={(e) =>
                  setIssueDetails({
                    ...issueDetails,
                    publisher: e.target.value,
                  })
                }
              />
              <div className="issue-bbok-button-div">
                <input
                  type="button"
                  value="clear form"
                  disabled={issueDetails?.title === ""}
                  onClick={() => handleClearForm()}
                />
                <input
                  type="button"
                  value="Back to Home"
                  onClick={() => navigate("/user-home")}
                />
              </div>
            </div>
          </form>
        </div>
        {/* <div className="sub-content">
          <div className="s-part">
            New to libray?
            <span>Register</span>
          </div>
        </div> */}
      </div>
      <div className="books-table">
        <div className="table-wrapper">
          <h3>Book Table</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Book Id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>category</th>
                <th>copies</th>
              </tr>
            </thead>
            <tbody>
              {searchedBooks?.length > 0 &&
                searchedBooks.map((book) => {
                  return (
                    <tr
                      key={book?.id}
                      onClick={() => setOpenIssueBook(book?.id)}
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      <td>{book?.id}</td>
                      <td>{book?.title}</td>
                      <td>{book?.author}</td>
                      <td>{book?.publisher}</td>
                      <td>{book?.category}</td>
                      <td>{book?.copies}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {searchedBooks?.length === 0 && <h4>No books found!</h4>}
          {!searchedBooks && <h4>Enter details to see book availability</h4>}
        </div>
      </div>
      {openIssueBook && <BookDetails book={openIssueBook} />}
    </div>
  );
}

export default IssueBook;
