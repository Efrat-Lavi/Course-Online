import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icons',
  standalone: true
})
export class IconsPipe implements PipeTransform {

  private icons = ['➕', ''];
  transform(value: string): any {
    switch (value) {
      case 'add':
        return this.icons[0];
      default:
        return this.icons[1];
    }
  }
}