import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Button } from "@workspace/ui/components/button"
import { ChevronUp, ChevronDown } from "lucide-react"

export function ProductsTable({ products }) {
  return (
    <div>
      <Table className="border">
        <TableHeader>
          <TableRow className="uppercase">
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
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>K{product.price}</TableCell>
              <TableCell>K{product.unit_cost}</TableCell>
              <TableCell>{product.qty_received}</TableCell>
              <TableCell>{product.qty_remaining}</TableCell>
              <TableCell>{product.created_at.split(" ")[0]}</TableCell>
            </TableRow>
          ))}
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
