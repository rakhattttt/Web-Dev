import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<button (click)="greet()">
    <section (mouseover)="showSecretMessage()">
      There's a secret message for you, hover to reveal 👀
      {{ message }}
    </section>
  `,

})
export class App {
  message = '';

  showSecretMessage() {
    this.message = 'Way to go 🚀';
    
  }
  greet() {
    console.log('Hello, there 👋')
}
}
