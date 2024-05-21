import { Json } from "./json";

export class User {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly name: string
  ) {}

  static createFromApi(json: Json) {
    const object = new User(json.id, json.email, json.name);

    return object;
  }

  static createFromObject(json: User) {
    const object = new User(json.id, json.email, json.name);

    return object;
  }
}
