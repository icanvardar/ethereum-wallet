export const addressShortener = (address) => {
    const firstSixChar =  address.substring(0, 6);
    const lastSixChar = address.substring(address.length-4, address.length);
    return firstSixChar + "..." + lastSixChar;
}