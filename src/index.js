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
    "chainId": 1,
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
  }
];

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

function helloWorld(value) {
  console.log('hello world', value);
}

window.helloWorld = helloWorld;

/////////////////////
// TOKEN functions //
/////////////////////
async function fetchTokenData(token) {
  console.log('passed in: "', token, '"');
  console.log('fetched: ', tokenList[token]);
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
  return data.fetchTokenData;
}
window.fetchTokenData = fetchTokenData;

async function fetchTotalSupply(token) {
  console.log('passed in: "', token, '"');
  console.log('fetched: ', tokenList[token]);
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

//let tokenData = await fetchTokenData(token2);
//let totalSupplyData = await fetchTotalSupply(web3client, tokenData;

// const token_element = document.createElement('div');
// token_element.innerHTML = "Token data: <pre><code>" + JSON.stringify(tokenData, undefined, 2) + "</code></pre>";

// const total_supply_element = document.createElement('div');
// token_element.innerHTML = "Total supply: <pre><code>" + JSON.stringify(totalSupplyData, undefined, 2) + "</code></pre>";

// let token_results = document.getElementById('token-api-results');
// token_results.appendChild(token_element);
// token_results.appendChild(total_supply_element);



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
pairData = await fetchPairData(web3client, token0, token1);
console.log("pairData: ", pairData);
amount = await fetchPairOutputAmount(web3client, pairData, inputAmount);
console.log("amount: ", amount);

// Output HTML
const element1 = document.createElement('div');
element1.innerHTML = "Token 1: " + token0.currency.name;

const element2 = document.createElement('div');
element2.innerHTML = "Token 2: " + token1.currency.name;

const element3 = document.createElement('div');
element3.innerHTML = "Pair data: <pre><code>" + JSON.stringify(pairData, undefined, 2) + "</code></pre>";

let pair_results = document.getElementById('pair-api-results');
pair_results.appendChild(element1);
pair_results.appendChild(element2);
pair_results.appendChild(element3);
