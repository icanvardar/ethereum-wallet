export const addressShortener = (address) => {
  if (address !== null) {
    const firstSixChar = address.substring(0, 6);
    const lastSixChar = address.substring(address.length - 4, address.length);
    return firstSixChar + "..." + lastSixChar;
  }

  return null;
};

export const addressEditor = (address) => {
  if (address !== null) {
    // this control is for metamask qr codes because they have
    // -- ethereum: -- prefix
    const n = address.indexOf(":");
    if (n !== -1) {
      address = address.substring(n + 1, address.length);
    }
    return address;
  }

  return null;
}