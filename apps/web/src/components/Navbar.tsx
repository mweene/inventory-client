import { Link, useLocation } from "react-router-dom"

export function Navbar() {
  const location = useLocation()
  return (
    <div>
      <Link to={"/"}>products</Link>
      <Link to={"/sales"}>sales</Link>
    </div>
  )
}
