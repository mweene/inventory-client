import { useState } from "react"
import { Field, FieldLabel, FieldGroup } from "@workspace/ui/components/field"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@workspace/ui/components/dialog"
import { FieldSelect } from "./FieldSelect"
import axios from "axios"

export function CheckoutForm({ productSKUs }) {
  const [isOpen, setIsOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [product, setProduct] = useState({
    sku: "",
    quantity: "",
  })
  const [productsList, setProductsList] = useState([])

  const handleOpenChange = (open:boolean) => {
    if(submitting) return
    setIsOpen(open)
    if(!open) setError(null)
  }

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(product).length < 1) return

    setProductsList([...productsList, product])
    setProduct({
      sku: "",
      quantity: "",
    })
  }

  const onValueChange = (value) => {
    setProduct({
      ...product,
      sku: value,
    })
  }

  const handleCheckout = async () => {
    setSubmitting(true)
    setError(null)
    try {
      await axios.post("http://localhost:3000/api/sales", {
        items: productsList,
      })
      setProductsList([])
      setIsOpen(false)
    } catch (err: any) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message ?? err.message
        : 'something went wrong'
      setError(message)
      console.error("failed to make sale", message)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <div className="content">
        <DialogTrigger render={<Button onClick={() => setIsOpen(true)} variant="outline">Checkout</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checkout (sales) Form</DialogTitle>
            <DialogDescription>Record sales using this form</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldSelect skus={productSKUs} onValueChange={onValueChange} />
              </Field>

              <Field>
                <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  placeholder="2"
                  value={product.quantity}
                  onChange={handleChange}
                  required
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Button type="submit" className="mt-4">
                Add item
              </Button>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </FieldGroup>
          </form>

          {productsList.length > 0 && <CheckoutTable data={productsList} />}
          <DialogFooter>
            <Button type="submit" onClick={handleCheckout} disabled={submitting}>
              {submitting ? "Saving..." : "Complete checkout"}
            </Button>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  )
}

const CheckoutTable = ({ data }) => {
  return (
    <div>
      <Table className="mt-6 border">
        <TableHeader className="uppercase">
          <TableRow>
            <TableHead>sku</TableHead>
            <TableHead>name</TableHead>
            <TableHead>quantity</TableHead>
            <TableHead>price</TableHead>
            <TableHead>action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="">
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              K
              {data
                .map((item) => item.quantity)
                .reduce((acc, val) => Number(acc) + Number(val))}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
