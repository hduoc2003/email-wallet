# Nibiru Email Wallet

This project is build on top of [Email Wallet](https://github.com/zkemail/email-wallet). More details on this project can be found [here](https://github.com/bjergsen243/nibiru-email-wallet).

## Installation

Before running the following steps, you need to install `cargo`, `yarn` and `docker`.

### Create `.env` file

First, create a `.env` file in `packages/relayer` and update it with the following:

```ini
CORE_CONTRACT_ADDRESS=           # Address of the deployed wallet contract.
PRIVATE_KEY=                      # Private key for Relayer's account.
CHAIN_RPC_PROVIDER=http://127.0.0.1:8545
CHAIN_ID=11155111                    # Chain ID of the testnet.

# IMAP + SMTP (Settings will be provided by your email provider)
IMAP_DOMAIN_NAME=imap.gmail.com
IMAP_PORT=993
AUTH_TYPE=password
SMTP_DOMAIN_NAME=smtp.gmail.com
LOGIN_ID=                    # IMAP login id - usually your email address.
LOGIN_PASSWORD=""         # IMAP password - usually your email password.

PROVER_ADDRESS="http://0.0.0.0:8080" # local or modal URL

FEE_PER_GAS=0        # Fee per gas in wei.
DATABASE_URL= "postgres://test@localhost/emailwallet_test"
RELAYER_EMAIL_ADDR=
RELAYER_HOSTNAME="example.com"
WEB_SERVER_ADDRESS="127.0.0.1:4500"
CIRCUITS_DIR_PATH=  #Path to email-wallet/packages/circuits
SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/zkemail/email-wallet-v1-sepolia-2
INPUT_FILES_DIR_PATH=  #Path to email-wallet/packages/relayer/input_files
EMAIL_TEMPLATES_PATH=  #Path to email templates, e.g. ./packages/relayer/eml_templates/

ONBOARDING_TOKEN_ADDR=
ONBOARDING_TOKEN_AMOUNT=100
ONBOARDING_TOKEN_DISTRIBUTION_LIMIT=10
ONBOARDING_REPLY="You received 100 TEST!"

CANISTER_ID="i73e6-2qaaa-aaaan-qepxa-cai"
PEM_PATH="./.ic.pem"
IC_REPLICA_URL="https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=i73e6-2qaaa-aaaan-qepxa-cai"

JSON_LOGGER=false
```

### Run prover and database

```bash
docker compose up -d
```

### Run the relayer

```bash
yarn
cd packages/relayer
cargo run
```
