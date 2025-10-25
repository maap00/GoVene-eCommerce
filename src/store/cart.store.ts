import { create, type StateCreator } from "zustand";
import type { ICartItem } from "../components/shared/CartItem";
import { devtools, persist } from "zustand/middleware";

export interface CartState {
    items: ICartItem[];
    totalItemsInCart:number;
    totalAmount: number;

    addItem: (item: ICartItem) => void;
    removeItem: (variantId: string) => void;
    updateQuantity: (variantId: string, quantity: number) => void;
    cleanCart: () =>void;

}

const storeApi: StateCreator<CartState> = set => ({
    items:[],

    totalItemsInCart: 0,
    totalAmount: 0,

    addItem: (item) => set((state) => {
        const existingItemIndex = state.items.findIndex(
            i => i.variantId === item.variantId
        );
        let updateItems;

        if(existingItemIndex >= 0){
            // If item exist, upate quantity
            updateItems = state.items.map((i, index) => 
                index === existingItemIndex
                ? {
                    ...i,
                    quantity: i.quantity + item.quantity,
                }
                : i
                );                
        } else {
            // If item not exist, add new item
            updateItems = [...state.items, item];
        }

        const newTotalItems = updateItems.reduce(
            (acc, i) => acc + i.quantity, 0
        );

        const newTotalAmount = updateItems.reduce(
            (acc, i) => acc + i.price * i.quantity, 0
        );    
        
        return {
            items: updateItems,
            totalItemsInCart: newTotalItems,
            totalAmount: newTotalAmount,
        };
    }),


    removeItem: (variantId) => set((state) => {
        const updateItems = state.items.filter(
            i => i.variantId !== variantId
        );

        const newTotalItems = updateItems.reduce(
            (acc, i) => acc + i.quantity, 0
        );

        const newTotalAmount = updateItems.reduce(
            (acc, i) => acc + i.price * i.quantity, 0
        );    
        
        return {
            items: updateItems,
            totalItemsInCart: newTotalItems,
            totalAmount: newTotalAmount,
        };
        
    
    }),

    updateQuantity: (variantId, quantity) => set((state) => {
        const updateItems = state.items.map( i =>
            i.variantId === variantId ? { ...i, quantity } : i
        );
        
        const newTotalItems = updateItems.reduce(
            (acc, i) => acc + i.quantity, 0
        );

        const newTotalAmount = updateItems.reduce(
            (acc, i) => acc + i.price * i.quantity, 0
        );    
        
        return {
            items: updateItems,
            totalItemsInCart: newTotalItems,
            totalAmount: newTotalAmount,
        };
    }),
    
    cleanCart: () => set({items: [], totalItemsInCart: 0, totalAmount: 0}),
});

export const useCartStore = create<CartState>()(
    devtools(
        persist(storeApi, {
            name: 'cart-store',
        }) 
));