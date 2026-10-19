import React, { useCallback, useEffect, useState, type FormEvent, type InputEvent } from "react"
import axios from "axios"

import { ProductsTable } from "./components/ProductsTable"
import { CreateProductForm } from "./components/CreateProductForm"
import { RestockForm } from "./components/RestockForm"
import { CheckoutForm } from "./components/CheckoutForm"
import { Search } from "./components/Search"

const api = axios.create({
  baseURL: "http://localhost:3000",
})

export function App() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const getProducts = useCallback(async () => {
    try {
      const response = await api.get("/api/dashboard")
      setProducts(response.data.data)
    } catch (err: unknown) {
      console.error("Failed to fetch products", err)
    }
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  console.log(products)

  const skus = [...new Set(products.map((product) => product.sku))] //TODO: create better variable name

  const handleSearchTerm = (e: FormEvent<InputEvent>) => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }
  return (
    <div className="App p-6">
      <div className="flex place-items-center place-content-between gap-2.5">
        <Search value={searchTerm} onChange={handleSearchTerm}/>

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
