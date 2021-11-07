import { Web3ApiClient } from "@web3api/client-js";
const web3client = new Web3ApiClient();
const ensUri = "ens/v2.uniswap.web3api.eth";

const tokenList = [
  {
    "chainId": "MAINNET",
    "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "name": "Ether",
    "symbol": "ETH",
  },
  {
    "chainId": "MAINNET",
    "address": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    "name": "Aave",
    "symbol": "AAVE",
  },
  {
    "chainId": "MAINNET",
    "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "name": "Dai Stablecoin",
    "symbol": "DAI",
  },
  {
    "chainId": "MAINNET",
    "name": "Uniswap",
    "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    "symbol": "UNI",
  },
  {
    "chainId": "MAINNET",
    "address": "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
    "name": "yearn finance",
    "symbol": "YFI",
  },
  {
    "chainId": "MAINNET",
    "address": "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
    "name": "Graph Token",
    "symbol": "GRT",
  },
  {
    "chainId": "MAINNET",
    "address": "0x3506424f91fd33084466f402d5d97f05f8e3b4af",
    "name": "chiliZ",
    "symbol": "CHZ",
  }

];


/////////////////////
// TOKEN functions //
/////////////////////
async function fetchTokenData(token) {
  const { data, errors } = await web3client.query({
    uri: ensUri,
    query: `query {
      fetchTokenData(
        chainId: $chainId,
        address: $address,
        symbol: $symbol,
        name: $name
      )
    }`,
    variables: {
      chainId: tokenList[token].chainId,
      address: tokenList[token].address,
      symbol: tokenList[token].symbol,
      name: tokenList[token].name
    }
  });

  if (errors) {
    throw errors;
  }

  if (!data) {
    throw Error("fetchTokenData return undefined");
  }

  console.log('fetchTokenData: ', data);
  return data;
}
window.fetchTokenData = fetchTokenData;

async function fetchTotalSupply(token) {
  const { data, errors } = await web3client.query({
    uri: ensUri,
    query: `query {
      fetchTotalSupply(
        token: $token
      )
    }`,
    variables: {
      token: token
    }
  });

  if (errors) {
    throw errors;
  }

  if (!data) {
    throw Error("fetchTotalSupply return undefined");
  }

  console.log('fetchTotalSupply: ', data);
  return data;
}
window.fetchTotalSupply = fetchTotalSupply;


////////////////////
// PAIR Functions //
////////////////////

async function fetchPairData(inputToken, outputToken) {
  const { data, errors } = await web3client.query({
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

  return data;
}
window.fetchPairData = fetchPairData;

async function fetchPairOutputAmount(pair, inputAmount) {
  const { data, errors } = await web3client.query({
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
window.fetchPairOutputAmount = fetchPairOutputAmount;


/////////////////////
// ROUTE functions //
/////////////////////

async function routePath(pairs, inputToken) {
  const { data, errors } = await web3client.query({
    uri: ensUri,
    query: `query{
      routePath(
        pairs: $pairs,
        inputToken: $inputToken,
      )
    }`,
    variables: {
      pairs: pairs,
      inputToken: inputToken
    }
  });

  if (errors) {
    throw errors;
  }

  if (!data) {
    throw Error("routePath returned undefined, this should never happen");
  }

  return data;
}
window.routePath = routePath;

async function createRoute(pairs, inputToken, outputToken) {
  const { data, errors } = await web3client.query({
    uri: ensUri,
    query: `query{
      routePath(
        pairs: $pairs,
        inputToken: $inputToken,
        outputToken: $outputToken,
      )
    }`,
    variables: {
      pairs: pairs,
      inputToken: inputToken,
      outputToken: outputToken
    }
  });

  if (errors) {
    throw errors;
  }

  if (!data) {
    throw Error("createRoute returned undefined, this should never happen");
  }

  return data;
}
window.createRoute = createRoute;
