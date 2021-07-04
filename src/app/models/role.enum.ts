export enum RoleEnum {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_EMPLOYEE = 'ROLE_EMPLOYEE',
  ROLE_CLIENT = 'ROLE_CLIENT'
}

export namespace RoleEnum {
  export function getDescricao(role: RoleEnum): string {
    switch (role) {
      case RoleEnum.ROLE_ADMIN: return 'Administrador';
      case RoleEnum.ROLE_EMPLOYEE: return 'Funcionário';
      case RoleEnum.ROLE_CLIENT: return 'Cliente';
      default: return '';
    }
  }
}
