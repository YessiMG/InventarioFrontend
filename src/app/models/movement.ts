import { Document } from "./document";
import { Product } from "./product";
import { TypeMovement } from "./type-movement";
import { Warehouse } from "./warehouse";

export interface Movement {
    id: number;
    value: number;
    warehouse: Warehouse;
    typeMovement: TypeMovement;
    product: Product;
    document: Document;
    quantity: number;
}
