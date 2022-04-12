/**
 * Make 'cosmos106…59vq' from 'cosmos106ljn6kds9vegaux0w4jnend97fdm50yec59vq'
 *
 * @param address
 */
export function truncateAddress(address: string) {
    if (address !== undefined && address !== null && address !== '')
        return address.substring(0, 9) + "…" + address.substring(address.length - 4)
    else
        return address
}


/**
 * Response example
 * {
 *   "regen": {
 *     "usd": 0.894169
 *   }
 * }
 * @param coins regen,atom for example
 */
export function fetchCoinPrices(coins: string[]): Promise<{ [key: string]: { usd: number } }|undefined> {
    return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`)
        .then(result => result.json())
        .catch(e => {
            console.log(e)
        })
}
