# Group-ui

## Prerequisites
- `node 12.*`
- `go 1.17.*`, `unzip`, `curl` (for proto generation)
- [Keplr Chrome extension](https://www.keplr.app/)


## Usage

M1 Macintosh developers will have to run `protocgen.sh` under Rosetta (and also take care to install node 12 under Rosetta). CORS will need to be [bypassed locally](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc) due to current cosmos-sdk restraints while developing.

- `npm ci`
- `./protocgen.sh`
- `npm run start`

## Running a cosmos node locally
- steps in `make help`
- `make local-clean`
- `make local-init`
- `make local-start`

## Use frontend with different backends
- change `rpc` and `rest` fields in localhost:/3001/settings, or in chain-info-store.ts (default is window.location.hostname)
