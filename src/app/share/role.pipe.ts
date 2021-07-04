import { Pipe, PipeTransform } from '@angular/core';
import { RoleEnum } from '../models/role.enum';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: any): string {
    return RoleEnum.getDescricao(value);
  }

}
