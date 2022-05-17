import { action, makeObservable, observable } from 'mobx'
import { ChainInfo } from '@keplr-wallet/types'
import { Bech32Address } from '@keplr-wallet/cosmos'
import { applyChainInfo } from '../protocol/services'

export class ChainInfoStore {
    @observable
    chainInfo: ChainInfo = getDefaultChainInfo()

    constructor() {
        makeObservable(this)
    }

    @action
    setChainInfo = async (chainInfo: ChainInfo) => {
        try {
            await applyChainInfo(chainInfo)
            window.localStorage.setItem('chainInfo', JSON.stringify(chainInfo))
            this.chainInfo = chainInfo
        } catch (e) {
            console.log('Cannot change chain', e)
            // todo: handle network reject
            // todo: other errors handling
        }
    }
}

//testnet
function getDefaultChainInfo(): ChainInfo {
    const lsChainInfo = window.localStorage.getItem('chainInfo')
    if (lsChainInfo) {
        return JSON.parse(lsChainInfo)
    }

    return {
        rpc: `http://${window.location.hostname}:26657`,
        rest: `http://${window.location.hostname}:1317`,
        chainId: 'cosmoswithgroups',
        // chainName: "GROUPS-UI-REGEN-TEST",
        chainName: 'GROUPS-UI-SDK-TEST',
        stakeCurrency: {
            // coinDenom: "UREGEN",
            coinDenom: 'STAKE',
            // coinMinimalDenom: "uregen",
            coinMinimalDenom: 'stake',
            coinDecimals: 6
        },
        bip44: {
            coinType: 118
        },
        // bech32Config: Bech32Address.defaultBech32Config("regen"),
        bech32Config: Bech32Address.defaultBech32Config('cosmos'),
        currencies: [
            {
                // coinDenom: "UREGEN",
                coinDenom: 'STAKE',
                // coinMinimalDenom: "uregen",
                coinMinimalDenom: 'stake',
                coinDecimals: 6
            }
        ],
        feeCurrencies: [
            {
                // coinDenom: "UREGEN",
                coinDenom: 'STAKE',
                // coinMinimalDenom: "uregen",
                coinMinimalDenom: 'stake',
                coinDecimals: 6
            }
        ],
        features: ['stargate', 'ibc-transfer']
    }
}
