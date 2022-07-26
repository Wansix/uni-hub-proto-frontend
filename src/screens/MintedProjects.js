import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { TopNFTProjectLists } from "../constansts/topNFTlists.js";

const CardContents = (props) => {
  const list = [];

  const clickVote = (event) => {
    const parentNode = event.currentTarget.parentNode;
    parentNode.style.opacity = 0.9;
    const childNodes = parentNode.childNodes;

    console.log(parentNode.id);
    const id = parentNode.id;
    console.log(props.cardList[id]);
    console.log(parentNode);

    // const nodes = parentNode.querySelectorAll(".vote-display");
    // console.log("dssd", nodes[0]);
    // childNodes[0].style.opacity = 0.9;
    // childNodes[1].style.opacity = 0.9;
    // nodes[0].style.visibility = "visible";
    // nodes[1].style.visibility = "visible";
    console.log("vote!");
  };

  for (let i = 0; i < props.cardList.length; i++) {
    let t = props.cardList[i];
    list.push(
      <div key={i} className="card-content">
        <div className="card-content__top">
          <a href={t.link}>
            <img src={t.img} alt="cardImg"></img>
          </a>
        </div>

        <div className="card-content__bottom">
          <div className="card-content__bottom-projectName">
            <span>{t.name}</span>
          </div>

          <div className="card-content__bottom-price-wrapper">
            <span>floor price</span>
            <div className="card-content__bottom-price-wrapper__price">
              <img src="https://static.opensea.io/tokens/KLAY.png"></img>
              <span>{t.floorPrice} klay</span>
            </div>
          </div>

          <div className="card-content__bottom-mintingInfo">
            <div
              className="card-content__bottom-mintingInfo-voteInfo"
              id={t.id}
            >
              <div
                className="card-content__bottom-mintingInfo-vote"
                onClick={clickVote}
              >
                <div className="card-content__bottom-mintingInfo-vote__div">
                  <span>
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </span>
                </div>
                <div className="card-content__bottom-mintingInfo-vote__div ">
                  <span>{t.voteLike}</span>
                </div>
              </div>
              <div
                className="card-content__bottom-mintingInfo-vote"
                onClick={clickVote}
              >
                <div className="card-content__bottom-mintingInfo-vote__div ">
                  <span>
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </span>
                </div>
                <div className="card-content__bottom-mintingInfo-vote__div ">
                  <span>{t.voteUnLike}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <>{list}</>;
};

const MintInfoList = () => {
  const [NFTProjectList, setTopNFTProjectList] = useState(TopNFTProjectLists);
  return (
    <div className="card-contents card-contents-wrap">
      <CardContents cardList={NFTProjectList}></CardContents>
    </div>
  );
};

const MintInfoBoard = () => {
  return (
    <div className="rankingBoard rankingBoard-mingtingVoteBoard">
      <div className="rankingBoard__header">NFT Projects</div>
      <MintInfoList></MintInfoList>
    </div>
  );
};

export const MintedProjects = () => {
  return (
    <div>
      <MintInfoBoard></MintInfoBoard>
    </div>
  );
};

export default MintedProjects;
