import { action, makeObservable, observable } from 'mobx'
import { ChainInfo } from '@keplr-wallet/types'
import { Bech32Address } from '@keplr-wallet/cosmos'

export class ChainInfoStore {
    @observable
    chainInfo: ChainInfo = getDefaultChainInfo()

    constructor() {
        makeObservable(this)
    }

    @action
    setChainInfo = (chainInfo: ChainInfo) => {
        this.chainInfo = chainInfo
        window.localStorage.setItem("chainInfo", JSON.stringify(chainInfo))
    }
}

//testnet
function getDefaultChainInfo(): ChainInfo {
    const lsChainInfo = window.localStorage.getItem("chainInfo")
    if (lsChainInfo) {
        return JSON.parse(lsChainInfo)
    }

    return {
        rpc: `http://${window.location.hostname}:26657`,
        rest: `http://${window.location.hostname}:1317`,
        // rpc: `http://cosmos-test-2.adoriasoft.link:26657`,
        // rest: `http://cosmos-test-2.adoriasoft.link:1317`,
        // chainId: "test",
        chainId: "cosmoswithgroups",
        // chainName: "GROUPS-UI-REGEN-TEST",
        chainName: "GROUPS-UI-SDK-TEST",
        stakeCurrency: {
            // coinDenom: "UREGEN",
            coinDenom: "STAKE",
            // coinMinimalDenom: "uregen",
            coinMinimalDenom: "stake",
            coinDecimals: 6
        },
        bip44: {
            coinType: 118
        },
        // bech32Config: Bech32Address.defaultBech32Config("regen"),
        bech32Config: Bech32Address.defaultBech32Config("cosmos"),
        currencies: [
            {
                // coinDenom: "UREGEN",
                coinDenom: "STAKE",
                // coinMinimalDenom: "uregen",
                coinMinimalDenom: "stake",
                coinDecimals: 6
            }
        ],
        feeCurrencies: [
            {
                // coinDenom: "UREGEN",
                coinDenom: "STAKE",
                // coinMinimalDenom: "uregen",
                coinMinimalDenom: "stake",
                coinDecimals: 6
            }
        ],
        features: ["stargate", "ibc-transfer"]
    }
}
