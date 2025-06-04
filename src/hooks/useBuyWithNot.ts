// hooks/useBuyWithTon.ts
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react"
import toast from "react-hot-toast"
import { handleSendNot } from "@components/product-actions/utils/handleSendNot"
import {
  INSUFFICIENT_FUNDS,
  NO_JETTON_WALLET,
} from "@components/product-actions/constants"
import { useTranslation } from "react-i18next"
import { useCallback } from "react"

export const useBuyWithNot = () => {
  const { t } = useTranslation()
  const userAddress = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()

  const showErrorToast = useCallback(
    (msgKey: string) => {
      toast.dismiss()
      toast.error(t(`productPage.${msgKey}`))
    },
    [t],
  )

  const connectWallet = useCallback(async () => {
    try {
      await tonConnectUI.openModal()
    } catch {
      showErrorToast("walletOpenError")
    }
  }, [tonConnectUI, showErrorToast])

  const sendPayment = useCallback(
    async (amount: number) => {
      if (!userAddress) {
        await connectWallet()
        throw new Error("WALLET_NOT_CONNECTED")
      }

      try {
        await handleSendNot(tonConnectUI, userAddress, amount)
        return true
      } catch (err: unknown) {
        if (err instanceof Error && err.message === INSUFFICIENT_FUNDS) {
          showErrorToast("insufficientFunds")
        } else if (err instanceof Error && err.message === NO_JETTON_WALLET) {
          showErrorToast("noJettonWallet")
        } else {
          showErrorToast("paymentCancelled")
        }
        return false
      }
    },
    [userAddress, tonConnectUI, connectWallet, showErrorToast],
  )

  return {
    sendPayment,
  }
}
