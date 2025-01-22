export interface Product {
    cost: number;
    description: string;
    id: number;
    name: string;
    profile: {
        type: string;
    };
    sku: string;
}