import { TypeDocument } from "./type-document";
import { VirtualWarehouse } from "./virtual-warehouse";

export interface TypeMovement {
    id: number;
    name : string;
    isInput: boolean;
    typeDocument: TypeDocument;
    virtualWarehouse: VirtualWarehouse;
}
