import { genders } from "./gender";
import { personTypes } from "./person-type";

export class RadioOption {
  constructor(
    readonly id: number,
    readonly label: string,
    readonly value: string
  ) {}

  static createYesNoRadioOptions = () => {
    const data: RadioOption[] = [];
    let index = 0;
    data.push(new RadioOption(index++, "ใช่", "true"));
    data.push(new RadioOption(index++, "ไม่ใช่", "false"));
    return data;
  };

  static createPersonTypeRadioOptions = () => {
    const data: RadioOption[] = [];
    let index = 0;
    for (const personType of personTypes) {
      data.push(new RadioOption(index++, personType.name, personType.key));
    }
    return data;
  };

  static createGenderRadioOptions = () => {
    const data: RadioOption[] = [];
    let index = 0;
    for (const gender of genders) {
      data.push(new RadioOption(index++, gender.name, gender.key));
    }
    return data;
  };
}

export const personTypeRadioOptions =
  RadioOption.createPersonTypeRadioOptions();

export const gendersRadioOptions = RadioOption.createGenderRadioOptions();

export const yesNoRadioOptions = RadioOption.createYesNoRadioOptions();
