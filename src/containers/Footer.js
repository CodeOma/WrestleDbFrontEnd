import React from "react";
import "../assets/footer.css";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer style={{ background: "white", width: "90%", paddingTop: "10" }}>
      <Grid xs={12} className='w-100'>
        <Grid
          xs={12}
          className='w-100'
          container
          direction='row'
          justify='space-evenly'
        >
          <Grid xs={4}>
            <Grid className='footer-text__title'>Wrestling Database</Grid>
            <Grid className='footer-text__body'>Project</Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid className='footer-text__title'>Quick links</Grid>
            <ul className='footer-list'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/techniques'>Database</Link>
              </li>

              <li>
                <Link to='/stats'>Stats</Link>
              </li>
            </ul>
          </Grid>
          <Grid xs={4}>
            <Grid className='footer-text__title'>Help </Grid>
            <Grid className='footer-text__body'>
              If you would like to contact me, please reach out on twitter
              @Wrest224
            </Grid>
            <Grid className='footer-input'>
              <input type='text' name='email' placeholder='Email id' />
              <Grid className='footer-input__icon'>
                <ion-icon name='paper-plane-outline' />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className='copyright'></Grid>
      </Grid>
    </footer>
  );
};

export default Footer;

// export default React.memo(TheFooter);
