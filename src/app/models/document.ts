import { Person } from "./person";
import { TypeDocument } from "./type-document";

export interface Document {
    id: number;
    dateDocument: Date;
    description: string;
    typeDocument: TypeDocument;
    person: Person;
}
