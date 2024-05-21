import { Json } from "./json";

export class Province {
  constructor(
    readonly id: number,
    readonly code: string,
    readonly name: string
  ) {}

  static createFromApi = (json: Json) => {
    const obj = new Province(json.id, json.code, json.name_th);
    return obj;
  };

  static createFromObject = (value: Province) => {
    const obj = new Province(value.id, value.code, value.name);
    return obj;
  };
}
