import { api } from "./client";
import type { Wishlist } from "../types/wishlist";

export async function getWishlist() {
    const { data } = await api.get<Wishlist>("/wishlist");
    return data;
}

export async function addToWishlist(productId: number) {
    const { data } = await api.post<Wishlist>("/wishlist/items", { productId });
    return data;
}

export async function removeFromWishlist(productId: number) {
    const { data } = await api.delete<Wishlist>(`/wishlist/items/${productId}`);
    return data;
}
