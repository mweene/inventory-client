import { Input } from "@workspace/ui/components/input"
import { FieldLabel, FieldGroup } from "@workspace/ui/components/field"
export function Search({value, onChange}) {
  return (
    <>
      <FieldGroup className="inline w-100">
        <FieldLabel htmlFor="search"></FieldLabel>
        <Input
          id="search"
          name="search"
          placeholder="Search product by sku/name"
          value={value}
          onChange={onChange}
        />
      </FieldGroup>
    </>
  )
}
