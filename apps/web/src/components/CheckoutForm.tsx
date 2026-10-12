import { useState, type ChangeEvent } from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
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


export function CheckoutForm() {
  const [open, setOpen] = useState(false)


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Checkout</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Checkout Form</SheetTitle>
          <SheetDescription>Enter details for a new product</SheetDescription>
        </SheetHeader>

        <form  className="p-4">
          <FieldGroup>
            <FieldSelect />
            <Field>
              <FieldLabel htmlFor="qty_received">
                Quantity
              </FieldLabel>
              <Input
                type="number"
                id="qty_received"
                name="qty_received"
                placeholder="5"
                required
              />
            </Field>

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
      <FieldLabel>Product sku</FieldLabel>
      <Select name="category">
        <SelectTrigger id="category">
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

