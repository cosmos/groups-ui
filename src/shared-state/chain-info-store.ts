import { observable } from 'mobx'
import { ChainInfo } from '@keplr-wallet/types'
import { Bech32Address } from '@keplr-wallet/cosmos'

export class ChainInfoStore {
    @observable
    chainInfo: ChainInfo = getDefaultChainInfo()
}

//testnet
function getDefaultChainInfo(): ChainInfo {
    return {
        rpc: "http://localhost:26657",
        rest: "http://localhost:1317",
        chainId: "test",
        chainName: "TESTNET",
        stakeCurrency: {
            coinDenom: "STAKE",
            coinMinimalDenom: "stake",
            coinDecimals: 6
        },
        bip44: {
            coinType: 118
        },
        bech32Config: Bech32Address.defaultBech32Config("cosmos"),
        currencies: [
            {
                coinDenom: "STAKE",
                coinMinimalDenom: "stake",
                coinDecimals: 6
            }
        ],
        feeCurrencies: [
            {
                coinDenom: "STAKE",
                coinMinimalDenom: "stake",
                coinDecimals: 6
            }
        ],
        features: ["stargate", "ibc-transfer"]
    }
}
