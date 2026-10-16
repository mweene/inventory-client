import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import { ProductsTable } from "./components/ProductsTable"
import { CreateProductForm } from "./components/CreateProductForm"
import { RestockForm } from "./components/RestockForm"
import { CheckoutForm } from "./components/CheckoutForm"
import { FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

const api = axios.create({
  baseURL: "http://localhost:3000",
})

export function App() {
  const [products, setProducts] = useState([])

  const getProducts = useCallback(async () => {
    try {
      const response = await api.get("/api/dashboard")
      setProducts(response.data.data)
    } catch (err: any) {
      console.error("Failed to fetch products", err)
    }
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  const skus = [...new Set(products.map((product) => product.sku))] //TODO: create better variable name

  return (
    <div className="App p-6">
      <div className="flex place-items-center place-content-between gap-2.5">
        <FieldGroup className="w-[30ch]">
          <FieldLabel htmlFor="product"></FieldLabel>
          <Input id="product" name="product" placeholder="search by name/sku"/>
        </FieldGroup>

        <div className="flex gap-2.5">
          <CreateProductForm onProductAdded={getProducts}/>
          <RestockForm productSKUs={skus} onRestock={getProducts}/>
          <CheckoutForm productSKUs={skus} onCheckout={getProducts}/>
        </div>
      </div>
      <div className="my-4"></div>
      <ProductsTable products={products} />
    </div>
  )
}
