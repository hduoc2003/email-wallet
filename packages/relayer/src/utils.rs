use std::sync::Arc;

use anyhow::Result;
use email_wallet_utils::{converters::hex2field, cryptos::{AccountKey, WalletSalt}};
use reqwest::Client;
use serde::Deserialize;
use serde_json::json;

use crate::{fr_to_bytes32, Database, EmailMessage, NIBIRU_SDK_PROXY_ADDR};

pub struct WalletInfo {
    pub salt: WalletSalt,
    pub address: String,
}

#[derive(Debug, Deserialize)]
pub struct GetWalletRes {
    pub address: String
}

pub async fn get_wallet_from_account_key(account_key: &AccountKey) -> Result<WalletInfo> {
    let salt = account_key.to_wallet_salt().unwrap();
    let client = Client::new();
    let address = client
        .post(format!("{}/get-wallet-address", NIBIRU_SDK_PROXY_ADDR))
        .json(&json!({
            "wallet_salt": fr_to_bytes32(&salt.0).unwrap()
        }))
        .send()
        .await?
        .error_for_status()?
        .json::<GetWalletRes>().await?.address;
    Ok(WalletInfo {
        salt,
        address
    })
}

pub(crate) async fn get_account_key_from_mail(mail_address: &String, db: &Arc<Database>) -> Result<AccountKey> {
    let account_key_hex = db.get_account_key(&mail_address).await?.unwrap();
    Ok(AccountKey(hex2field(&account_key_hex).unwrap()))
}
