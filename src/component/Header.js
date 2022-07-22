import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  return (
    <div className="header">
      <div className="header__home">
        <a href="/">
          <img src="img/defaultCat.png"></img>
          <h1>Uni-hub</h1>
        </a>
      </div>
      <div className="header__menu">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/community">커뮤니티</Nav.Link>
        <Nav.Link href="/nftInfo">NFT정보</Nav.Link>
        <Nav.Link href="/mintInfo">mintComing</Nav.Link>
        <Nav.Link href="/mint">Mint</Nav.Link>
        <Nav.Link href="/mymenu">myMenu</Nav.Link>
      </div>
    </div>
  );
};

export default Header;
