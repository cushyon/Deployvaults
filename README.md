# Collection of info on how to set up a Drift Vaults - May 25

CLI method is the most up to date:
https://drift-labs.github.io/v2-teacher/?typescript#drift-vaults

Vaults github:
https://github.com/drift-labs/drift-vaults

Template for vault UI:
https://github.com/drift-labs/vaults-ui-template


other ressources:

https://github.com/drift-labs/protocol-v2 

https://github.com/drift-labs/sdk-examples

Example of CLI command devnet:
yarn cli init-vault --name "test cushion2" --market-index 1 --redeem-period 3600 --max-tokens 10000 --management-fee 2 --profit-share 20 --permissioned --min-deposit-amount 1 --url https://devnet.helius-rpc.com/\?api-key\=41023146-3e5e-4214-ba0d-8697fb7f0045  --keypair ~/cushionwalletv2.json  --env devnet

Be careful with the permissioned flag, it gives the ability to deposit or not and is set to "false" by default.

In case you already created a PDA but your signatures are not validated, comment the command getUpdateDelegateIx in  "await driftVault.getUpdateDelegateIx(vaultAddress, delegate)" in initVault.ts

You can follow analytics about vaults here:
https://analytics.drift.trade/?tab=Vaults

# initialize Drift Client to execute trades from Vault

STEP 1 

authorityaddy = VAULT ADDRESS

const driftClient = new DriftClient({
        connection,
        wallet,
        env: "mainnet-beta", 
        accountSubscription: {
          type: 'websocket',
        },
        authority: authorityaddy,
        subAccountIds: [0],
        activeSubAccountId: 0
      });


--------------------

STEP 2

const orderParams = {
  orderType: OrderType.MARKET,
  marketIndex: 0,
  direction: PositionDirection.LONG,
  baseAssetAmount: driftClient.convertToPerpPrecision(100),
  auctionStartPrice: driftClient.convertToPricePrecision(21.20),
  auctionEndPrice: driftClient.convertToPricePrecision(21.30),
  price: driftClient.convertToPricePrecision(21.35),
  auctionDuration: 60,
  maxTs: now + 100,
}
await driftClient.placePerpOrder(orderParams);