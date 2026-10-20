import React, { useState, type ChangeEvent } from "react"
import { api } from "../utils/api"

import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@workspace/ui/components/field"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { Input } from "@workspace/ui/components/input"
import { FieldSelect } from "./FieldSelect"

type ProductWithStock = {
  sku: string
  name: string
  category: string
  price: number | string
  qty_received: number | string
  qty_remaining: number | string
  unit_cost: number | string
}

interface CreateProductProps {
  onProductAdded: () => Promise<void>
}

export function RestockForm({ productSKUs, onRestock }) {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string|null>(null)
  const [data, setData] = useState({
    sku: "",
    unit_cost: "",
    qty_received: "",
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleValueChange = (value:string) => {
    setData({
      ...data,
      sku: value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await api.post('/api/inventory/restock', data)
      setOpen(false)

      setData({
        sku: "",
        unit_cost: "",
        qty_received: ""
      })

      await onRestock()
    } catch(err:any) {
      console.error(err)
      setError('something is wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="outline">Restock</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Restock</SheetTitle>
          <SheetDescription>Enter details for a new product</SheetDescription>
        </SheetHeader>

        <form className="p-4" onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <FieldSelect 
                  onValueChange={handleValueChange}
                  skus={productSKUs} 
                />

                <Field>
                  <FieldLabel htmlFor="sku">Unit cost</FieldLabel>
                  <Input
                    id="unit_cost"
                    name="unit_cost"
                    placeholder="K00.00"
                    type="number"
                    value={data.unit_cost}
                    onChange={handleChange}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="price">Qty received</FieldLabel>
                  <Input
                    id="qty_received"
                    name="qty_received"
                    placeholder="100"
                    type="number"
                    value={data.qty_received}
                    onChange={handleChange}
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <SheetFooter>
              <Field orientation="horizontal">
                <Button type="submit">Create stock</Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </Field>
            </SheetFooter>
          </FieldGroup>
        </form>
      </SheetContent>
    </Sheet>
  )
}
