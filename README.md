# Group-ui

## Prerequisites
- `node 12.*`
- `go 1.17.*`, `unzip`, `curl` (for proto generation)
- [Keplr Chrome extension](https://www.keplr.app/)
- `tendermint`

## Usage

Ensure you have a Tendermint node running locally and that CORS is allowed from any origin in `config.toml`.

- `npm ci`
- `./protocgen.sh`
- `npm run start`

M1 Macintosh developers will have to run `protocgen.sh` under Rosetta (and also take care to install node 12 under Rosetta).