import { Json } from "@/models/json";
import axios from "axios";
import Constants from "expo-constants";

const httpRequest = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl || "http://localhost/api",
});

export const setBearerToken = (token: string) => {
  httpRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export interface ApiResponse {
  status: boolean;
  message: string;
}

export interface ApiErrorResponse extends ApiResponse {
  errors: string[];
}

export interface ApiLoginResponse extends ApiResponse {
  data: ApiAuthData;
}

export interface ApiRegisterResponse extends ApiResponse {
  data: ApiAuthData;
}

export interface ApiAuthData {
  user: Json;
  token: string;
  permission: Json;
}

export interface ApiBooleanResponse extends ApiResponse {
  data: boolean;
}

export interface ApiNumberResponse extends ApiResponse {
  data: number;
}

export interface ApiProfileResponse extends ApiResponse {
  data: Json;
}

export interface ApiDataListResponse extends ApiResponse {
  data: { list: Json[] };
}

export interface ApiDataObjectResponse extends ApiResponse {
  data: Json;
}

export interface ApiUploadResponse extends ApiResponse {
  data: ApiUploadData;
}

export interface ApiUploadData {
  original: string;
  resize: string;
}

export default httpRequest;
