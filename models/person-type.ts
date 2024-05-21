export type PersonTypeKey = "natural" | "juristic";

export class PersonType {
  constructor(readonly key: PersonTypeKey, readonly name: string) {}

  static getData = () => {
    const data: PersonType[] = [];
    data.push(new PersonType("natural", "บุคคลธรรมดา"));
    data.push(new PersonType("juristic", "นิติบุคคล"));
    return data;
  };
}

export const personTypes = PersonType.getData();
