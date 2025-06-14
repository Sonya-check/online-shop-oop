// src/entities/User.ts
export class User {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public role: 'ADMIN' | 'CUSTOMER'
  ) {}
}