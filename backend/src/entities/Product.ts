// src/entities/Product.ts
export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public price: number
  ) {}
}