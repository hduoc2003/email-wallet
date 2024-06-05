import express, {Request, Response} from "express";
import {createAccount} from "../contracts/createAccount";
import {sendTokens} from "../contracts/transferToken";

const transferTokenRouter = express.Router();

interface Req {
    wallet_salt: number[],
    toAddress: string,
    name: string,
    amount: number,
}

type Res = string | {
    txHash: string,
}
transferTokenRouter.post("/transfer-token", async (req: Request<never, never, Req>, res: Response<Res>) => {
    let {wallet_salt, toAddress, name, amount} = req.body;
    if (wallet_salt.length !== 32) {
        res.send(`Invalid wallet salt`);
        return;
    }
    let signer = await createAccount(wallet_salt);
    let txHash = await sendTokens(signer, toAddress, name, amount);
    res.send({
        txHash
    })
})
export default transferTokenRouter;