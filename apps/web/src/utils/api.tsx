import axios from "axios"

const api = axios.create({
  baseURL: "https://localhost:3000",
})

export const getproducts = async () => api.get("/api/products")
export const getproductsWithStock = async () =>
  api.get("/api/productsWithStock")
export const postProductsWithStock = async (data) =>
  api.post("/api/productsWithStock", data)
