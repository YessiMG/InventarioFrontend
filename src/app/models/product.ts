import { TypeProduct } from "./type-product";

export interface Product {
    id:number;
    name:string;
    description:string;
    minimunPrice:number;
    maximunPrice:number;
    vatTax:number;
    consumptionTax:number;
    quatity:number;
    type: TypeProduct;
    //brand: Brand;
}
