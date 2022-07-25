import React from "react";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

import * as kaikasApi from "../api/kaikasApi";
import * as unihubNFTApi from "../api/unihubNFTApi.js";

const MAX_SUPPLY = 49;

export const Mint = () => {
  const [isLoading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("img/randomNFT.png");
  const [projectName, setProjectName] = useState("Uni-Cat");
  const [projectDescription, setProjectDescription] =
    useState(`Uni-Hub is a korean NFT community The Uni-cat are unique and
  randomly generated 2D NFT PFP. Not only that, Uni-cat make coins
  by contributing our systems. Just sponge off!!`);
  const [projectAttributes, setProjectAttributes] = useState({
    Body: "",
    Cup: "",
    Straw: "",
    Water: "",
    Background: "",
    Word: "",
  });
  const [remainingSupply, setRemainingSupply] = useState(0);

  const mintNFT = async () => {
    console.log("mintNFT!!");

    const address = kaikasApi.getCurrentAccount();
    if (address === 0) {
      alert("지갑을 연결 해주세요.");
      return;
    }

    setLoading(true);

    unihubNFTApi.mintNFT().then(async () => {
      await unihubNFTApi.getLastNFTid(address).then(async (mintId) => {
        console.log("mintingId 내부:", mintId);
        await unihubNFTApi
          .getProfileImageFromContract(setImgUrl, mintId)
          .then(async () => {
            await unihubNFTApi
              .getNFTInfo(
                setProjectName,
                setProjectDescription,
                setProjectAttributes,
                mintId
              )
              .then(() => {
                setLoading(false);
              });
          });
      });
    });
  };

  useEffect(() => {
    const address = kaikasApi.getCurrentAccount();
    if (address === 0) {
      alert("지갑을 연결 해주세요.");
      return;
    }
    unihubNFTApi.getLastNFTid(address).then(async (mintId) => {
      console.log("mint Id ", mintId);
      const remaining = MAX_SUPPLY - mintId;
      setRemainingSupply(remaining);
    });
  }, []);

  return (
    <div className="mint-wrapper">
      <div className="mint-wrapper-header">
        <h1>Uni-Cat</h1>
        <h3>minting</h3>
      </div>

      <div className="mintingNFTInfo">
        <div className="mintingNFTInfo__left-container">
          <img src={imgUrl} alt="mintImg"></img>
        </div>
        <div className="mintingNFTInfo__right-container">
          <div className="mintingNFTInfo__right-container__info">
            <div className="mintingNFTInfo__right-container__info-name">
              {/* <span>Name </span> */}
              <span>{projectName}</span>
              {/* <span>{projectName}</span> */}
            </div>
            <div className="mintingNFTInfo__right-container__info-description">
              <span>Description</span>
              <p>{projectDescription}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="minting">
        <div className="mintingInfo">
          <div className="mintingRemaining">
            <span>NFT 잔여수량</span>
            <span>{remainingSupply}</span>
          </div>
          <div className="mintingPrice">
            <span>가격</span>
            <div className="mintingPrice-price">
              <span>
                <img src="https://static.opensea.io/tokens/KLAY.png"></img>
              </span>
              <span>250 KLAY</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mintingButton-wrapper">
        <Button
          variant="success"
          disabled={isLoading}
          onClick={!isLoading ? mintNFT : null}
        >
          {isLoading ? "Loading..." : "Minting"}
        </Button>
      </div>

      <div className="mintingAttributes-wrapper">
        <h2>Attributes</h2>
        <div className="mintingAttributes">
          <div className="mintingAttributes__attribute">
            <span>Body</span>
            <span>{projectAttributes.Body}</span>
          </div>
          <div className="mintingAttributes__attribute">
            <span>Cup</span>
            <span>{projectAttributes.Cup}</span>
          </div>
          <div className="mintingAttributes__attribute">
            <span>Straw</span>
            <span>{projectAttributes.Straw}</span>
          </div>
          <div className="mintingAttributes__attribute">
            <span>Water</span>
            <span>{projectAttributes.Water}</span>
          </div>
          <div className="mintingAttributes__attribute">
            <span>Background</span>
            <span>{projectAttributes.Background}</span>
          </div>
          <div className="mintingAttributes__attribute">
            <span>Word</span>
            <span>{projectAttributes.Word}</span>
          </div>
        </div>
      </div>

      {/* <div className="mint-left-container">
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
      </div> */}
    </div>
  );
};

export default Mint;
