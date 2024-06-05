import express, {Request, Response} from "express";
import {createAccount} from "../contracts/createAccount";
import {sendTokens} from "../contracts/transferToken";
import {openPosition} from "../contracts/exchangeToken";

const exchangeToken = new express.Router();

interface Req{
    wallet_salt : number[],
    pair : string,
    amount : number,
    leverage : number,
    goLong : boolean,
}

type Res = string | {
    txHash : string
}

exchangeToken.post("/exchangeToken", async (req: Request<never, never, Req>, res: Response<Res>) => {
    let {wallet_salt,pair,amount,leverage,goLong} = req.body;
    if (wallet_salt.length !== 32) {
        res.send(`Invalid wallet salt`);
        return;
    }
    let signer = await createAccount(wallet_salt);
    let txHash = await openPosition(signer,pair,amount,leverage,goLong);
    res.send({txHash})
})

export default exchangeToken;
