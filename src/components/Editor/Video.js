import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Grid, Button } from "@material-ui/core";

import TimestampList from "./TimeStampList";

const Video = ({
  isLoading,
  getTime,
  videoTime,
  setVideoTime,
  match,
  setMatchEdit,
  render,
  deleteTimestamp,
  takedowns,
  tags,
}) => {
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=ox6VucsagHo");
  const [search, setSearch] = useState("");
  const [matchData, setMatchData] = useState({});
  const [timestampOpen, setTimestampOpen] = useState(true);
  const player = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();

    setUrl(e.target.value);
  };
  const handleChange = e => {
    setSearch(e.target.value);
  };
  // getTime(player.current.getCurrentTime());
  const setTime = time => {
    player.current.seekTo(time);
  };
  useEffect(() => {
    setMatchData(match);
  }, [match]);

  return (
    <Grid className='' xs={12} justify='center' container>
      <Grid xs={12} sm={8} justify='center' container>
        {isLoading ? (
          "loading"
        ) : (
          <ReactPlayer
            controls='true'
            onProgress={played => {
              getTime(played.playedSeconds);
              console.log(match);
            }}
            ref={player}
            url={match.url}
          />
        )}
      </Grid>

      <Grid xs={12} sm={4} justify='flex-start' container>
        <Button onClick={() => setTimestampOpen(!timestampOpen)}>
          Toggle Scores
        </Button>
        {timestampOpen && (
          <TimestampList
            setTime={setTime}
            match={match}
            setMatchEdit={setMatchEdit}
            deleteTimestamp={deleteTimestamp}
            render={render}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Video;

// const _onReady = e => {
//   // access to player in all event handlers via event.target
//   e.target.pauseVideo();
// };
// const handleSubmit = e => {
//   e.preventDefault();
//   const videoRegex = search.match(
//     /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i
//   );

//   setVideoId(videoRegex[1]);
// };

{
  /* <form
        style={{ width: "100%", padding: 60 }}
        className='py-1'
        onSubmit={handleSubmit}
      >
        <label>Link</label>{" "}
        <input
          value={search}
          onChange={handleChange}
          placeholder='Enter Youtube link'
        ></input>
        <Button type='submit'>Submit</Button>
      </form> */
}
