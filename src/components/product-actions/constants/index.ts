import { Address, toNano } from "ton"

export const getTxValidUntil = () => Math.floor(Date.now() / 1000) + 600
export const RECEIVER_ADDRESS = Address.parse(
  "UQBop9ORTkMKCeGK8S_I2ly1BDR93zd0luHLBuY_lNckeyjg",
)
export const TON_FEE = toNano("0.04")
export const NOT_MASTER_ADDRESS =
  "EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT"
export const INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS"
export const NO_JETTON_WALLET = "NO_JETTON_WALLET"
