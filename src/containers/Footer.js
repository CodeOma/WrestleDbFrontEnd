import React from "react";
import "../assets/footer.css";
import { Grid } from "@material-ui/core";
const Footer = () => {
  return (
    <footer style={{ background: "white" }}>
      <Grid className='container'>
        <Grid className='row'>
          <Grid xs={4}>
            <Grid className='footer-text__title'>Wrestling Database</Grid>
            <Grid className='footer-text__body'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do
              eiusmod tempor incididunt ut labore.
            </Grid>
          </Grid>
          <Grid xs={4}>
            <Grid className='footer-text__title'>Quick links</Grid>
            <ul className='footer-list'>
              <li>
                <a href='#home'>About</a>
              </li>
              <li>
                <a href='#features'>Features</a>
              </li>

              <li>
                <a href='#download'>Statistics</a>
              </li>
            </ul>
          </Grid>
          <Grid xs={4}>
            <Grid className='footer-text__title'>Something</Grid>
            <Grid className='footer-text__body'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do
            </Grid>
            <Grid className='footer-input'>
              <input type='text' name='email' placeholder='Email id' />
              <Grid className='footer-input__icon'>
                <ion-icon name='paper-plane-outline' />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className='copyright'>Write something here</Grid>
      </Grid>
    </footer>
  );
};

export default Footer;

// export default React.memo(TheFooter);
