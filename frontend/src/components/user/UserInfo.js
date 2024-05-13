import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  const navigate = useNavigate();
  const [openUserModal, setOpenUserModal] = useState(true);
  const [username, setUsername] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  const handleClose = () => {
    setOpenUserModal(false);
  };

  return (
    // <div
    //   style={{
    //     textAlign: "center",
    //     display: "ruby-text",
    //     margin: "12% 20%",
    //   }}
    // >
    //   <div className="user-issue">
    //     <input
    //       type="text"
    //       placeholder="User Name"
    //       className="input-1"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       required
    //     />
    //     <div className="issue-bbok-button-div">
    //       <input
    //         type="button"
    //         value="Issue"
    //         disabled={username === ""}
    //         // onClick={() => handleIssueBook()}
    //       />
    //       <input
    //         type="button"
    //         value="view info"
    //         onClick={() => navigate("/user-books")}
    //       />
    //     </div>
    //   </div>
    // </div>
    <>
      <Modal
        open={openUserModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="black"
          >
            User Info
          </Typography>
          <input
            type="text"
            placeholder="User Name"
            className="input-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="button"
            value="view info"
            onClick={() => navigate("/user-books")}
          />
        </Box>
      </Modal>
    </>
  );
}

export default UserInfo;
