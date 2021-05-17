import { TypePerson } from "./type-person";

export interface TypeDocument {
    id: number;
    name: string;
    typePerson: TypePerson;
}
