import { BN, TEN } from "@drift-labs/sdk";
import { PublicKey } from "@solana/web3.js";
import {
    OptionValues,
    Command
} from "commander";
import { dumpTransactionMessage, getCommandContext } from "../utils";

export const managerDeposit = async (program: Command, cmdOpts: OptionValues) => {

    let vaultAddress: PublicKey;
    try {
        vaultAddress = new PublicKey(cmdOpts.vaultAddress as string);
    } catch (err) {
        console.error("Invalid vault address");
        process.exit(1);
    }

    const {
        driftClient,
        driftVault
    } = await getCommandContext(program, true);

    const vaultAccount = await driftVault.program.account.vault.fetch(vaultAddress);
    const spotMarket = driftClient.getSpotMarketAccount(vaultAccount.spotMarketIndex);
    if (!spotMarket) {
        throw new Error("No spot market found");
    }
    const spotPrecision = TEN.pow(new BN(spotMarket.decimals));
    const depositBN = new BN(cmdOpts.amount * spotPrecision.toNumber());

    if (cmdOpts.dumpTransactionMessage) {
        const txs = await driftVault.getManagerDepositIx(vaultAddress, depositBN);
        console.log(dumpTransactionMessage(driftClient.wallet.publicKey, txs));
    } else {
        const tx = await driftVault.managerDeposit(vaultAddress, depositBN);
        console.log(`Deposited ${cmdOpts.amount} to vault as manager: https://solana.fm/tx/${tx}${driftClient.env === "devnet" ? "?cluster=devnet-solana" : ""}`);
    }
};