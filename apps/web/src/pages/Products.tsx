import { useOutletContext } from "react-router-dom"
import { ProductsTable } from "../components/ProductsTable"

export function Products() {
  const { searchedProducts } = useOutletContext<{ searchedProducts: any[] }>()

  return (
    <div>
      <ProductsTable products={searchedProducts} />
    </div>
  )
}
