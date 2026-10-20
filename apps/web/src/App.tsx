import { useCallback, useEffect, useState, type FormEvent, type InputEvent } from "react"
import axios from "axios"
import { Outlet } from "react-router-dom"
import { ProductsTable } from "./components/ProductsTable"
import { CreateProductForm } from "./components/CreateProductForm"
import { RestockForm } from "./components/RestockForm"
import { CheckoutForm } from "./components/CheckoutForm"
import { Search } from "./components/Search"
import { BackupDB } from "./components/BackupDB"
import { Toaster } from "@workspace/ui/components/toast"
import { AppSidebar } from "./components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar"

const api = axios.create({
  baseURL: "http://localhost:3000",
})

export function App() {
  const [products, setProducts] = useState<any[]>([])
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

  const searchedProducts = products.filter(p =>
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const skus = [...new Set(products.map((product) => product.sku))]

  const handleSearchTerm = (e: any) => {
    setSearchTerm(e.target.value)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center gap-4 mb-4">
            <SidebarTrigger />
            <div className="flex-1">
              <div className="flex place-items-center place-content-between gap-2.5">
                <Search value={searchTerm} onChange={handleSearchTerm}/>

                <div className="flex gap-2.5">
                  <CreateProductForm onProductAdded={getProducts}/>
                  <RestockForm productSKUs={skus} onRestock={getProducts}/>
                  <CheckoutForm productSKUs={skus} onCheckout={getProducts} />
                  <BackupDB />
                </div>
              </div>
            </div>
          </div>

          <div className="my-4"></div>
          <Outlet context={{ searchedProducts, getProducts, skus, searchTerm }} />

          <Toaster />
        </main>
      </div>
    </SidebarProvider>
  )
}
