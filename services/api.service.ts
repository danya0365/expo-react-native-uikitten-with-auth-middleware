import {
  MessengerConversation,
  MessengerConversationType,
} from "@/models/messenger-conversation";
import { AxiosInstance } from "axios";
import httpRequest, {
  ApiDataListResponse,
  ApiDataObjectResponse,
  ApiLoginResponse,
  ApiRegisterResponse,
  ApiUploadResponse,
} from "./http-request.service";

export class ApiService {
  request: AxiosInstance;

  constructor(axiosInstance = httpRequest) {
    this.request = axiosInstance;
  }
}

export class ConfigurationApiService extends ApiService {
  public async getConfigurations(): Promise<ApiDataListResponse> {
    const response = await httpRequest.get(`/configurations`);
    return response.data;
  }
}

export class ProvinceApiService extends ApiService {
  public async getProvinces(): Promise<ApiDataListResponse> {
    const response = await httpRequest.get(`/provinces`);
    return response.data;
  }
}

export class AuthApiService extends ApiService {
  public async doRequestLogin(
    email: string,
    password: string
  ): Promise<ApiLoginResponse> {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await this.request.post(`/auth/login`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }

  public async doRequestRegister(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<ApiRegisterResponse> {
    const formData = new FormData();
    formData.append("name", email.split("@").shift() || "");
    formData.append("email", email);
    formData.append("password", password);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);

    const response = await this.request.post(`/auth/register`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

export class UploadApiService extends ApiService {
  public async doUploadOriginalImage(
    file: Blob | { uri: string; type: string; name: string } | undefined
  ): Promise<ApiUploadResponse> {
    const formData = new FormData();
    formData.append("image", file as any);

    const response = await this.request.post(
      `/upload/original-image`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  public async doUploadImage(
    file: Blob | { uri: string; type: string; name: string } | undefined
  ): Promise<ApiUploadResponse> {
    const formData = new FormData();
    formData.append("image", file as any);

    const response = await this.request.post(`/upload/image`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }

  public async doUploadDocument(file: Blob): Promise<ApiUploadResponse> {
    const formData = new FormData();
    formData.append("document", file);

    const response = await this.request.post(`/upload/document`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

export class MessengerApiService extends ApiService {
  public async getLatestConversations({
    id,
    telephone,
  }: {
    id: number;
    telephone: string;
  }): Promise<ApiDataListResponse> {
    const response = await httpRequest.get(
      `/messenger/telephone-channel/${id}/${telephone}/conversations`
    );
    return response.data;
  }

  public async getLastConversationSeen({
    channelId,
    telephone,
  }: {
    channelId: number;
    telephone: string;
  }): Promise<ApiDataListResponse> {
    const response = await httpRequest.get(
      `/messenger/telephone-channel/${channelId}/${telephone}/conversations/last`
    );
    return response.data;
  }

  public async updateConversationSeen(
    messenger: MessengerConversation
  ): Promise<ApiDataListResponse> {
    const response = await httpRequest.post(
      `/messenger/channel/${messenger.channelId}/conversations/${messenger.id}/seen`
    );
    return response.data;
  }

  public async submitNewConversation({
    id,
    telephone,
    content,
    local_code_id,
    type,
  }: {
    id: number;
    telephone: string;
    content: string;
    local_code_id: string;
    type: MessengerConversationType;
  }): Promise<ApiDataObjectResponse> {
    const formData = new FormData();
    formData.append("local_code_id", local_code_id);
    formData.append("content", content);
    formData.append("type", type);
    const response = await this.request.post(
      `/messenger/telephone-channel/${id}/${telephone}/conversations`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  public async doCreateNewTelephoneChannel(params: {
    telephone: string;
  }): Promise<ApiDataObjectResponse> {
    const formData = new FormData();
    formData.append("telephone", params.telephone);
    const response = await this.request.post(
      `/messenger/telephone-channel/new`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
}

export class NotificationApiService extends ApiService {
  public async getLatestNotifications(): Promise<ApiDataListResponse> {
    const response = await httpRequest.get(`/notifications`);
    return response.data;
  }

  public async getNotificationById({
    id,
  }: {
    id: string;
  }): Promise<ApiDataObjectResponse> {
    const response = await httpRequest.get(`/notifications/${id}`);
    return response.data;
  }

  public async getLastUpdateNotification(): Promise<ApiDataObjectResponse> {
    const response = await httpRequest.get(`/notifications/last-update`);
    return response.data;
  }
}
