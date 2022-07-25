import Caver from "caver-js";
import contractABI from "../abi/mintNFT.json";
import axios from "axios";
import * as kaikasApi from "./kaikasApi";
import { isMobile } from "react-device-detect";
import { defaultCatUrl } from "../constansts/img.js";

import dotenv from "dotenv";
dotenv.config();

axios.defaults.withCredentials = false;

const contractAddress = process.env.REACT_APP_UNIHUB_NFT_CONTRACT;
const unihubServerURL = process.env.REACT_APP_UNIHUB_SERVER_URL;

const USER_NAME = "userName";
const USER_ADDRESS = "userADDRESS";
const USER_IMAGE_URL = "userImgUrl";
const USER_NFT_ID = "userNFTid";
const USER_SEED = "userSeed";
const USER_CLAIM_HERB = "userClaimHerb";
const USER_PROFILE_REGISTERED = "userProfileRegistered";

const headers = {
  withCredentials: false,
};
console.log("hi nft");

// module.exports = {
export const test = () => {
  console.log("nftContract Test!!");
};

export const getCurrentAccount = () => {
  if (isMobile) return;
  const savedAddress = localStorage.getItem(USER_ADDRESS);

  if (savedAddress === null) {
    return kaikasApi.getCurrentAccount();
  } else {
    return savedAddress;
  }
};

export const getUserInfo = async (setUserInfo) => {
  if (isMobile) return;
  try {
    const savedAddress = localStorage.getItem(USER_ADDRESS);
    console.log(savedAddress);

    if (savedAddress === null) {
      console.log("not saved!!");
      return await getUserInfoFromAccount(setUserInfo);
    } else {
      console.log("get saved!!");
      const userInfo = {
        address: localStorage.getItem(USER_ADDRESS),
        name: localStorage.getItem(USER_NAME),
        profileNFTid: localStorage.getItem(USER_NFT_ID),
        profileImgUrl: localStorage.getItem(USER_IMAGE_URL),
        seed: localStorage.getItem(USER_SEED),
        claimHerb: localStorage.getItem(USER_CLAIM_HERB),
        profile_registered: localStorage.getItem(USER_PROFILE_REGISTERED),
      };
      setUserInfo(userInfo);
      return userInfo;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// 지갑 연결시 유저 정보
export const getUserInfoFromAccount = async (setUserInfo) => {
  if (isMobile) return;
  try {
    const url = `${unihubServerURL}/user/getUserInfo`;
    const address = kaikasApi.getCurrentAccount();

    if (address === 0) {
      // alert("지갑을 연결 해주세요. getUserInfoFromAccount");
      return;
    }

    const send_param = { address: address };
    return await axios.post(url, send_param).then(async (res) => {
      if (res.data.list) {
        // console.log(res.data.list);
        localStorage.setItem(USER_NAME, res.data.list.name);
        localStorage.setItem(USER_ADDRESS, res.data.list.address);
        localStorage.setItem(USER_IMAGE_URL, res.data.list.Profile_IMG_url);
        localStorage.setItem(USER_NFT_ID, res.data.list.Profile_NFT_id);
        localStorage.setItem(USER_SEED, res.data.list.seed);
        localStorage.setItem(USER_CLAIM_HERB, res.data.list.claimHerb);
        localStorage.setItem(
          USER_PROFILE_REGISTERED,
          res.data.list.profile_registered
        );

        setUserInfo({
          address: res.data.list.address,
          name: res.data.list.name,
          profileNFTid: res.data.list.Profile_NFT_id,
          profileImgUrl: res.data.list.Profile_IMG_url,
          seed: res.data.list.seed,
          claimHerb: res.data.list.claimHerb,
          profile_registered: res.data.list.profile_registered,
        });

        return res.data.list;
      } else {
        console.log("등록 필요");

        setUserInfo({
          address: "",
          name: "",
          profileNFTid: 0,
          profileImgUrl: defaultCatUrl,
          seed: 0,
          claimHerb: 0,
          profile_registered: false,
        });
        return false;
        // 등록 페이지로
      }
    });
  } catch (err) {
    console.log("에러!", err);
    return 0;
  }
};

export const updateUserInfo = async (userInfo) => {
  if (isMobile) return;
  try {
    const address = kaikasApi.getCurrentAccount();

    if (address === 0) {
      // alert("지갑을 연결 해주세요. updateUserInfo");
      return;
    }

    const url = `${unihubServerURL}/user/updateUserInfo`;
    const send_param = {
      address: address,
      name: userInfo.name,
      profileNFTid: userInfo.profileNFTid,
      profileImgUrl: userInfo.profileImgUrl,
      seed: userInfo.seed,
      claimHerb: userInfo.claimHerb,
      profile_registered: userInfo.profile_registered,
    };

    return await axios.post(url, send_param).then(async (res) => {
      if (res.data.message) {
        alert(res.data.message);
      } else {
        alert("등록실패!");
      }

      localStorage.setItem(USER_NAME, userInfo.name);
      localStorage.setItem(USER_ADDRESS, userInfo.address);

      localStorage.setItem(USER_IMAGE_URL, userInfo.profileImgUrl);
      localStorage.setItem(USER_NFT_ID, userInfo.profileNFTid);
      localStorage.setItem(USER_SEED, userInfo.seed);
      localStorage.setItem(USER_CLAIM_HERB, userInfo.claimHerb);
      localStorage.setItem(
        USER_PROFILE_REGISTERED,
        userInfo.profile_registered
      );

      return true;
    });
  } catch (err) {
    console.log("에러!", err);
    return 0;
  }
};

export const registerUserInfo = async (name, profileNFTid) => {
  if (isMobile) return;
  try {
    const address = kaikasApi.getCurrentAccount();

    if (address === 0) {
      alert("지갑을 연결 해주세요.");
      return;
    }

    if (Number(profileNFTid) === 0) {
      const url = `${unihubServerURL}/user/registerUserInfo`;
      const send_param = {
        address: address,
        name: name,
        profileNFTid: profileNFTid,
        profileImgUrl: defaultCatUrl,
      };

      return await axios.post(url, send_param).then(async (res) => {
        if (res.data.message) {
          alert(res.data.message);
        } else {
          alert("등록실패!");
        }

        localStorage.setItem(USER_NAME, res.data.list.name);
        localStorage.setItem(USER_ADDRESS, res.data.list.address);
        localStorage.setItem(USER_IMAGE_URL, res.data.list.Profile_IMG_url);
        localStorage.setItem(USER_NFT_ID, res.data.list.Profile_NFT_id);
        localStorage.setItem(USER_SEED, res.data.list.seed);
        localStorage.setItem(USER_CLAIM_HERB, res.data.list.claimHerb);
        localStorage.setItem(
          USER_PROFILE_REGISTERED,
          res.data.list.profile_registered
        );
        return true;
      });
    } else {
      return await getProfileImageFromContract(function () {},
      profileNFTid).then(async (imgUrl) => {
        const url = `${unihubServerURL}/user/registerUserInfo`;
        const send_param = {
          address: address,
          name: name,
          profileNFTid: profileNFTid,
          profileImgUrl: imgUrl,
        };

        return await axios.post(url, send_param).then(async (res) => {
          if (res.data.message) {
            alert(res.data.message);
          } else {
            alert("등록실패!");
          }

          localStorage.setItem(USER_NAME, res.data.list.name);
          localStorage.setItem(USER_ADDRESS, res.data.list.address);
          localStorage.setItem(USER_IMAGE_URL, res.data.list.Profile_IMG_url);
          localStorage.setItem(USER_NFT_ID, res.data.list.Profile_NFT_id);
          localStorage.setItem(USER_SEED, res.data.list.seed);
          localStorage.setItem(USER_CLAIM_HERB, res.data.list.claimHerb);
          localStorage.setItem(
            USER_PROFILE_REGISTERED,
            res.data.list.profile_registered
          );
          return true;
        });
      });
    }
  } catch (err) {
    console.log("에러!", err);
    return 0;
  }
};

export const getProfileImg = (setProfileImgUrl) => {
  if (isMobile) return;
  const savedProfileImgUrl = localStorage.getItem(USER_IMAGE_URL);

  if (savedProfileImgUrl === null) {
    getProfileImageFromContract(setProfileImgUrl, 1);
  } else {
    setProfileImgUrl(savedProfileImgUrl);
  }
};

export const getNFTInfo = async (
  setName,
  setDescription,
  setAttributes,
  userProfileNFT_id
) => {
  if (isMobile) return;
  // console.log("mintmint ID Info", userProfileNFT_id);
  return await tokenURI(userProfileNFT_id).then(async (result) => {
    const url = result;

    try {
      return await axios.get(url, headers).then(async (res) => {
        if (res.status === 200) {
          setName(res.data.name);
          setDescription(res.data.description);
          const attributes = {
            Body: res.data.attributes[0]["value"],
            Cup: res.data.attributes[1]["value"],
            Straw: res.data.attributes[2]["value"],
            Water: res.data.attributes[3]["value"],
            Background: res.data.attributes[4]["value"],
            Word: res.data.attributes[5]["value"],
          };
          setAttributes(attributes);
          return attributes;
          // setAttributes();
        } else {
          console.log("실패");
          return 0;
        }
      });
    } catch (err) {
      console.log("에러!", err);

      return 0;
    }
  });
};

export const getProfileImageFromContract = async (
  setProfileImgUrl,
  userProfileNFT_id
) => {
  if (isMobile) return;
  // console.log("mintmint ID IMg", userProfileNFT_id);

  return await tokenURI(userProfileNFT_id).then(async (result) => {
    const url = result;

    try {
      return await axios.get(url, headers).then(async (res) => {
        if (res.status === 200) {
          setProfileImgUrl(res.data.image);
          console.log("mingting image", res.data.image);
          // localStorage.setItem(USER_IMAGE_URL, res.data.image);
          return res.data.image;
        } else {
          console.log("실패");
        }
      });
    } catch (err) {
      console.log("에러!", err);

      return 0;
    }
  });
};

export const getTokenInfoJson = async (tokenId) => {
  if (isMobile) return;
  if (Number(tokenId) === 0) return false;

  return await tokenURI(tokenId).then(async (result) => {
    const url = result;

    try {
      return await axios.get(url, headers).then(async (res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          console.log("실패");
          return false;
        }
      });
    } catch (err) {
      console.log("에러!", err);

      return 0;
    }
  });
};

export const tokenURI = async (NFT_id) => {
  if (isMobile) return;
  const caver = new Caver(window.klaytn);
  const unihubNFTContract = new caver.klay.Contract(
    contractABI,
    contractAddress
  );

  return await unihubNFTContract.methods
    .tokenURI(NFT_id)
    .call()
    .then(async (result) => {
      return result;
    });
};

export const getBalanceOf = async (account) => {
  if (isMobile) return;
  const caver = new Caver(window.klaytn);
  const unihubNFTContract = new caver.klay.Contract(
    contractABI,
    contractAddress
  );
  return await unihubNFTContract.methods.balanceOf(account).call();
};

export const tokenOfOwnerByIndex = async (account, index) => {
  if (isMobile) return;
  const caver = new Caver(window.klaytn);
  const unihubNFTContract = new caver.klay.Contract(
    contractABI,
    contractAddress
  );
  return await unihubNFTContract.methods
    .tokenOfOwnerByIndex(account, index)
    .call();
};

export const totalSupply = async () => {
  if (isMobile) return;
  const caver = new Caver(window.klaytn);
  const unihubNFTContract = new caver.klay.Contract(
    contractABI,
    contractAddress
  );
  return await unihubNFTContract.methods.totalSupply().call();
};

export const getLastNFTid = async (account) => {
  if (isMobile) return;
  return await getBalanceOf(account).then(async (tokenBalance) => {
    return await tokenOfOwnerByIndex(account, tokenBalance - 1);
  });
};

export const mintNFT = async () => {
  if (isMobile) return;
  const caver = new Caver(window.klaytn);

  const unihubNFTContract = new caver.klay.Contract(
    contractABI,
    contractAddress
  );
  const abi = unihubNFTContract.methods.mintNFT().encodeABI();
  const mintPrice = 100; // 단위 : mklay
  return await kaikasApi.executeContract(contractAddress, mintPrice, abi);
};
// };
