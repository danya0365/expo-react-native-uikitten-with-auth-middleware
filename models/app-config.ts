import { Json } from "./json";

export class AppConfig {
  constructor(readonly configurations: Record<string, string | boolean> = {}) {}

  static createFromDB = (configurationValues: Json[]) => {
    let configurations: Json = {};
    for (const configurationValue of configurationValues) {
      let value: string | boolean = configurationValue.value;
      if (configurationValue.value_type === "boolean") {
        value =
          configurationValue.value === "true" ||
          configurationValue.value === "1"
            ? true
            : false;
      }
      configurations[configurationValue.slug] = value;
    }
    const obj = new AppConfig(configurations);
    return obj;
  };

  static createFromObject = (value: AppConfig) => {
    const obj = new AppConfig(value.configurations);
    return obj;
  };
}
