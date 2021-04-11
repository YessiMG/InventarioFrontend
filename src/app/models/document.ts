import { Person } from "./person";
import { TypeDocument } from "./type-document";

export interface Document {
    id: number;
    dateDocument: Date;
    typeDocument: TypeDocument;
    person: Person;
}
