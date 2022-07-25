import React from "react";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { TopNFTProjectLists } from "../constansts/topNFTlists.js";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "../component/arrows.jsx";

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

const CardContent = ({ ranking, name, img, floorPrice, link }) => {
  return (
    <div key={ranking} className="card-content">
      <a href={link}>
        <div className="card-content__top">
          <img src={img} alt="cardImg"></img>
        </div>

        <div className="card-content__bottom">
          <div className="card-content__bottom-projectName">
            <span>
              {ranking}.{name}
            </span>
          </div>

          <div className="card-content__bottom-price-wrapper">
            <span>floor price</span>
            <div className="card-content__bottom-price-wrapper__price">
              <img src="https://static.opensea.io/tokens/KLAY.png"></img>
              <span>{floorPrice} klay</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const TopNFTList = () => {
  const [topNFTProjectList, setTopNFTProjectList] =
    useState(TopNFTProjectLists);

  return (
    <>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {topNFTProjectList.map(({ ranking, name, img, floorPrice, link }) => (
          <CardContent
            key={ranking}
            itemId={ranking}
            ranking={ranking}
            name={name}
            img={img}
            floorPrice={floorPrice}
            link={link}
          ></CardContent>
        ))}
      </ScrollMenu>
    </>
  );
};

const RankingBoard = () => {
  return (
    <div className="rankingBoard">
      <div className="rankingBoard__header">Top NFT</div>
      <Tabs
        defaultActiveKey="topNFT"
        id="homeTap"
        className="mb-3 rankingBoard__header-tabs"
        variant="pills"
      >
        <Tab eventKey="topNFT" title="Top NFT">
          <TopNFTList></TopNFTList>
        </Tab>
        <Tab eventKey="ART" title="ART"></Tab>
        <Tab eventKey="P2E" title="P2E"></Tab>
        <Tab eventKey="Collectibles" title="Collectibles"></Tab>
      </Tabs>
    </div>
  );
};

const Home = () => {
  console.log("current width", window.innerWidth);
  return (
    <div className="home-wrapper">
      <div className="home-wrapper__header">
        <div className="home-wrapper__header-ad">
          <img src="img/mainAd.png"></img>
        </div>
      </div>

      <RankingBoard></RankingBoard>
    </div>
  );
};

export default Home;
