import {Component, output} from '@angular/core';

@Component({
  selector: 'app-child',
  styles: `
    .btn {
      padding: 5px;
    }
  `,
  template: `<app-child (addItemEvent)="addItem($event)" /> <button class="btn" (click)="addItem()">Add Item</button> `,
})
export class Child {
    
  addItemEvent = output<string>();
  addItem() {
  this.addItemEvent.emit('🐢');
}
}
