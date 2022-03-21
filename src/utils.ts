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
