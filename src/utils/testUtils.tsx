import type { RenderOptions } from "@testing-library/react"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { PropsWithChildren, ReactElement } from "react"
import { Provider } from "react-redux"
import type { AppStore, RootState } from "../app/store"
import { makeStore } from "../app/store"
import { MemoryRouter } from "react-router"
import { TonConnectUIProvider } from "@tonconnect/ui-react"

type ExtendedRenderOptions = Omit<RenderOptions, "queries"> & {
  preloadedState?: Partial<RootState>
  store?: AppStore
  route?: string
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = makeStore(preloadedState),
    route = "/",
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <TonConnectUIProvider manifestUrl="http://localhost/mock-manifest.json">
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    </TonConnectUIProvider>
  )

  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
