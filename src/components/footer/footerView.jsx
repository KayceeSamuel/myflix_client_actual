import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import instagram from '../img/instagram_icon.svg';
import twitter from '../img/twitter_icon.svg';
import linkedIn from '../img/linkedin_icon.svg';
import './footerdesign.scss';

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Contact us</h5>
          </MDBCol>
          <MDBCol md="6">
            <img className="imgIcons" src={instagram} alt="instagram" />
            <img className="imgIcons" src={twitter} alt="twitter" />
            <img className="imgIcons" src={linkedIn} alt="LinkedIn" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="/#"> Taurus Black </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;