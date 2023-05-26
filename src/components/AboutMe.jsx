import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import dianpic from "../assets/dianpic.jpg";
import gifs from "../assets/itdeveloper.gif";
import LaptopMacIcon from "@mui/icons-material/LaptopMac"; //frontend pic
import StorageIcon from "@mui/icons-material/Storage"; // backend pic
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import "../styles/aboutme.css";

import React, { useState } from "react";

// a7bcdb
//style for Box
const style = {
  color: "white",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "42vw",
  height: "300px",
  // background: "linear-gradient(144deg,#8608b4, #492fed 60%,#bd6fda)",
  background:
    "linear-gradient(135deg, rgba(134,8,180,0.5), rgba(73,47,237,1));",
  backdropFilter: "blur(2px)",
  border: "5px solid #000",
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
};

function AboutMe({ title, desc, appFrontEnd, AppBackEnd }) {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <img src={gifs} className="aboutme_CoderIcon" alt="dian" />
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography id="modal-title" variant="h4" component="h2">
                    {title}
                  </Typography>

                  <div
                    style={{
                      marginTop: "20px",
                      marginBottom: "5px",
                    }}
                  >
                    <i>
                      coded by <b>Dian Pratama</b> Jan 2023
                    </i>
                    <br />
                    <div style={{ display: "flex" }}>
                      <AlternateEmailIcon
                        style={{ marginRight: "5px", color: "darkgray" }}
                      />
                      <span style={{ color: "darkgray" }}>
                        dianpratama2003@yahoo.com
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Avatar
                    src={dianpic}
                    alt="dianP"
                    sx={{ width: 100, height: 100 }}
                  />
                </div>
              </div>

              <hr />
              <br />
              {desc}
              <Typography id="modal-description" sx={{ mt: 2 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LaptopMacIcon style={{ marginRight: "5px" }} />
                  <div style={{ flex: "0.2", margin: "0px" }}>
                    <b>Front-End:</b>
                  </div>
                  <div style={{ flex: "1" }}>{appFrontEnd}</div>
                </div>
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StorageIcon style={{ marginRight: "5px" }} />
                  <div style={{ flex: "0.2", margin: "0px" }}>
                    <b>Back-End:</b>
                  </div>
                  <div style={{ flex: "1" }}>{AppBackEnd}</div>
                </div>
              </Typography>
            </>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AboutMe;
