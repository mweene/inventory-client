import { useEffect, useState } from "react"
import axios from "axios"

import { ProductsTable } from "./components/ProductsTable"
import { CreateProductForm } from "./components/CreateProductForm"
import { RestockForm } from "./components/RestockForm"
import { CheckoutForm } from "./components/CheckoutForm"

const api = axios.create({
  baseURL: "http://localhost:3000",
})

export function App() {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const response = await api.get("/api/dashboard")
      setProducts(response.data.data)
    } catch (err: any) {
      console.error("Failed to fetch products", err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const skus = [...new Set(products.map((product) => product.sku))]

  return (
    <div className="App p-6">
      <div className="flex gap-2.5">
        <CreateProductForm onProductAdded={getProducts} />
        <RestockForm productSKUs={skus} />
        <CheckoutForm productSKUs={skus} />
      </div>
      <div className="my-4"></div>
      <ProductsTable products={products} />
    </div>
  )
}
