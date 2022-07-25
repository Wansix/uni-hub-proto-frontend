import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

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

    const nodes = parentNode.querySelectorAll(".vote-display");
    console.log("dssd", nodes[0]);
    childNodes[0].style.opacity = 0.9;
    childNodes[1].style.opacity = 0.9;
    nodes[0].style.visibility = "visible";
    nodes[1].style.visibility = "visible";
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
                <div className="card-content__bottom-mintingInfo-vote__div vote-display">
                  <span>{t.voteLike}</span>
                </div>
              </div>
              <div
                className="card-content__bottom-mintingInfo-vote"
                onClick={clickVote}
              >
                <div className="card-content__bottom-mintingInfo-vote__div">
                  <span>
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </span>
                </div>
                <div className="card-content__bottom-mintingInfo-vote__div vote-display">
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
  const [NFTProjectList, setTopNFTProjectList] = useState([
    {
      id: 1,
      mintingDate: "22.08.08",
      name: "META KONGZ",
      img: "https://img.seadn.io/files/0968706385307e193695e2655f5b3689.png?auto=format&fit=max&w=384",
      voteLike: 1024,
      voteUnLike: 2,
      link: "https://themetakongz.com/kr.html",
    },
    {
      id: 2,
      mintingDate: "22.08.08",
      name: "META KONGZ",
      img: "https://img.seadn.io/files/0968706385307e193695e2655f5b3689.png?auto=format&fit=max&w=384",
      voteLike: 523,
      voteUnLike: 3,
      link: "https://themetakongz.com/kr.html",
    },
    {
      id: 3,
      mintingDate: "22.08.08",
      name: "META KONGZ",
      img: "https://img.seadn.io/files/0968706385307e193695e2655f5b3689.png?auto=format&fit=max&w=384",
      voteLike: 490,
      voteUnLike: 6,
      link: "https://themetakongz.com/kr.html",
    },
    {
      id: 4,
      mintingDate: "22.08.08",
      name: "META KONGZ",
      img: "https://img.seadn.io/files/0968706385307e193695e2655f5b3689.png?auto=format&fit=max&w=384",
      voteLike: 33,
      voteUnLike: 6,
      link: "https://themetakongz.com/kr.html",
    },
    {
      id: 5,
      mintingDate: "22.08.08",
      name: "META KONGZ",
      img: "https://img.seadn.io/files/0968706385307e193695e2655f5b3689.png?auto=format&fit=max&w=384",
      voteLike: 45,
      voteUnLike: 5,
      link: "https://themetakongz.com/kr.html",
    },
    {
      id: 6,
      mintingDate: "22.08.08",
      name: "META KONGZ",
      img: "https://img.seadn.io/files/0968706385307e193695e2655f5b3689.png?auto=format&fit=max&w=384",
      voteLike: 666,
      voteUnLike: 2,
      link: "https://themetakongz.com/kr.html",
    },
    {
      id: 7,
      mintingDate: "22.08.08",
      name: "META KONGZ",
      img: "https://img.seadn.io/files/0968706385307e193695e2655f5b3689.png?auto=format&fit=max&w=384",
      voteLike: 333,
      voteUnLike: 22,
      link: "https://themetakongz.com/kr.html",
    },
    {
      id: 8,
      mintingDate: "22.08.08",
      name: "META KONGZ",
      img: "https://img.seadn.io/files/0968706385307e193695e2655f5b3689.png?auto=format&fit=max&w=384",
      voteLike: 2,
      voteUnLike: 1,
      link: "https://themetakongz.com/kr.html",
    },
  ]);
  return (
    <div className="card-contents card-contents-wrap">
      <CardContents cardList={NFTProjectList}></CardContents>
    </div>
  );
};

const MintInfoBoard = () => {
  return (
    <div className="rankingBoard rankingBoard-mingtingVoteBoard">
      <div className="rankingBoard__header">Minting NFT List</div>
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
