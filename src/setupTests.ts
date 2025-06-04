import "@testing-library/jest-dom/vitest"

beforeAll(() => {
  window.Telegram = {
    WebApp: {
      initDataUnsafe: {
        auth_date: Date.now(),
        hash: "",
        signature: "",
        start_param: "",
      },
      safeAreaInset: {
        bottom: 0,
      },
      expand: vi.fn(),
      close: vi.fn(),
      sendData: vi.fn(),
      enableClosingConfirmation: vi.fn(),
      disableClosingConfirmation: vi.fn(),
      isExpanded: false,
      viewportHeight: 800,
      viewportStableHeight: 800,
      platform: "web",
      themeParams: {},
      BackButton: {
        show: vi.fn(),
        hide: vi.fn(),
        onClick: vi.fn(),
        offClick: vi.fn(),
      },
      onEvent: vi.fn(),
      offEvent: vi.fn(),
      ready: vi.fn(),
      isClosingConfirmationEnabled: false,
      isVisible: true,
      headerColor: "#ffffff",
      backgroundColor: "#ffffff",
    },
  } as never
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    window.matchMedia =
      window.matchMedia ||
      (() => {
        return {
          matches: false,
          media: "",
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }
      })
  })
})

Object.defineProperty(HTMLElement.prototype, "scrollTo", {
  value: vi.fn(),
  writable: true,
})
