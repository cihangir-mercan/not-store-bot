import type { TonConnectUI } from "@tonconnect/ui-react"
import { beginCell, Address, toNano } from "ton"
import { v4 as uuidv4 } from "uuid"

export const getTxValidUntil = () => Math.floor(Date.now() / 1000) + 600
export const RECEIVER_ADDRESS = Address.parse(
  "UQBop9ORTkMKCeGK8S_I2ly1BDR93zd0luHLBuY_lNckeyjg",
)
export const TON_AMOUNT = toNano("0.08")

export const handleSendTon = async (tonConnectUI: TonConnectUI) => {
  const uniqueHash = uuidv4()

  const body = beginCell()
    .storeUint(0, 32)
    .storeStringTail(`TON payment! - ${uniqueHash}`)
    .endCell()

  const tonTransaction = {
    validUntil: getTxValidUntil(),
    messages: [
      {
        address: RECEIVER_ADDRESS.toString(),
        amount: TON_AMOUNT.toString(),
        payload: body.toBoc().toString("base64"),
      },
    ],
  }

  try {
    await tonConnectUI.sendTransaction(tonTransaction)
    console.log("TON payment sent successfully")
  } catch (error) {
    console.error("Error sending TON transaction:", error)
    throw error
  }
}
