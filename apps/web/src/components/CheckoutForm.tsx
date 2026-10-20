import React, { useState, useEffect } from "react"
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
import { X } from "lucide-react"
import axios from "axios"

interface CheckoutItem {
  sku: string
  quantity: number
  price: number
}
import { api } from "../utils/api"

export function CheckoutForm({ 
  productSKUs, 
  onCheckout 
}: {
  productSKUs: string[]
  onCheckout: () => void | Promise<void>
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedSku, setSelectedSku] = useState("")
  const [quantity, setQuantity] = useState("")
  const [productsList, setProductsList] = useState<CheckoutItem[]>([])
  const [productsCatalog, setProductsCatalog] = useState<any[]>([])

  useEffect(() => {
    if (isOpen) {
      api.get("/api/dashboard").then((res) => {
        setProductsCatalog(res.data.data)
      }).catch(console.error)
    }
  }, [isOpen])

  const handleOpenChange = (open: boolean) => {
    if (submitting) return
    setIsOpen(open)
    if (!open) {
      setError(null)
      setProductsList([])
    }
  }

  const onAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSku || !quantity) return

    // Find product price from catalog or fetch by SKU
    let unitPrice = 0
    const found = productsCatalog.find((p) => p.sku === selectedSku)
    if (found) {
      unitPrice = found.price
    } else {
      try {
        const { data } = await api.get(`/api/products/${selectedSku}`)
        unitPrice = data.data.price
      } catch (err) {
        console.error("Failed to fetch product price", err)
      }
    }

    const newItem: CheckoutItem = {
      sku: selectedSku,
      quantity: Number(quantity),
      price: unitPrice,
    }

    setProductsList([...productsList, newItem])
    setSelectedSku("")
    setQuantity("")
  }

  const onDeleteItem = (sku: string) => {
    const result = productsList.filter(p => p.sku !== sku)
    setProductsList(result)
  }

  const handleCheckout = async () => {
    setSubmitting(true)
    setError(null)
    try {
      await api.post("/api/sales", {
        items: productsList,
      })
      setProductsList([])
      setIsOpen(false)

      await onCheckout()
    } catch (err: any) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.response?.data?.error || err.message
        : 'something went wrong'
      setError(message)
      console.error("failed to make sale", message)
    } finally {
      setSubmitting(false)
    }
  }

  const grandTotal = productsList.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <div className="content">
        <DialogTrigger render={<Button onClick={() => setIsOpen(true)} variant="outline">Checkout</Button>} />
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Checkout (sales) Form</DialogTitle>
            <DialogDescription>Record sales using this form</DialogDescription>
          </DialogHeader>
          <form onSubmit={onAddItem}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldSelect skus={productSKUs} onValueChange={(val) => setSelectedSku(val)} />
              </Field>

              <Field>
                <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  placeholder="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
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

          {productsList.length > 0 && (
            <div className="max-h-60 overflow-y-auto mt-4 border rounded-lg">
              <Table>
                <TableHeader className="uppercase sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {productsList.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{item.sku}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>K{item.price.toFixed(2)}</TableCell>
                      <TableCell className="font-medium">K{(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button size="icon-xs" variant="ghost" onClick={() => onDeleteItem(item.sku)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="sticky bottom-0 bg-background z-10">
                  <TableRow>
                    <TableCell colSpan={3}>Grand Total</TableCell>
                    <TableCell colSpan={2} className="text-right font-bold text-primary">
                      K{grandTotal.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button type="button" onClick={handleCheckout} disabled={submitting || productsList.length === 0}>
              {submitting ? "Saving..." : "Complete checkout"}
            </Button>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  )
}
