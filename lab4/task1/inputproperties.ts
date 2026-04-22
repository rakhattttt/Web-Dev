import {Component, input} from '@angular/core';

@Component({
  selector: 'app-user',
  template: `<p>The user's occupation is {{occupation()}}</p><app-user occupation="Angular Developer"></app-user>`,
})
export class User {
    occupation = input<string>();
}
