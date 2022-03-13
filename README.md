# Group-ui

## Prerequisites
- `node 12.*`
- `go 1.17.*`, `unzip`, `curl` (for proto generation)

## Usage
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
