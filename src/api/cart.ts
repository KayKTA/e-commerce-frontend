import { api } from "./client";
import type { Cart } from "../types/cart";

export async function getCart() {
    const { data } = await api.get<Cart>("/cart");
    return data;
}

export async function addToCart(productId: number, quantity = 1) {
    const { data } = await api.post<Cart>("/cart/items", { productId, quantity });
    return data;
}

export async function setCartQuantity(productId: number, quantity: number) {
    const { data } = await api.patch<Cart>(`/cart/items/${productId}`, { quantity });
    return data;
}

export async function removeFromCart(productId: number) {
    const { data } = await api.delete<Cart>(`/cart/items/${productId}`);
    return data;
}
