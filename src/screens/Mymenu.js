import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import * as unihubNFTApi from "../api/unihubNFTApi.js";
import { defaultCatUrl } from "../constansts/img.js";
axios.defaults.withCredentials = true;

export const Mymenu = () => {
  const [userBalance, setUserBalance] = useState(0);
  const [NFTList, setNFTList] = useState([]);
  const [userInfo, setUserInfo] = useState({
    address: "",
    name: "",
    profileNFTid: 0,
    profileImgUrl: defaultCatUrl,
    seed: 0,
    claimHerb: 0,
    profile_registered: false,
  });

  const getUserInfo = async (setUserInfo) => {
    return await unihubNFTApi.getUserInfo(setUserInfo);
  };

  const getNFTList = () => {
    const address = unihubNFTApi.getCurrentAccount();
    console.log("NFTList address", address);

    if (address) {
      console.log("connect!");
      unihubNFTApi.getBalanceOf(address).then(async (balance) => {
        setUserBalance(balance);
        console.log("user Balance", balance);
        const list = [];
        const nftList = [];
        for (let i = 0; i < balance; i++) {
          await unihubNFTApi.tokenOfOwnerByIndex(address, i).then((tokenId) => {
            // console.log("tokenId:", i, tokenId);
            if (nftList[i]) {
              console.log("중복");
              return;
            } else {
            }

            nftList[i] = Number(tokenId);
          });
        }

        // console.log(nftList);

        list.push(
          <div key={0} className="NFTList__item">
            <label>
              <input
                type="radio"
                name="tokenId"
                value={0}
                defaultChecked
              ></input>
              <img src={defaultCatUrl} alt="Default"></img>
            </label>
          </div>
        );

        let selectedTokenId;
        const profileRegistered = localStorage.getItem("userProfileRegistered");

        console.log("userInfo.profileNFTid", userInfo.profileNFTid);
        if (profileRegistered) {
          selectedTokenId = localStorage.getItem("userNFTid");
          console.log("select", selectedTokenId);
        }

        for (let index = 0; index < nftList.length; index++) {
          await unihubNFTApi.getTokenInfoJson(nftList[index]).then((data) => {
            if (Number(selectedTokenId) === Number(nftList[index])) {
              list.push(
                <div key={index + 1} className="NFTList__item">
                  <label>
                    <input
                      type="radio"
                      name="tokenId"
                      value={nftList[index]}
                      defaultChecked
                    ></input>
                    <img src={data.image} alt={nftList[index]}></img>
                  </label>
                </div>
              );
            } else {
              list.push(
                <div key={index + 1} className="NFTList__item">
                  <label>
                    <input
                      type="radio"
                      name="tokenId"
                      value={nftList[index]}
                    ></input>
                    <img src={data.image} alt={nftList[index]}></img>
                  </label>
                </div>
              );
            }
          });
        }

        // console.log("list", nftList);
        setNFTList(list);
      });
    }
  };

  useEffect(() => {
    getUserInfo(setUserInfo);
    getNFTList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content = null;
  if (userInfo.profile_registered) {
    // Update
    content = (
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const nickName = event.target.nickName.value;
          const profileId = event.target.tokenId.value;

          console.log("프로필 수정", nickName, profileId);

          if (Number(profileId) === 0) {
            let tempUserInfo = userInfo;
            tempUserInfo["name"] = nickName;
            tempUserInfo["profileNFTid"] = profileId;

            tempUserInfo["profileImgUrl"] = defaultCatUrl;

            console.log("temp", tempUserInfo);
            const response = await unihubNFTApi.updateUserInfo(tempUserInfo);
            if (response) {
              localStorage.clear();
              window.location.href = "/mymenu";
              window.location.reload();
            }
          } else {
            unihubNFTApi.getTokenInfoJson(profileId).then(async (data) => {
              let tempUserInfo = userInfo;
              tempUserInfo["name"] = nickName;
              tempUserInfo["profileNFTid"] = profileId;

              tempUserInfo["profileImgUrl"] = data.image;

              console.log("temp", tempUserInfo);
              const response = await unihubNFTApi.updateUserInfo(tempUserInfo);
              if (response) {
                localStorage.clear();
                window.location.href = "/mymenu";
                window.location.reload();
              }
            });
          }
        }}
      >
        <div className="myMenu-registerForm__item">{NFTList}</div>
        <div className="myMenu-registerForm__item">
          <input type="text" name="nickName" defaultValue={userInfo.name} />
        </div>
        <input type="submit" value="수정"></input>
      </form>
    );
  } else {
    // Register
    content = (
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const nickName = event.target.nickName.value;
          const profileId = event.target.tokenId.value;

          console.log("등록", nickName, profileId);

          const response = await unihubNFTApi.registerUserInfo(
            nickName,
            profileId
          );
          if (response) {
            window.location.href = "/mymenu";
            window.location.reload();
          }
        }}
      >
        <div className="myMenu-registerForm__item">{NFTList}</div>
        <div className="myMenu-registerForm__item">
          <input type="text" name="nickName" placeholder="닉네임" required />
        </div>

        <input type="submit" value="등록"></input>
      </form>
    );
  }

  return (
    <div className="myMenu">
      <div className="myMenu-registerForm">
        <div className="myMenu-registerForm__header">
          <div>My NFT </div>
          <div>NFT 개수 {userBalance}</div>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Mymenu;
