import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { youtubeVideoId } from "../../helpers/formatting";
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const VideoModal = ({ link, type }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [url, setUrl] = useState("");
  const player = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setUrl(link);
  }, [link]);

  return (
    <div>
      {type === "img" ? (
        <img
          style={{ width: "100%" }}
          src={`https://img.youtube.com/vi/${youtubeVideoId(url)}/0.jpg`}
          onClick={handleOpen}
        ></img>
      ) : (
        <Button type='button' onClick={handleOpen}>
          Video{" "}
        </Button>
      )}

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid className='pb-4' xs={12} justify='center' container>
            {/* <h5>{title}</h5> */}
            <ReactPlayer ref={player} url={url} controls='true' />
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
};

export default VideoModal;
