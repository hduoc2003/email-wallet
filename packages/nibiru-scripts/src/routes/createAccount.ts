import express, { Request, Response } from "express";
import {createAccount} from "../contracts/createAccount";
import {verifyCreateAccount} from "../contracts/verifyCreateAccount";

const router = express.Router();

interface Req {
  wallet_salt: number[],
  email_addr_pointer: number,
  account_key_commit  : number,
  psi_point : number[],
  proof : Proof
}
type Proof= string| {
    p_a : string[],
    p_b : string[][],
    p_c : string[],

}

type Res = string | {
    userAddr: string
}

router.post("/create-account", async (req: Request<never, never, Req>, res: Response<Res>) => {
  let { wallet_salt, email_addr_pointer,account_key_commit,psi_point,proof } = req.body;
  if (wallet_salt.length !== 32) {
    res.send(`Invalid wallet salt`);
    return;
  }
  if ()
  let signer = await createAccount(wallet_salt);
  let [{address: userAddr}] = await signer.getAccounts()
  res.send({
    userAddr
  })
})

export default router;