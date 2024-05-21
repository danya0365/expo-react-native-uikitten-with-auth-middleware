export type GenderKey = "male" | "female" | "unknown";

export class Gender {
  constructor(readonly key: GenderKey, readonly name: string) {}

  static getData = () => {
    const data: Gender[] = [];
    data.push(new Gender("male", "ชาย"));
    data.push(new Gender("female", "หญิง"));
    data.push(new Gender("unknown", "ไม่ระบุ"));
    return data;
  };
}

export const genders = Gender.getData();
