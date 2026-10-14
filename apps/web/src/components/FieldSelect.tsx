import { Field, FieldLabel } from "@workspace/ui/components/field"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@workspace/ui/components/select"

export const FieldSelect = ({ skus, onValueChange }) => {
  const items = [{ label: "Choose product sku", value: null }]
  skus.forEach((sku) => {
    items.push({ label: sku, value: sku })
  })
  return (
    <Field className="w-full">
      <FieldLabel>Product sku</FieldLabel>
      <Select name="sku" onValueChange={onValueChange} required>
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
