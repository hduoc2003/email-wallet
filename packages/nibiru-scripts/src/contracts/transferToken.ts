import {NibiruTxClient, Testnet} from "@nibiruchain/nibijs";
import {coins} from "@cosmjs/proto-signing";


export const CHAIN = Testnet(1);
export async function sendTokens(signer: any, toAddress: string, name: string, amount: number) {
    const txClient = await NibiruTxClient.connectWithSigner(CHAIN.endptTm, signer)
    const [{address: fromAddr}] = await signer.getAccounts()
    const tokens = coins(amount, name)
    const txRes = await txClient.sendTokens(
        fromAddr,
        toAddress,
        tokens,
        5
    )
    return txRes.transactionHash
}