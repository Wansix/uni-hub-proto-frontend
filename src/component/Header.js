import React from "react";
import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { defaultCatUrl } from "../img.js";

const Header = () => {
  return (
    <div className="header">
      <div className="header__home">
        <a href="/">
          <img src={defaultCatUrl} alt="cat"></img>
          <h1>UNI-HUB</h1>
        </a>
      </div>
      <div className="header__menu">
        <Nav.Link href="/nftInfo">민팅완료</Nav.Link>
        <Nav.Link href="/mintInfo">민팅예정</Nav.Link>
        <Nav.Link href="/info">정보</Nav.Link>
        <Nav.Link href="/community">자유</Nav.Link>
        <Nav.Link href="/hot">Hot</Nav.Link>
      </div>
    </div>
  );
};

export default Header;
