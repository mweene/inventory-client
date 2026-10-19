import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

export function ProductsTable({ products }) {
  return (
    <div>
      <Table className="border">
        <TableHeader role="rowgroup" className="block [scrollbar-gutter-stable] overflow-y-hidden [&_tr]:table [&_tr]:w-full [&_tr]:table-fixed">
          <TableRow role="row" className="uppercase">
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
        <TableBody role="rowgroup" className="block max-h-[470px] overflow-y-auto [scrollbar-gutter-stable] [&_tr]:table [&_tr]:w-full [&_tr]:table-fixed">
          {products.map((product) => (
            <TableRow role="row" key={product.id}>
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
    </div>
  )
}
