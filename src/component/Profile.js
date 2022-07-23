import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import * as kaikasApi from "../api/kaikasApi";
import * as unihubNFTApi from "../api/unihubNFTApi.js";
import { isMobile } from "react-device-detect";
import { defaultCatUrl } from "../img.js";

const DEFAULT_ADDRESS = "0x00";

export const Profile = () => {
  // const [myViewAddress, setMyViewAddress] = useState(DEFAULT_ADDRESS);
  const [myWallet, setMyWallet] = useState("");
  const [walletConnectState, setWalletConnectState] = useState("false");
  const [walletConnect, setWalletConnect] = useState("로그인");
  const [userInfo, setUserInfo] = useState({
    address: "",
    name: "",
    profileNFTid: 0,
    profileImgUrl: defaultCatUrl,
    seed: 0,
    claimHerb: 0,
    profile_registered: false,
  });

  const checkChangedAccount = () => {
    if (isMobile) return;
    console.log("changedAccount");
    const address = localStorage.getItem("userADDRESS");
    if (window.klaytn.selectedAddress !== address) {
      localStorage.clear();
      kaikasApi.autoConnectWallet(connectWallet);
      unihubNFTApi.getUserInfoFromAccount(setUserInfo);
      window.location.reload();
    }
    // localStorage.clear();
  };

  useEffect(() => {
    if (isMobile) return;
    // console.log("useEffect");
    const address = localStorage.getItem("userADDRESS");
    kaikasApi.autoConnectWallet(connectWallet).then(() => {
      if (window.klaytn.selectedAddress !== address) {
        localStorage.clear();
      }
      unihubNFTApi.getUserInfo(setUserInfo);
      setWalletConnectState(true);
    });

    kaikasApi.changedAccount(checkChangedAccount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const test = async () => {
    if (isMobile) return;
    await kaikasApi.test();
    unihubNFTApi.test();
  };

  const connectWallet = async () => {
    if (isMobile) return;

    // console.log("walletConnectState", walletConnectState);
    // if (walletConnectState === true) {
    //   setMyWallet("");
    //   setWalletConnect("로그인");
    // }
    const account = await kaikasApi.connectKaikasWallet();
    if (account) {
      const frontAccount = account.substr(0, 4);
      const backAccount = account.substr(-4);
      const viewAccount = frontAccount + "..." + backAccount;

      setWalletConnect(viewAccount);
      setMyWallet("내지갑");
      setWalletConnectState(true);

      var target = document.getElementsByClassName("wallet-connect-button");
      target[0].style.justifyContent = "space-between";
      // setMyViewAddress(viewAccount);
    }
  };

  return (
    <div className="profile">
      <div className="wallet-connect-wrapper">
        <div className="wallet-connect">
          <Button
            className="wallet-connect-button"
            variant="success"
            onClick={connectWallet}
          >
            <span>{myWallet}</span>
            <span>{walletConnect}</span>
          </Button>
          {/* <button onClick={test}>test</button> */}
        </div>
      </div>
      <div className="profile__profile">
        <a href="/mymenu">profile</a>
        <img src={userInfo.profileImgUrl} alt="profileImg"></img>
        <div className="profile__Info">
          <span>닉네임 : {userInfo.name}</span>
          <span>씨앗 : {userInfo.seed}</span>
          <span>허브 : {userInfo.claimHerb}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
