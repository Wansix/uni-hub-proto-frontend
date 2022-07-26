import React from "react";
import Nav from "react-bootstrap/Nav";

const Header = () => {
  return (
    <div className="header">
      <div className="header__home">
        <a href="/">
          <img
            src={window.location.origin + "/img/favicon.png"}
            alt="icon"
          ></img>
          <h1>UNI-HUB</h1>
        </a>
      </div>
      <div className="header__menu">
        <Nav.Link href="/mintedProjects">민팅완료</Nav.Link>
        <Nav.Link href="/mintInfo">민팅예정</Nav.Link>
        <Nav.Link href="/info" disabled>
          정보
        </Nav.Link>
        <Nav.Link href="/community">자유</Nav.Link>
        <Nav.Link href="/hot" disabled>
          Hot
        </Nav.Link>
      </div>
      <div className="header__unihubInfo">
        <Nav.Link
          href="https://undefined-388.gitbook.io/unihub/undefined-1/c2e"
          target="_blank"
        >
          <img src={window.location.origin + "/img/docs.png"} alt="link"></img>
        </Nav.Link>
        <Nav.Link href="http://twitter.com/@unihub001" target="_blank">
          <img
            src={window.location.origin + "/img/twitter.png"}
            alt="link"
          ></img>
        </Nav.Link>
        <Nav.Link href="https://discord.gg/Sbaw9D57" target="_blank">
          <img
            src={window.location.origin + "/img/discord.png"}
            alt="link"
          ></img>
        </Nav.Link>
        <Nav.Link href="mailto:support@unihub001@gmail.com" target="_blank">
          <img src={window.location.origin + "/img/email.png"} alt="link"></img>
        </Nav.Link>
      </div>
    </div>
  );
};

export default Header;
