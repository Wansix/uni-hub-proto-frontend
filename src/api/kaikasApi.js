import CaverExtKAS from "caver-js-ext-kas";
import Caver from "caver-js";
import { isMobile } from "react-device-detect";
import dotenv from "dotenv";
dotenv.config();

const klaytn = window.klaytn;
const chainIdCypress = process.env.REACT_APP_CHAIN_ID_CYPRESS;
// const chainIdBaobab = process.env.REACT_APP_CHAIN_ID_BAOBAB;

const accessKeyId = process.env.REACT_APP_KAS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_KAS_SECRET_ACCRESS_KEY;
const endpoint = process.env.REACT_APP_ENDPOINT;
// const contractAddress = process.env.REACT_APP_UNIHUB_NFT_CONTRACT;

// module.exports = {
export const test = async () => {
  console.log("test button!!");
};

export const isEnabled = async () => {
  if (isMobile) return;
  return await klaytn._kaikas.isEnabled();
};

export const isUnlocked = async () => {
  if (isMobile) return;
  return await klaytn._kaikas.isUnlocked();
};

export const autoConnectWallet = async (connectWallet) => {
  if (isMobile) return;

  return await isUnlocked().then(async (isUnlocked) => {
    //현재 지갑이 unlock일 때 현재 홈페이지가 지갑에 접근 할 수 있도록 승인 요청
    if (isUnlocked === true) {
      await connectWallet();
    }

    console.log("auto connect!!");
    return;
  });
};

export const getCurrentAccount = () => {
  if (isMobile) return;
  if (klaytn.selectedAddress === undefined) return 0;

  return klaytn.selectedAddress;
};

export const getBlockNumber = (setBlockNumber) => {
  if (isMobile) return;
  const caver = new Caver(endpoint);

  caver.klay.getBlockNumber().then((blockNumber) => {
    if (isMobile) return;
    setBlockNumber(blockNumber);
  });
};

export const getTokenListByOwner = async (address) => {
  if (isMobile) return;
  if (address === undefined) return 0;
  const caverExtKas = new CaverExtKAS(
    chainIdCypress,
    accessKeyId,
    secretAccessKey
  );

  const queryOptions = {
    kind: caverExtKas.kas.tokenHistory.queryOptions.kind.FT,
  };
  try {
    const result = await caverExtKas.kas.tokenHistory.getTokenListByOwner(
      address,
      queryOptions
    );
    return result.items;
  } catch (e) {
    console.log(e);
  }
};

export const transferFrom = async (
  tokenAddress,
  sendAddress,
  receiveAddress,
  amount
) => {
  if (isMobile) return;
  const caver = new Caver(klaytn);
  const tokenInstance = await new caver.klay.KIP7(tokenAddress);
  console.log(tokenInstance);

  try {
    tokenInstance.transferFrom(sendAddress, receiveAddress, amount * 10 ** 8, {
      from: klaytn.selectedAddress,
    });
  } catch (e) {
    console.log("transferForm");
    console.log(e);
  }
};
export const approveToken = (tokenAddress, spenderAddress) => {
  if (isMobile) return;
  const caver = new Caver(klaytn);
  const tokenInstance = new caver.klay.KIP7(tokenAddress);
  tokenInstance.approve(
    spenderAddress,
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    { from: klaytn.selectedAddress }
  );
};
export const connectKaikasWallet = async () => {
  if (isMobile) return;
  try {
    const accounts = await klaytn.enable();
    const account = accounts[0];

    // console.log(accounts);

    return account;
  } catch (e) {
    alert("connect kaikas failed!!");
    console.log("connect kaikas failed!!");
    console.log(e);
    return 0;
  }
};

export const getBalanceKlay = async () => {
  if (isMobile) return;
  if (klaytn.selectedAddress === undefined) return "0";
  const caver = new Caver(klaytn);
  try {
    const balance = await caver.klay.getBalance(klaytn.selectedAddress);
    const klayBalance = caver.utils.fromPeb(balance, "KLAY");
    return klayBalance;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

export const changedAccount = (func) => {
  if (isMobile) return;
  console.log("event!!");
  window.klaytn.on("accountsChanged", func);
};

export const sendTransaction = (_to, _value) => {
  if (isMobile) return;
  const caver = new Caver(klaytn);
  caver.klay
    .sendTransaction({
      type: "VALUE_TRANSFER",
      from: klaytn.selectedAddress,
      to: _to,
      value: caver.utils.toPeb(_value, "KLAY"),
      gas: 8000000,
    })
    .once("transactionHash", (transactionHash) => {
      console.log("txHash", transactionHash);
    })
    .once("receipt", (receipt) => {
      console.log("receipt", receipt);
    })
    .once("error", (error) => {
      console.log("error", error);
    });
};

// myContract.methods.myMethod(123).encodeABI();

export const executeContract = async (_to, _value, abi) => {
  if (isMobile) return;
  const caver = new Caver(klaytn);

  return await caver.klay
    .sendTransaction({
      type: "SMART_CONTRACT_EXECUTION",
      from: klaytn.selectedAddress,
      to: _to,
      data: abi,
      gas: 8000000,
      value: caver.utils.toPeb(_value, "KLAY"),
    })
    .once("transactionHash", (transactionHash) => {
      console.log("txHash", transactionHash);
    })
    .once("receipt", (receipt) => {
      console.log("receipt", receipt);
      return receipt;
    })
    .once("error", (error) => {
      console.log("error", error);
    });
};
// };
