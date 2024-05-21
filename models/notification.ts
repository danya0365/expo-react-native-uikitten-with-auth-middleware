import { DateHelper } from "@/helpers/date";
import { Json } from "./json";

export type NotificationType =
  | "general"
  | "saving-benefit"
  | "loan-application"
  | "saving-application";

export class Notification {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly content: string,
    readonly notificationType: NotificationType,
    readonly createdAt: string,
    readonly updatedAt: string
  ) {}

  get formattedCreateDate(): string {
    return DateHelper.dateToFromNowDailyWithoutTime(this.createdAt);
  }

  get previewContent(): string {
    let previewContent = this.content;
    return previewContent.length > 30
      ? previewContent.substring(0, 28) + "..."
      : previewContent;
  }

  static createFromApi = (json: Json) => {
    const obj = new Notification(
      json.id,
      json.title,
      json.content,
      json.notification_type,
      json.created_at,
      json.updated_at
    );
    return obj;
  };

  static createFromObject = (value: Notification) => {
    const obj = new Notification(
      value.id,
      value.title,
      value.content,
      value.notificationType,
      value.createdAt,
      value.updatedAt
    );
    return obj;
  };
}
