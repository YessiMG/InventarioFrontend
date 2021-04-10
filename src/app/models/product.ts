import { Brand } from "./brand";
import { TypeProduct } from "./type-product";

export interface Product {
    id: number;
    name: string;
    description: string;
    minimumPrice: number;
    maximumPrice: number;
    vatTax: number;
    consumptionTax: number;
    quantity: number;
    type: TypeProduct;
    brand: Brand;
}
