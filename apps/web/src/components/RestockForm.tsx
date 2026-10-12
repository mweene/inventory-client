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
  onProductAdded: () => Promise<void>;
}


export function RestockForm() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    sku: "",
    unit_cost: "",
    qty_received: ""
  })

  const handleSubmit = async (e:SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    console.log('submitting data:', data)
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
                  <FieldSelect />
                  
                  <Field>
                    <FieldLabel htmlFor="sku">Unit cost</FieldLabel>
                    <Input
                      id="unit_cost"
                      name="unit_cost"
                      placeholder="K00.00"
                      type="number"
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


function FieldSelect() {
  const items = [
    { label: "Choose product sku", value: null },
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
      <FieldLabel>Product sku</FieldLabel>
      <Select name="sku">
        <SelectTrigger id="sku">
          <SelectValue placeholder="Choose product sku" />
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

