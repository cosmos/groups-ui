import { action, makeObservable, observable } from 'mobx'
import { ChainInfo } from '@keplr-wallet/types'
import { Bech32Address } from '@keplr-wallet/cosmos'

export class ChainInfoStore {
    @observable
    chainInfo: ChainInfo = getDefaultChainInfo()

    @observable
    keplrAccount: string = ""

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
        chainId: "test",
        chainName: "GROUPS-UI-REGEN-TEST",
        stakeCurrency: {
            coinDenom: "UREGEN",
            coinMinimalDenom: "uregen",
            coinDecimals: 6
        },
        bip44: {
            coinType: 118
        },
        bech32Config: Bech32Address.defaultBech32Config("regen"),
        currencies: [
            {
                coinDenom: "UREGEN",
                coinMinimalDenom: "uregen",
                coinDecimals: 6
            }
        ],
        feeCurrencies: [
            {
                coinDenom: "UREGEN",
                coinMinimalDenom: "uregen",
                coinDecimals: 6
            }
        ],
        features: ["stargate", "ibc-transfer"]
    }
}
