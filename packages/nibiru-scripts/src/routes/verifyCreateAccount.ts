import express, {Request, Response} from "express";
import {createAccount} from "../contracts/createAccount";
import {verifyCreateAccount} from "../contracts/verifyCreateAccount";
import router from "./createAccount";

const verifyCreateAccountRoute = new express.Router()

interface Req {
    wallet_salt : number[]
}

type Res = String |{
    txHash : string
}
router.post("/verify-create-account", async (req: Request<never, never, Req>, res: Response<Res>) => {
    let { wallet_salt } = req.body;
    if (wallet_salt.length !== 32) {
        res.send(`Invalid wallet salt`);
        return;
    }
    let signer = await createAccount(wallet_salt);
    let txRes = await verifyCreateAccount(signer)
    let [{address: userAddr}] = await signer.getAccounts()
    res.send({
        txHash: txRes
    })
})

export default verifyCreateAccountRoute;