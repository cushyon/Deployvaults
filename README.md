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