import { api } from "./client";
import type { Product } from "../types/product";

export type CreateProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">; // Exclude fields that are auto-generated
export type UpdateProductInput = Partial<CreateProductInput>; // All fields optional for update

// Public functions
export async function getProducts() {
    const { data } = await api.get<Product[]>("/products");
    return data;
}

export async function getProductById(id: string) {
    console.log("[API] GET /products/" + id);
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
}

// Admin functions
export async function createProduct(payload: CreateProductInput) {
    const { data } = await api.post<Product>("/products", payload);
    return data;
}

export async function updateProduct(id: number, payload: UpdateProductInput) {
    const { data } = await api.put<Product>(`/products/${id}`, payload);
    return data;
}

export async function deleteProduct(id: number) {
    await api.delete(`/products/${id}`);
}
