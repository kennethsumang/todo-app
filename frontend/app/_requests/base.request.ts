/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from "../_exceptions/api.error";

export interface RequestOptions {
  token?: string;
  body?: Record<string, any>;
  params?: Record<string, string>;
  query?: Record<string, any>;
  headers?: Record<string, string>;
  cookie?: Record<string, any>;
}

export default class BaseRequest<T extends RequestOptions, U> {
  url: string = "";
  method: string = "GET";

  async mockRequest(options: T, delay: number = 0): Promise<U> {
    throw new Error("Method not implemented yet.");
  }

  async timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async request(options: T): Promise<U> {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      throw new Error("Invalid URL.");
    }

    const replacedParams = this.replacePlaceholders(this.url, options.params);
    let url = new URL(`${appUrl}${replacedParams}`);
    url = this.appendQueryParams(url, options.query);

    const fetchOptions: RequestInit = {
      method: this.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "same-origin",
    };

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    if (options.headers) {
      fetchOptions.headers = { ...fetchOptions.headers, ...options.headers };
    }

    const response = await fetch(url.toString(), fetchOptions);
    if (response.ok) {
      const responseData = await response.json();
      return responseData.data as U;
    }

    throw new ApiError(response.statusText, response.status);
  }

  /**
   * Replace placeholders in URL params
   * @param {string} template
   * @param {Record<string, string>|undefined} values
   */
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

  /**
   * Appends query params to the URL
   * @param {URL} url
   * @param {Record<string, string|number>|undefined} params
   */
  appendQueryParams(
    url: URL,
    params: Record<string, string | number> | undefined
  ): URL {
    if (!params) {
      return url;
    }

    if (Object.keys(params).length === 0) {
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
