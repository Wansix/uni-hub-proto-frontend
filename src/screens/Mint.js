import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";

import * as kaikasApi from "../api/kaikasApi";
import * as unihubNFTApi from "../api/unihubNFTApi.js";

export const Mint = () => {
  const [imgUrl, setImgUrl] = useState("img/randomNFT.png");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectAttributes, setProjectAttributes] = useState({
    background: "",
    mane: "",
    face: "",
    beard: "",
    glasses: "",
  });

  const mintNFT = async () => {
    console.log("mintNFT!!");

    const address = kaikasApi.getCurrentAccount();
    if (address === 0) {
      alert("지갑을 연결 해주세요.");
      return;
    }

    unihubNFTApi.mintNFT().then(async () => {
      await unihubNFTApi.getLastNFTid(address).then((mintId) => {
        console.log("mintingId 내부:", mintId);
        unihubNFTApi.getProfileImageFromContract(setImgUrl, mintId);
        unihubNFTApi.getNFTInfo(
          setProjectName,
          setProjectDescription,
          setProjectAttributes,
          mintId
        );
      });
    });
  };

  return (
    <div className="mint-wrapper">
      <div className="mint-left-container">
        <img src={imgUrl} alt="mintImg"></img>
      </div>
      <div className="mint-right-container">
        <div className="mint-price">
          <span>Price : 2 Klay</span>
        </div>
        <Button variant="success" onClick={mintNFT}>
          Minting
        </Button>
        <div className="mint-info">
          <div className="mint-info__item">
            <span>Name</span>
            <span>{projectName}</span>
          </div>
          <div className="mint-info__item">
            <span>Description</span>
            <span>{projectDescription}</span>
          </div>
          <div className="mint-info__item">
            <span>Attributes</span>
            <span></span>
          </div>
          <div className="mint-info__item">
            <span>Background</span>
            <span>{projectAttributes.background}</span>
          </div>
          <div className="mint-info__item">
            <span>Mane</span>
            <span>{projectAttributes.mane}</span>
          </div>
          <div className="mint-info__item">
            <span>Face</span>
            <span>{projectAttributes.face}</span>
          </div>
          <div className="mint-info__item">
            <span>Beard</span>
            <span>{projectAttributes.beard}</span>
          </div>
          <div className="mint-info__item">
            <span>Glasses</span>
            <span>{projectAttributes.glasses}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
