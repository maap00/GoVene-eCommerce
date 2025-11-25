import type { JSONContent } from "@tiptap/react";

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Color {
    name: string;
    color: string;
    price: number;
}

export interface VariantsProducts {
    [x: string]: unknown;
    id: string;
    stock: number;
    price: number;
    storage: string;
    color: string;
    color_name: string;
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    slug: string;
    features: string[];
    description: Json;
    images: string[];
    created_at: string;
    variants: VariantsProducts[];
}

export interface PrepareProductData {
    id: string;
    name: string;
    brand: string;
    slug: string;
    features: string[];
    description: Json;
    images: string[];
    created_at: string;
    price: number;
    variants: VariantsProducts[];
    colors: Color[];
}

export interface ProductInput {
    name: string;
    brand: string;
    slug: string;
    features: string[];
    description: JSONContent;
    images: File[];
    variants: VariantsInput[];
}


export interface VariantsInput {
    id?: string;
    stock: number;
    price: number;
    storage: string;
    color: string;
    colorName: string;
}




