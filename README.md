# Collection of info on how to set up a Drift Vaults - May 25

CLI method is the most up to date:
https://drift-labs.github.io/v2-teacher/?typescript#drift-vaults

Vaults github:
https://github.com/drift-labs/drift-vaults

Template for vault UI:
https://github.com/drift-labs/vaults-ui-template


other ressources:

https://github.com/drift-labs/protocol-v2

https://github.com/sendaifun/solana-agent-kit/blob/v2/packages/plugin-defi/src/drift/tools/drift_vault.ts

https://github.com/drift-labs/sdk-examples

Example of CLI command devnet:
yarn cli init-vault --name "test cushion2" --market-index 1 --redeem-period 3600 --max-tokens 10000 --management-fee 2 --profit-share 20 --min-deposit-amount 1 --url <RPCURL>  --keypair ~/cushionwalletv2.json  --env devnet

Be careful with the permissioned flag, it gives the ability to deposit or not. It should be set to "false" by default but this is not the case, only way to set permissioned to false is to remove the flag.

If vault creation failed initially and your signatures are not validated, comment the call getUpdateDelegateIx in  "await driftVault.getUpdateDelegateIx(vaultAddress, delegate)" in initVault.ts. Apparently in an case comment this line, it seems to block even with a fresh wallet/PDA.

Init Vaults depositors:
yarn cli init-vault-depositor --vault-address=6hpk9equdGMJf1pKs9xcuwUrMigCYC5Gec15tCbMqcs8 --deposit-authority=CcfwPEzivuWSUYndGhL8XGw19s46fCaeB8e5nQBSzpEH

Should get a message like "VaultDepositor initialized for CcfwPEzivuWSUYndGhL8XGw19s46fCaeB8e5nQBSzpEH: ZTZmVLWsxxKsM7fG2G8LRTSuQeG3W7yFTqhuDgYZ8wMuMtHvRTC2GH8aSi6C6YdUS44wX1RzC4uxJZgahNvbwF6
VaultDepositor address: BDTDrLFzTSCYLpDhw4VnJQAXPj4sAeRKXYvQkghptAxC"

View info about the vault:
yarn cli view-vault --vault-address=6hpk9equdGMJf1pKs9xcuwUrMigCYC5Gec15tCbMqcs8
yarn cli view-vault-depositor --vault-depositor-address=BDTDrLFzTSCYLpDhw4VnJQAXPj4sAeRKXYvQkghptAxC


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