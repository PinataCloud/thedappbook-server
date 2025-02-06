## thedappbook - Server

![cover](https://dweb.mypinata.cloud/ipfs/bafkreih24voz7rvhcugw66ulsl7lpmk7sekq2s52anuezuaykb7qt4swo4)

A simple blockchain application using smart contracts and IPFS

## Overview

thedappbook allows users to connect their wallet and write posts on the decentralized wall. This happens through several components:

- [Smart Contracts](https://github.com/PinataCloud/thedappbook-contracts) - Works like a decentralized database that stores the messages and the address of the user who posted them. Blockchain data is too expensive to store full res images, so instead it stores an IPFS CID that points to the content offchain.
- [Server](https://github.com/PinataCloud/thedappbook-server) - Handles generating temporary Pinata API Keys to upload images and JSON content that can be consumed by the client.
- [Client](https://github.com/PinataCloud/thedappbook-client) - The hosted web UI that the end user connects their wallet with and writes a message to the smart contract.

## The Server

This particular repo provides an API endpoint to generate a temporary Pinata API key to handle uploads on the [client](https://github.com/PinataCloud/thedappbook-client). It will require making an Admin API key on the [Pinata App](https://app.pinata.cloud/developers/api-keys).

This is currently not protected by any auth mechanism and is purely for educational purposes. For a production build consider locking the endpoint to authorized users only.

```typescript
app.post('/keys', async (c) => {
  // Auth would go here
  try {
    const pinata = new PinataSDK({
      pinataJwt: c.env.PINATA_JWT,
      pinataGateway: ""
    })
  //.....
```

## Development

Clone the repo and install the dependencies

```bash
git clone https://github.com/PinataCloud/thedappbook-server
cd thedappbook-server
npm install
```

Once the dependencies are installed start up the dev server

```bash
npm run dev
```

Everything is inside the `src/index.ts` file and is pretty simple. A `POST` request made to `/keys` will return a Pinata JWT that is only good for two uses and is restricted to only `/pinning/pinFileToIPFS` and `/pinning/pinJSONToIPFS`.

## Deployment

First make sure to create a free [Cloudflare account](https://cloudflare.com), then run the following command in the terminal.

```bash
npx wrangler login
```

Once you have logged in run the deployment command

```
npm run deploy
```

Follow the prompts to make the worker. Once complete make sure to add your PINATA_JWT API key by running the command below:

```bash
npx wrangler secret put PINATA_JWT
```

This will prompt you to paste in your key

## Questions?

Feel free to reach out over [Discord](https://discord.gg/pinata) or [Email](mailto:steve@pinata.cloud)!
