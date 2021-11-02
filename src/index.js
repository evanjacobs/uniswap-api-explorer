import { Web3ApiClient } from "@web3api/client-js";
const web3client = new Web3ApiClient();
const ensUri = "ens/v2.uniswap.web3api.eth";

const token0 = {
  chainId: "MAINNET",
  address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  currency: {
    decimals: 18,
    symbol: "UNI",
    name: "Uniswap"
  },
};

const token1 = {
  chainId: "MAINNET",
  address: "",
  currency: {
    decimals: 18,
    symbol: "ETH",
    name: "Ether"
  },
};

const token2 = {
  chainId: "MAINNET",
  address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  currency: {
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin"
  }
};

const token3 = {
  chainId: "MAINNET",
  address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
  currency: {
    decimals: 18,
    symbol: "AAVE",
    name: "Aave"
  }
};

const inputAmount = {
  token: token1,
  amount: "1000000000000000000"
}


/////////////////
// fetchPairData
/////////////////

async function fetchPairData(client, inputToken, outputToken) {
  const { data, errors } = await client.query({
    uri: ensUri,
    query: `query {
      fetchPairData(
        token0: $token0
        token1: $token1
      )
    }`,
    variables: {
      token0: inputToken,
      token1: outputToken
    }
  });

  if (errors) {
    throw errors;
  }

  if (!data) {
    throw Error("fetchPairData returned undefined, this should never happen");
  }

  return data.fetchPairData;
}

///////////////////
// pairOutputAmount
///////////////////
async function fetchPairOutputAmount(client, pair, inputAmount) {
  const { data, errors } = await client.query({
    uri: ensUri,
    query: `query{
      pairOutputAmount(
        pair: $pair,
        inputAmount: $inputAmount,
      )
    }`,
    variables: {
      pair: pair,
      inputAmount: inputAmount
    }
  });

  if (errors) {
    throw errors;
  }

  if (!data) {
    throw Error("pairOutputAmount returned undefined, this should never happen");
  }

  return data;
}


let amount = 0;
let pairData = {};
setInterval(async() => {
  pairData = await fetchPairData(web3client, token0, token1);
  console.log("pairData: ", pairData);

  pairData
  amount = await fetchPairOutputAmount(web3client, pairData, inputAmount);
  console.log("amount: ", amount);
}, 15000);
