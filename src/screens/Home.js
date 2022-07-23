import React from "react";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Contents = (props) => {
  const list = [];

  for (let i = 0; i < props.NFTProjects.length; i++) {
    let t = props.NFTProjects[i];
    list.push(
      <div key={t.id} className="TopNFT-contents__row">
        <div className="TopNFT-contents__row-content">
          <span>{t.ranking}</span>
        </div>
        <div className="TopNFT-contents__row-content">
          <img src={t.img} alt="topNFT"></img>
          <span>{t.name}</span>
        </div>
        <div className="TopNFT-contents__row-content">
          <span>{t.floorPrice}</span>
        </div>
        <div className="TopNFT-contents__row-content">
          <span>{t.volume}</span>
        </div>
      </div>
    );
  }
  return <>{list}</>;
};

const TopNFT = () => {
  const [NFTProjects, setNFTProjects] = useState([
    {
      ranking: 1,
      name: "Meta Kongz",
      img: "https://lh3.googleusercontent.com/AX_uuKN-OFhtHXtzw5PJ3K-bGW5tg2svacBEv8xO_ii3UCEo6UTjqec4MiXFGP3gsxPD-p-W0d315pEvIOxG3pKNWfT3G8KvAgIl=s168",
      floorPrice: 900,
      volume: 31000,
    },
    {
      ranking: 2,
      name: "SUN-MIYA",
      img: "https://lh3.googleusercontent.com/UEltltZRWTPLVS05D6KYdo18nEZ7Ba4n8rj_OlDh8mnM3_oWassvQ0VDCqCMHHMDe2MruYUVOHhu5MGBRk40Sg09C-M8z3IIZPD8=s168",
      floorPrice: 800,
      volume: 2000,
    },
    {
      ranking: 3,
      name: "UNI-HUB",
      img: "https://gateway.pinata.cloud/ipfs/QmQrawZQ5Ld5xEaABCUUSDuv1rZVih3RtY4iqy1YgRpML7",
      floorPrice: 700,
      volume: 1000,
    },
  ]);

  return (
    <div className="TopNFT-wrapper">
      <div className="TopNFT-header">
        <div className="TopNFT-header__items">
          <span>#</span>
        </div>
        <div className="TopNFT-header__items">
          <span>name</span>
        </div>
        <div className="TopNFT-header__items">
          <span>floor price</span>
        </div>
        <div className="TopNFT-header__items">
          <span>volume</span>
        </div>
      </div>
      <div className="TopNFT-contents">
        <Contents NFTProjects={NFTProjects}></Contents>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="home-wrapper__header"></div>
      <Tabs defaultActiveKey="topNFT" id="homeTap" className="mb-3">
        <Tab eventKey="topNFT" title="Top NFT">
          <TopNFT></TopNFT>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          {/* <TapContent></TapContent> */}
        </Tab>
        <Tab eventKey="contact" title="Contact">
          {/* <TapContent></TapContent> */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Home;
