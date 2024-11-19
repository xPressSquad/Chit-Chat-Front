import { Provider } from "react-redux"
import { ThemeProvider } from "./context/ThemeProvider"
import store from "./redux/store"
import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"

function App() {

  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default App
