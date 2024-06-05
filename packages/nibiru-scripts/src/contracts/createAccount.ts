import {
    NibiruTxClient,
    newSignerFromMnemonic,
    Testnet,
    NibiruQuerier,
    TxMessage,
} from "@nibiruchain/nibijs"
import {entropyToMnemonic} from "bip39"

export const CHAIN = Testnet(1);

export async function createAccount(wallet_salt: string | Buffer) {

    const mnemonic = entropyToMnemonic(wallet_salt)
    return await newSignerFromMnemonic(mnemonic)
}

export async function getBalance(address: string) {
    let querier = await NibiruQuerier.connect(CHAIN.endptTm)
    return await querier.getAllBalances(address)
}

export async function getTx(hash: string) {
    let querier = await NibiruQuerier.connect(CHAIN.endptTm)
    return await querier.getTx(hash)
}
