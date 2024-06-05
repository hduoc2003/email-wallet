// routes.test.ts

import axios from 'axios';
import {config} from "dotenv";
describe('POST /create-account', () => {
    it('should create an account and return a signer', async () => {
        const res = await axios.post('http://localhost:3000/create-account', {
            wallet_salt: [25, 191, 2, 168, 5, 208, 103, 64, 153, 98, 46, 243, 144, 13, 115, 45, 37, 88, 27, 43, 37, 45, 30, 186, 106, 170, 64, 172, 217, 123, 191, 204]
        })
        const {data} = res;
        expect(res.status).toEqual(200);
        expect(data.userAddr).toEqual("nibi1xx6due8t4r5lv0nceld5rdd4ug64nt49g06rpg");
    });

    it('should return an error when wallet_salt is invalid', async () => {
        const res = await fetch('http://localhost:3000/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wallet_salt: [1, 2, 3] // Invalid data
            })
        });

        const data = await res.text();

        expect(res.status).toEqual(200);
        expect(data).toEqual('Invalid wallet salt');
    });
});

describe('POST /transfer', () => {
    it('should transfer tokens from one account to another', async () => {
        const res = await axios.post('http://localhost:3000/transfer-token', {
            wallet_salt: [25, 191, 2, 168, 5, 208, 103, 64, 153, 98, 46, 243, 144, 13, 115, 45, 37, 88, 27, 43, 37, 45, 30, 186, 106, 170, 64, 172, 217, 123, 191, 204],
            toAddress : "nibi1tsgl9sr8ayy4s9fdf9mr2ck2tptpjy2shdj7ky",
            name : "unibi",
            amount: 5,
        }, {
            timeout: 100000
        })
        const {data} = res;
        expect(res.status).toEqual(200);
        expect(data.txHash).not.toEqual(0);
    })
})
describe('POST/ verify', () => {
  it('should verify the create account', async () => {
      const res = await  axios.post('http://localhost:3000/verify-create-account', {
          wallet_salt: [25, 191, 2, 168, 5, 208, 103, 64, 153, 98, 46, 243, 144, 13, 115, 45, 37, 88, 27, 43, 37, 45, 30, 186, 106, 170, 64, 172, 217, 123, 191, 204]
      }, {
          timeout: 1000000
      })
      const {data} = res;
      console.log(data.txHash)
  })
})