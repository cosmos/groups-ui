# Group-ui

## Prerequisites
- `node 12.*`
- `go 1.17.*`, `unzip`, `curl` (for proto generation)
- chrome browser with keplr extension
 
## Usage
- `npm ci`
- `./protocgen.sh` (generated files are commited, so no need to run it before every usage)
- `npm run start`
- latest versions of cosmos-sdk seems to ignore CORS directives in config, workaround is using this extension https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc

## Running a cosmos node locally
- steps in `make help`
- `make local-clean`
- `make local-init`
- `make local-start`

## Use frontend with different backends
- change `rpc` and `rest` fields in localhost:/3001/settings, or in chain-info-store.ts (default is window.location.hostname)
