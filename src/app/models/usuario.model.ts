import { Perfis } from './perfis.enum';
import { Situacoes } from './situacoes.enum';

export class Usuario {
  id?: string
  email?: string
  cpf?: string
  nome?: string
  senha?: string
  perfil?: Perfis
  situacao?: Situacoes
}