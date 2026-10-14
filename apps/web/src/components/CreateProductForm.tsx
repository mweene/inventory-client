import React, { useState, type ChangeEvent } from "react"
import axios from "axios"

import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@workspace/ui/components/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
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

export function CreateProductForm({ onProductAdded }: CreateProductProps) {
  const [stock, setStock] = useState<ProductWithStock>({
    sku: "",
    name: "",
    category: "",
    price: "",
    qty_received: "",
    qty_remaining: "",
    unit_cost: "",
  })
  const [open, setOpen] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStock({
      ...stock,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const response = await axios.post(
        "http://localhost:3000/api/productWithStock",
        data
      )

      if (response.status === 201) {
        await onProductAdded()

        setOpen(false)

        setStock({
          sku: "",
          name: "",
          category: "",
          price: "",
          qty_received: "",
          qty_remaining: "",
          unit_cost: "",
        })
      }
    } catch (err) {
      console.error("Failed to submit new product:", err)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add new stock</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new stock</SheetTitle>
          <SheetDescription>Enter details for a new product</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="p-4">
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="sku">Sku</FieldLabel>
                    <Input
                      id="sku"
                      name="sku"
                      placeholder="ORAIMO-TYPEC-CBL"
                      value={stock.sku}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      placeholder="iphoneX case"
                      value={stock.name}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <FieldSelect />

                  <Field>
                    <FieldLabel htmlFor="price">Price</FieldLabel>
                    <Input
                      id="price"
                      name="price"
                      placeholder="K100.00"
                      value={stock.price}
                      onChange={handleChange}
                      required
                    />
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="qty_received">
                  Quantity received
                </FieldLabel>
                <Input
                  type="number"
                  id="qty_received"
                  name="qty_received"
                  placeholder="200"
                  value={stock.qty_received}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="qty_remaining">
                  Quantity remaining
                </FieldLabel>
                <Input
                  type="number"
                  id="qty_remaining"
                  name="qty_remaining"
                  value={stock.qty_remaining}
                  onChange={handleChange}
                  placeholder="200"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="unit_cost">Unit cost</FieldLabel>
                <Input
                  type="number"
                  id="unit_cost"
                  name="unit_cost"
                  placeholder="K70"
                  value={stock.unit_cost}
                  onChange={handleChange}
                  required
                />
              </Field>
            </FieldGroup>

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

function FieldSelect() {
  const items = [
    { label: "Choose product category", value: null },
    { label: "Cable", value: "cable" },
    { label: "Pouch", value: "pouch" },
    { label: "Charger", value: "charger" },
    { label: "Earpods", value: "earpods" },
    { label: "Headsets", value: "cable headsets" },
    { label: "Mouse", value: "mouse" },
    { label: "Battery", value: "battery" },
  ]
  return (
    <Field className="w-full">
      <FieldLabel>Category</FieldLabel>
      <Select name="category">
        <SelectTrigger id="category">
          <SelectValue placeholder="Choose product category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value ?? "empty"} value={item.value ?? ""}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
