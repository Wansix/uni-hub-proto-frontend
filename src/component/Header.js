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
          <h1>Uni-hub</h1>
        </a>
      </div>
      <div className="header__menu">
        <Nav.Link href="/nftInfo">민팅완료</Nav.Link>
        <Nav.Link href="/mintInfo">민팅예정</Nav.Link>
        <Nav.Link href="/community">게시판</Nav.Link>
        <Nav.Link href="/news">뉴스</Nav.Link>
        <Nav.Link href="/notice">공지사항</Nav.Link>
        <Nav.Link href="/mint">Mint</Nav.Link>
      </div>
    </div>
  );
};

export default Header;
