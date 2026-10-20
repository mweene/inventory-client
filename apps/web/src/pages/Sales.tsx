import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

interface SaleItem {
  item_id: number
  sku: string
  product_name: string
  quantity: number
  unit_price: number
  total_price: number
}

interface Sale {
  id: number
  total_amount: number
  created_at: string
  items: SaleItem[]
}

const api = axios.create({
  baseURL: "http://localhost:3000",
})

export function Sales() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSales = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await api.get("/api/sales")
      setSales(data.data)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to load sales history")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSales()
  }, [fetchSales])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales History</h1>
          <p className="text-sm text-muted-foreground">
            Track all completed checkout transactions and sold items.
          </p>
        </div>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading sales...</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {!loading && !error && sales.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-card text-card-foreground">
          <p className="text-muted-foreground">No sales recorded yet.</p>
        </div>
      )}

      {!loading && !error && sales.length > 0 && (
        <div className="space-y-6">
          {sales.map((sale) => (
            <div key={sale.id} className="border rounded-xl p-5 bg-card shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b">
                <div>
                  <span className="font-semibold text-base">Sale #{sale.id}</span>
                  <span className="ml-3 text-xs text-muted-foreground">
                    {new Date(sale.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-primary">
                    Total: K{sale.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="uppercase">
                    <TableHead>SKU</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead className="text-right">Total Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sale.items.map((item) => (
                    <TableRow key={item.item_id}>
                      <TableCell className="font-mono">{item.sku}</TableCell>
                      <TableCell>{item.product_name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>K{item.unit_price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium">
                        K{item.total_price.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
