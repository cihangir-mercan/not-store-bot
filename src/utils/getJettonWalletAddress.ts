/*
 * references to: https://github.com/mikbolshakov/ton-payment
 */
import TonWeb from "tonweb"
const { JettonMinter, JettonWallet } = TonWeb.token.jetton

const tonweb = new TonWeb()

export const getJettonWalletAddress = async (
  ownerAddress: string,
  masterAddress: string,
): Promise<{ walletAddress: string | null; balance: number }> => {
  try {
    const jettonMinter = new JettonMinter(tonweb.provider, {
      address: masterAddress,
      adminAddress: new TonWeb.utils.Address(masterAddress),
      jettonContentUri: "",
      jettonWalletCodeHex: JettonWallet.codeHex,
    })
    const walletAddress = await jettonMinter.getJettonWalletAddress(
      new TonWeb.utils.Address(ownerAddress),
    )

    const jettonWallet = new JettonWallet(tonweb.provider, {
      address: walletAddress,
    })

    const data = await jettonWallet.getData()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const balance = data.balance

    return {
      walletAddress: walletAddress.toString(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      balance: parseInt(balance, 10),
    }
  } catch (error) {
    console.error("Error fetching Jetton Wallet Address:", error)
    return { walletAddress: null, balance: 0 }
  }
}
