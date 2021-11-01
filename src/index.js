import { Web3ApiClient } from "@web3api/client-js";
const web3client = new Web3ApiClient();

async function helloWorld(client) {
  const { data, errors} = await client.query({
    uri: 'ens/helloworld.web3api.eth',
    query: `{
      logMessage(message: "Hello World!")
    }`,
  });

  if (errors) {
    throw errors;
  }

  if (!data) {
    throw Error("this should never happen");
  }

  return data;
}

const hello = helloWorld(web3client);
