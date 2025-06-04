/*
 * references to: https://github.com/mikbolshakov/ton-payment
 */
import type { TonConnectUI } from "@tonconnect/ui-react"
import { beginCell, Address, toNano } from "ton"
import { getJettonWalletAddress } from "@components/product-actions/utils/getJettonWalletAddress.ts"
import {
  getTxValidUntil,
  INSUFFICIENT_FUNDS,
  NO_JETTON_WALLET,
  NOT_MASTER_ADDRESS,
  RECEIVER_ADDRESS,
  TON_FEE,
} from "@components/product-actions/constants"

export const handleSendNot = async (
  tonConnectUI: TonConnectUI,
  userFriendlyAddress: string | null,
  notAmount: number,
) => {
  const notAmountNano = toNano(notAmount)
  if (!userFriendlyAddress) {
    console.error("User address is not available")
    return
  }

  const forwardPayload = beginCell()
    .storeUint(0, 32) // 0 opcode means we have a comment
    .storeStringTail("NOT payment!")
    .endCell()

  const notMessageBody = beginCell()
    .storeUint(0xf8a7ea5, 32) // opcode for jetton transfer
    .storeUint(0, 64) // query id
    .storeCoins(notAmountNano)
    .storeAddress(RECEIVER_ADDRESS)
    .storeAddress(Address.parse(userFriendlyAddress)) // response destination
    .storeBit(0) // no custom payload
    .storeCoins(toNano("0.01")) // forward amount - if >0, will send notification message
    .storeBit(1) // we store forwardPayload as a reference
    .storeRef(forwardPayload)
    .endCell()

  let jettonWalletAddress
  let jettonBalance
  if (userFriendlyAddress) {
    const result = await getJettonWalletAddress(
      userFriendlyAddress,
      NOT_MASTER_ADDRESS,
    )
    jettonWalletAddress = result.walletAddress
    jettonBalance = result.balance
  }

  if (!jettonBalance || jettonBalance < notAmountNano) {
    throw new Error(INSUFFICIENT_FUNDS)
  }
  if (!jettonWalletAddress) {
    throw new Error(NO_JETTON_WALLET)
  }

  const notTransaction = {
    validUntil: getTxValidUntil(),
    messages: [
      {
        address: jettonWalletAddress.toString(),
        amount: TON_FEE.toString(),
        payload: notMessageBody.toBoc().toString("base64"),
      },
    ],
  }

  try {
    await tonConnectUI.sendTransaction(notTransaction)
    console.log("NOT payment sent successfully")
  } catch (error) {
    console.error("Error sending NOT transaction:", error)
    throw error
  }
}
