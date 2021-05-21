import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Document } from 'src/app/models/document';
import { Movement } from 'src/app/models/movement';
import { Person } from 'src/app/models/person';
import { Product } from 'src/app/models/product';
import { TypeMovement } from 'src/app/models/type-movement';
import { TypePerson } from 'src/app/models/type-person';
import { Warehouse } from 'src/app/models/warehouse';
import { DocumentService } from 'src/app/services/document.service';
import { MovementService } from 'src/app/services/movement.service';
import { PersonService } from 'src/app/services/person.service';
import { ProductService } from 'src/app/services/product.service';
import { TypeMovementService } from 'src/app/services/type-movement.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-movement-dialog',
  templateUrl: './movement-dialog.component.html',
  styleUrls: ['./movement-dialog.component.scss']
})
export class MovementDialogComponent implements OnInit {

  typeMovements: TypeMovement[];
  typeMovement: TypeMovement = {} as TypeMovement;
  typeDocumentName: string = "";
  typePersonName: string = "";
  document: Document;
  people: Person[];
  person: Person = {} as Person;
  peopleByTypePerson: Person[];
  movements: Movement[];
  products: Product[];
  warehouses: Warehouse[];

  constructor(public typeMovementService: TypeMovementService,
    public productService: ProductService,
    public movementService: MovementService,
    public documentService: DocumentService,
    public warehouseService: WarehouseService,
    public personService: PersonService,
    public dialogRef: MatDialogRef<MovementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movement) {
    }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.typeMovements = await this.typeMovementService.getAll().toPromise();
    this.people = await this.personService.getAll().toPromise();
    this.products = await this.productService.getAll().toPromise();
    this.warehouses = await this.warehouseService.getAll().toPromise();

  }

  onChangeTypeMovement(idTypeMovement) {
    this.typeMovement = this.typeMovements.find(t=>t.id == idTypeMovement);
    this.typeDocumentName = this.typeMovement.typeDocument.name;
    this.typePersonName = this.typeMovement.typeDocument.typePerson.toString();
    this.document = {
      dateDocument: new Date(),
      description: "",
      typeDocument: this.typeMovement.typeDocument
    } as Document;
    this.peopleByTypePerson = 
      this.filterPeopleByType(this.people, this.typeMovement.typeDocument.typePerson);
  }

  filterPeopleByType(people: Person[], typePerson: TypePerson): Person[] {
    switch(typePerson) {
      case TypePerson.CLIENTE:
        return people.filter(p => p.isCustomer == true);
      case TypePerson.EMPLEADO:
        return people.filter(p => p.isEmployed == true);
      case TypePerson.PROVEEDOR:
        return people.filter(p => p.isSupplier == true);
    }
    return [];
  }

  onChangePerson() {
    this.document.person = this.person;
  }

  addMovement() {
    if (!this.movements) this.movements = [];
    const movement = {
      value: 0,
      warehouse: {} as Warehouse,
      typeMovement: this.typeMovement,
      product: {} as Product,
      document: this.document,
      quantity: 0,
    } as Movement;
    this.movements = [...this.movements, movement];
  }

  removeMovementByIndex(index: number) {
    this.movements.splice(index, 1);
  }

  async save() {
    if (!this.isValidSave) return;
    this.document = await this.documentService.create(this.document).toPromise();
    this.document.person = this.people.find(p=>p.id === this.person.id);
    await this.movements.forEach(async (m)=>{
        m.document = this.document
        const movement = await this.movementService.create(m).toPromise();
        m.id = movement.id;
        m.product = this.products.find(p => p.id === m.product.id);
        m.warehouse = this.warehouses.find(w => w.id === m.warehouse.id);
        return m;
    });
    //console.log(this.movements);
    this.dialogRef.close(this.movements);
  }

  get isValidSave(): boolean {
    if (!this.document.description || this.document.description === "")
      return false;
    if (!this.document.person)
      return false;
    if (!this.movements || this.movements.length == 0) return false;
    return this.movements.reduce((acc, obj) =>
    acc &&
      (obj.product.id && obj.warehouse.id && obj.value > 0 && obj.quantity > 0), true);
  }

  get total() {
    if(!this.movements) return 0;
    return this.movements.reduce((acc, obj) => acc + obj.quantity * obj.value, 0);
  }

}
