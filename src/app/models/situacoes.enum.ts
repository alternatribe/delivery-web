export enum Situacoes {
  A = "A",
  I = "I"
}

export namespace Situacoes {
  export function getDescricao(situacao: Situacoes): string {
    switch (situacao) {
      case Situacoes.A:
        return 'Ativo';
      case Situacoes.I:
        return 'Inativo';
      default:
        return '';
    }
  }
}