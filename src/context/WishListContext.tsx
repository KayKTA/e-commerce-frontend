import { createContext, useContext, useMemo } from "react";
import { useWishlist } from "../hooks/useWishlist";

const WishCtx = createContext<ReturnType<typeof useWishlist> | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const wish = useWishlist(true);
    const value = useMemo(() => wish, [wish.wishlist, wish.loading, wish.mutating, wish.error]);
    return <WishCtx.Provider value={value}>{children}</WishCtx.Provider>;
}

export function useWishlistContext() {
    const ctx = useContext(WishCtx);
    if (!ctx) throw new Error("useWishlistContext must be used within WishlistProvider");
    return ctx;
}
