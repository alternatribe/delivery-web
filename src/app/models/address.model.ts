export class Address {
  street: string;
  houseNumber!: string;
  reference!: string;
  district!: string;
  zip!: string;
  city!: string;
  state!: string;

  constructor(address: any) {
    this.street = address.logradouro;
    this.district = address.bairro;
    this.zip = address.cep;
    this.city = address.localidade;
    this.state = address.uf;
  }
}
