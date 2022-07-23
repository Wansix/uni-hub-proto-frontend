import React from "react";
import { useState, useEffect } from "react";
import * as kaikasApi from "../api/kaikasApi";
import * as unihubNFTApi from "../api/unihubNFTApi.js";
import { isMobile } from "react-device-detect";
import { defaultCatUrl } from "../img.js";

const DEFAULT_ADDRESS = "0x00";

export const Profile = () => {
  const [myViewAddress, setMyViewAddress] = useState(DEFAULT_ADDRESS);

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
    const account = await kaikasApi.connectKaikasWallet();
    if (account) {
      const frontAccount = account.substr(0, 4);
      const backAccount = account.substr(-4);
      const viewAccount = frontAccount + "..." + backAccount;
      setMyViewAddress(viewAccount);
    }
  };

  return (
    <div className="profile">
      <div className="wallet-connect">
        <div>
          <button onClick={connectWallet}>connect</button>
          <button onClick={test}>test</button>
        </div>

        <span>{myViewAddress}</span>
      </div>
      <div className="profile__profile">
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
