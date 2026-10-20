import { createBrowserRouter } from "react-router-dom"
import { App } from "./App"
import { Products } from "./pages/Products.tsx"
import { Sales } from "./pages/Sales.tsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {index: true, element: <Products />},
      {path: "/sales", element: <Sales />},
    ]
  }
])
