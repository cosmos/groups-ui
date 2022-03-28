export function chainListProvider(): readonly Chain[] {
    // todo: switch to registry repo https://github.com/cosmos/chain-registry
    //  usage example https://jsfiddle.net/nooomski/nygm6o9s/
    //  The best solution: onchain data provider when it will be available
    return Object.freeze(list)
}

// fixme: get additional properties like: coinDecimals, bip44, bech32Config, stakeCurrency, currencies, feeCurrencies, features
export interface Chain {
    readonly chainId: string
    readonly chainName: string
    readonly rpc: string
    readonly rest: string
    readonly coinDenom: string
    readonly coinMinimalDenom: string
}

// source https://github.com/cosmos/composer/blob/master/react/src/types/settings.ts
// fixme: some networks data not correct, osmosis for example
const list: Chain[] = [
    {
        rpc: `http://44.200.220.236:26657`,
        rest: `http://44.200.220.236:1317`,
        chainId: "cosmoswithgroups",
        chainName: "GROUPS-UI-TEST",
        coinDenom: "STAKE",
        coinMinimalDenom: "stake"
    },
    {
        rpc: `http://${window.location.hostname}:26657`,
        rest: `http://${window.location.hostname}:1317`,
        chainId: "cosmoswithgroups",
        chainName: "GROUPS-UI-TEST-LOCAL",
        coinDenom: "STAKE",
        coinMinimalDenom: "stake"
    },
    {
        rpc: "https://rpc-cosmoshub.keplr.app",
        rest: "https://lcd-cosmoshub.keplr.app",
        chainId: "cosmoshub-4",
        chainName: "Cosmos",
        coinDenom: "atom",
        coinMinimalDenom: "uatom"
    },
    {
        rpc: "https://vega-rpc.interchain.io",
        rest: "https://vega-rest.interchain.io",
        chainId: "vega-testnet",
        chainName: "vega-testnet",
        coinDenom: "atom",
        coinMinimalDenom: "uatom"
    },
    {
        rpc: "https://rpc-osmosis.blockapsis.com",
        rest: "https://lcd-osmosis.blockapsis.com",
        chainId: "osmosis-1",
        chainName: "Osmosis",
        coinDenom: "osmo",
        coinMinimalDenom: "uosmo"
    },
    {
        rpc: "https://rpc-secret.keplr.app",
        rest: "https://lcd-secret.keplr.app",
        chainId: "secret-3",
        chainName: "Secret Network",
        coinDenom: "scrt",
        coinMinimalDenom: "uscrt"
    },
    {
        rpc: "https://rpc-akash.keplr.app",
        rest: "https://lcd-akash.keplr.app",
        chainId: "akashnet-2",
        chainName: "Akash",
        coinDenom: "akash",
        coinMinimalDenom: "uakash"
    },
    {
        rpc: "https://rpc-crypto-org.keplr.app",
        rest: "https://lcd-crypto-org.keplr.app",
        chainId: "crypto-org-chain-mainnet-1",
        chainName: "Crypto.org",
        coinDenom: "cro",
        coinMinimalDenom: "ucro"
    },
    {
        rpc: "https://rpc-iov.keplr.app",
        rest: "https://lcd-iov.keplr.app",
        chainId: "iov-mainnet-ibc",
        chainName: "Starname",
        coinDenom: "aiov",
        coinMinimalDenom: "uiov"
    },
    {
        rpc: "https://rpc-sifchain.keplr.app",
        rest: "https://lcd-sifchain.keplr.app/",
        chainId: "sifchain-1",
        chainName: "Sifchain",
        coinDenom: "rowan",
        coinMinimalDenom: "urowan"
    },
    {
        rpc: "https://rpc-certik.keplr.app",
        rest: "https://lcd-certik.keplr.app",
        chainId: "shentu-2.2",
        chainName: "Certik",
        coinDenom: "ctk",
        coinMinimalDenom: "uctk"
    },
    {
        rpc: "https://rpc-iris.keplr.app",
        rest: "https://lcd-iris.keplr.app",
        chainId: "irishub-1",
        chainName: "IRISnet",
        coinDenom: "iris",
        coinMinimalDenom: "uiris"
    },
    {
        rpc: "https://rpc-regen.keplr.app",
        rest: "https://lcd-regen.keplr.app",
        chainId: "regen-1",
        chainName: "Regen",
        coinDenom: "regen",
        coinMinimalDenom: "uregen"
    },
    {
        rpc: "https://rpc-persistence.keplr.app",
        rest: "https://lcd-persistence.keplr.app",
        chainId: "core-1",
        chainName: "Persistence",
        coinDenom: "xrpt",
        coinMinimalDenom: "uxrpt"
    },
    {
        rpc: "https://rpc-sentinel.keplr.app",
        rest: "https://lcd-sentinel.keplr.app",
        chainId: "sentinelhub-2",
        chainName: "Sentinel",
        coinDenom: "dvpn",
        coinMinimalDenom: "udvpn"
    },
    {
        rpc: "https://rpc-impacthub.keplr.app",
        rest: "https://lcd-impacthub.keplr.app",
        chainId: "impacthub-3",
        chainName: "ixo",
        coinDenom: "ixo",
        coinMinimalDenom: "uixo"
    },
    {
        rpc: "https://rpc-emoney.keplr.app",
        rest: "https://lcd-emoney.keplr.app",
        chainId: "emoney-3",
        chainName: "e-Money",
        coinDenom: "ngm",
        coinMinimalDenom: "ungm"
    }
]
