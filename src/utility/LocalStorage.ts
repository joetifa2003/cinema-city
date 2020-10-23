import SecureLS from "secure-ls"

export const ls = new SecureLS({
  encodingType: "aes",
  encryptionSecret: process.env.REACT_APP_SECRET_KEY,
});