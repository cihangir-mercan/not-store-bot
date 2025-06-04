import type React from "react"

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    i18n: { changeLanguage: () => new Promise(() => {}) },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock("@tonconnect/ui-react", async () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const actual = await vi.importActual<typeof import("@tonconnect/ui-react")>(
    "@tonconnect/ui-react",
  )

  return {
    ...actual,
    TonConnectUIProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useTonConnectUI: () => [{ connect: vi.fn(), openModal: vi.fn() }],
    useTonAddress: () => "test-address",
    useTonWallet: () => ({ account: { address: "test-address" } }),
  }
})

import { App } from "./App"
import { renderWithProviders } from "./utils/testUtils.tsx"

describe("App component", () => {
  test("should render layout root on initial route", () => {
    const { container } = renderWithProviders(<App />, { route: "/" })

    const layoutRoot = container.querySelector("#layout-root")
    expect(layoutRoot).toBeInTheDocument()
  })
})
