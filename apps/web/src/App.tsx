import { useState, type ChangeEvent } from "react"
import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
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

export function App() {
    return (
    <div className="App p-6">
      <FieldDemo />
    </div>
  )
}

export function FieldDemo() {
  const [stock, setStock] = useState<ProductWithStock>({
    sku: '',
    name: '',
    category: '',
    price: '',
    qty_received: '',
    qty_remaining: '',
    unit_cost: ''
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.id)
    setStock({
      ...stock, 
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e:SubmitEvent) => {
    e.preventDefault()
    console.log(stock)
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={(e) => handleSubmit(e)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>create new stock</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="sku">
                  Sku
                </FieldLabel>
                <Input
                  id="sku"
                  placeholder="ORAIMO-TYPEC-CBL"
                  value={stock.sku}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <FieldDescription>
                  stock keeping unit
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="name">
                  Name
                </FieldLabel>
                <Input
                  id="name"
                  placeholder="iphoneX case"
                  value={stock.name}
                  onChange={(e) => handleChange(e)}
                  required
                /> 
              </Field> 
              <FieldSelect />

              <Field>
                <FieldLabel htmlFor="price">
                  Price
                </FieldLabel>
                <Input
                  id="price"
                  placeholder="K100.00"
                  value={stock.price}
                  onChange={(e) => handleChange(e)}
                  required
                /> 
                <FieldDescription>
                  what the customer pays
                </FieldDescription>
              </Field> 
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
                placeholder="200"
                value={stock.qty_received}
                onChange={(e) => handleChange(e)}
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
                value={stock.qty_remaining}
                onChange={(e) => handleChange(e)}
                placeholder="200"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="unit_cost">
                Unit cost
              </FieldLabel>
              <Input
                type="number"
                id="unit_cost"
                placeholder="K70"
                value={stock.unit_cost}
                onChange={(e) => handleChange(e)}
                required
              />
              <FieldDescription>
                what you paid to the supplier
              </FieldDescription>
            </Field>
          </FieldGroup>

          <Field orientation="horizontal">
            <Button type="submit">Create stock</Button>
            <Button 
              variant="outline" 
              type="button"
            >
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}


const items = [
  { label: "Choose product category", value: null },
  { label: "Cabel", value: "cabel" },
  { label: "Pouch", value: "pouch" },
  { label: "Charger", value: "charger" },
  { label: "Earpods", value: "earpods" },
  { label: "Headsets", value: "cabel heasets" },
  { label: "Mouse", value: "mouse" },
  { label: "Battery", value: "battery" },
]

function FieldSelect() {
  return (
    <Field className="w-full">
      <FieldLabel>Category</FieldLabel>
      <Select items={items}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription>
        Select product category
      </FieldDescription>
    </Field>
  )
}

