import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Button } from "@workspace/ui/components/button"
import { ChevronUp, ChevronDown, ChevronRight, Layers } from "lucide-react"

export function ProductsTable({ products }) {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({})

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div>
      <Table className="border">
        <TableHeader role="rowgroup" className="">
          <TableRow role="row" className="uppercase">
            <TableHead className="w-10"></TableHead>
            <TableHead>id</TableHead>
            <TableHead>sku</TableHead>
            <TableHead>name</TableHead>
            <TableHead>category</TableHead>
            <TableHead>price</TableHead>
            <TableHead>unit cost</TableHead>
            <TableHead>qty received</TableHead>
            <TableHead>qty remaining</TableHead>
            <TableHead>created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody role="rowgroup" className="max-h-[470px] overflow-y-auto [scrollbar-gutter-stable]">
          {products.map((product) => {
            const isExpanded = !!expandedRows[product.id]
            const hasLots = product.lots && product.lots.length > 0

            return (
              <>
                <TableRow key={product.id} className="cursor-pointer hover:bg-muted/50" onClick={() => hasLots && toggleRow(product.id)}>
                  <TableCell>
                    {hasLots && (
                      <Button size="icon-xs" variant="ghost" className="h-6 w-6 p-0">
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell className="font-mono">{product.sku}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>K{Number(product.price).toFixed(2)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1">
                      K{Number(product.unit_cost).toFixed(2)}
                      {hasLots && product.lots.length > 1 && (
                        <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full" title={`${product.lots.length} batches`}>
                          {product.lots.length} batches
                        </span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>{product.qty_received}</TableCell>
                  <TableCell>{product.qty_remaining}</TableCell>
                  <TableCell>{product.created_at ? product.created_at.split(" ")[0] : "N/A"}</TableCell>
                </TableRow>

                {isExpanded && hasLots && (
                  <TableRow key={`lots-${product.id}`} className="bg-muted/30">
                    <TableCell colSpan={10} className="p-4">
                      <div className="rounded-lg border bg-card p-3 shadow-inner">
                        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase text-muted-foreground">
                          <Layers className="h-3.5 w-3.5" />
                          <span>Restock Batches (Lots) for {product.name} ({product.sku})</span>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow className="text-xs uppercase">
                              <TableHead>Lot ID</TableHead>
                              <TableHead>Qty Received</TableHead>
                              <TableHead>Qty Remaining</TableHead>
                              <TableHead>Unit Cost</TableHead>
                              <TableHead>Batch Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {product.lots.map((lot: any) => (
                              <TableRow key={lot.id} className="text-xs">
                                <TableCell className="font-mono">#{lot.id}</TableCell>
                                <TableCell>{lot.qty_received}</TableCell>
                                <TableCell className="font-medium">{lot.qty_remaining}</TableCell>
                                <TableCell className="text-primary font-semibold">K{Number(lot.unit_cost).toFixed(2)}</TableCell>
                                <TableCell>{lot.created_at ? lot.created_at.split(" ")[0] : "N/A"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )
          })}
        </TableBody>
      </Table>

      <div className="flex place-items-center mt-4 place-content-between">
        <div className="flex gap-2">
          <Button variant="outline"><ChevronUp /></Button>
          <Button variant="outline"><ChevronDown /></Button>
        </div>
        <p>Page 1 of 10</p>
      </div>
    </div>
  )
}
