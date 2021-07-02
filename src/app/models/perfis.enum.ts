export enum Perfis {
  A = "A",
  C = "C",
  F = "F",
}

export namespace Perfis {
  export function getDescricao(perfil: Perfis): string {
    switch (perfil) {
      case Perfis.A:
        return 'Administrador';
      case Perfis.C:
        return 'Cliente';
      case Perfis.F:
        return 'Funcionário';
      default:
        return '';
    }
  }
}

export namespace Perfis {
  export function getIcone(perfil: Perfis): string {
    switch (perfil) {
      case Perfis.A:
        return 'command';
      case Perfis.C:
        return 'person';
      case Perfis.F:
        return 'award';
      default:
        return '';
    }
  }
}