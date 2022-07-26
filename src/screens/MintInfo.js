import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { MintingComingList } from "../constansts/mintingComingList.js";

const CardContents = (props) => {
  const list = [];

  const clickVote = (event) => {
    const parentNode = event.currentTarget.parentNode;
    console.log("parent", parentNode);
    parentNode.classList.remove("vote-button-opacity-low");
    // parentNode.style.opacity = 0.9;
    const childNodes = parentNode.childNodes;

    console.log(parentNode.id);
    const id = parentNode.id;
    console.log(props.cardList[id]);
    console.log(parentNode);

    const nodes = parentNode.querySelectorAll(".vote-hidden");
    console.log("nodes", nodes);
    if (nodes.length) {
      nodes[0].classList.remove("vote-hidden");
      nodes[1].classList.remove("vote-hidden");
    }

    console.log("dssd", nodes[0]);

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

          <div className="card-content__bottom-mintingInfo">
            <div className="card-content__bottom-mintingInfo-mingtingDate">
              <span>민팅 예정</span>
              <span>{t.mintingDate}</span>
            </div>
            <div
              className="card-content__bottom-mintingInfo-voteInfo vote-button-opacity-low"
              id={t.id}
            >
              <div
                className="card-content__bottom-mintingInfo-vote "
                onClick={clickVote}
              >
                <div className="card-content__bottom-mintingInfo-vote__div">
                  <span>
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </span>
                </div>
                <div className="card-content__bottom-mintingInfo-vote__div vote-hidden">
                  <span>{t.voteLike}</span>
                </div>
              </div>
              <div
                className="card-content__bottom-mintingInfo-vote "
                onClick={clickVote}
              >
                <div className="card-content__bottom-mintingInfo-vote__div">
                  <span>
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </span>
                </div>
                <div className="card-content__bottom-mintingInfo-vote__div vote-hidden">
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
  const [NFTProjectList, setTopNFTProjectList] = useState(MintingComingList);
  return (
    <div className="card-contents card-contents-wrap">
      <CardContents cardList={NFTProjectList}></CardContents>
    </div>
  );
};

const MintInfoBoard = () => {
  return (
    <div className="rankingBoard rankingBoard-mingtingVoteBoard">
      <div className="rankingBoard__header">Minting coming</div>
      <MintInfoList></MintInfoList>
    </div>
  );
};

export const MintInfo = () => {
  return (
    <div>
      <MintInfoBoard></MintInfoBoard>
    </div>
  );
};

export default MintInfo;
