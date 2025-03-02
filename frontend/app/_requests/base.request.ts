/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";
import ApiError from "../_exceptions/api.error";

export interface RequestOptions {
  token?: string;
  body?: Record<string, any>;
  params?: Record<string, string>;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  cookie?: Record<string, any>;
}

export default class BaseRequest<T extends RequestOptions, U> {
  url: string = "";
  method: string = "GET";

  async request(options: T): Promise<U> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("Invalid API URL.");
    }

    const replacedParams = this.replacePlaceholders(this.url, options.params);
    let url = new URL(`${apiUrl}${replacedParams}`);
    url = this.appendQueryParams(url, options.query);

    const fetchOptions: RequestInit = {
      method: this.method,
      headers: {
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    if (options.headers) {
      fetchOptions.headers = { ...fetchOptions.headers, ...options.headers };
    }

    const response = await fetch(url.toString(), fetchOptions);
    if (!response.ok) {
      throw new ApiError(response.statusText, response.status);
    }

    const responseData = await response.json();
    return responseData.data as U;
  }

  async serverRequest(options: T): Promise<U> {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { cookies } = require("next/headers");
    const cookieStore = await cookies();
    const allCookies = await cookieStore.getAll();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("Invalid API URL.");
    }

    const replacedParams = this.replacePlaceholders(this.url, options.params);
    let url = new URL(`${apiUrl}${replacedParams}`);
    url = this.appendQueryParams(url, options.query);

    const fetchOptions: RequestInit = {
      method: this.method,
      headers: {
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
        "Content-Type": "application/json",
        Cookie: _.map(allCookies, (data) => `${data.name}=${data.value};`).join(
          ""
        ),
      },
      credentials: "include",
    };

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    if (options.headers) {
      fetchOptions.headers = { ...fetchOptions.headers, ...options.headers };
    }

    const response = await fetch(url.toString(), fetchOptions);
    if (!response.ok) {
      throw new ApiError(response.statusText, response.status);
    }

    const responseData = await response.json();
    return responseData.data as U;
  }

  replacePlaceholders(
    template: string,
    values: Record<string, string> | undefined
  ): string {
    if (!values) {
      return template;
    }

    return template.replace(/:(\w+)/g, (match, key) => {
      return key in values ? values[key] : match;
    });
  }

  appendQueryParams(url: URL, params: Record<string, string> | undefined): URL {
    if (!params) {
      return url;
    }

    const newUrl = new URL(url.toString()); // Clone to avoid modifying the original URL

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        newUrl.searchParams.append(key, String(value));
      }
    });

    return newUrl;
  }
}
