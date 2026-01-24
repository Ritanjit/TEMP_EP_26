/**
 * FrontQL API Service
 * 
 * Core API service for communicating with FrontQL cloud database.
 * 
 * USAGE:
 * import Api from '@apis/Api';
 * 
 * // GET request
 * const events = await Api.get('/euphuism-events');
 * 
 * // POST request
 * await Api.post('/registrations', { body: { name: 'John' } });
 */

import axios, { type AxiosRequestConfig } from "axios";
import tokens from "./tokens.json";

interface Tokens {
	[key: string]: string | false;
}

// Base64 encoding characters
const base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function toBase64(num: number): string {
	let result = "";
	const str = num.toString();
	for (let i = 0; i < str.length; i++) {
		const charCode = parseInt(str[i]);
		result += base64chars[charCode % 64];
	}
	return result;
}

export const _DATABASE = "s5_intern_database";
export const _BASE_URL = "https://v5.frontql.dev";
const local_host = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:4466" : "https://v5.frontql.dev");

type HttpMethod = "get" | "post" | "put" | "delete" | "sql";

type RequestOptions = {
	loading?: boolean;
	body?: {
		sql: "string";
		params: [{ [key: string]: string | number }];
	} | Record<string, unknown> | Record<string, unknown>[];
	key?: Record<string, string | unknown>;
	page?: string;
	sort?: string;
	joins?: string;
	filter?: string;
	search?: string;
	nearby?: string;
	hidden?: string;
	fields?: string;
	session?: string;
	validation?: string;
	permissions?: string;
};

function uniqueKey(input: string) {
	let code = input.charCodeAt(0);
	for (let i = 0; i < input.length; i++) {
		const char = input.charCodeAt(i);
		code = (code << 5) - code + char;
		code &= code;
	}

	return toBase64(Math.abs(code)).substring(0, 8);
}

function getKey(method: HttpMethod, url: string, options: RequestOptions) {
	if (!local_host) throw new Error("local_host is not defined");
	const _url = local_host + url;
	const parsed_url = new URL(_url);
	const pathname = parsed_url.pathname;

	const request: Record<string, unknown> = {
		fields: options?.fields,
		hidden: options?.hidden,
		filter: options?.filter,
		nearby: options?.nearby,
		collections: options?.joins,
		permissions: options?.permissions,
		validation: options?.validation,
	};

	request["body_is_array"] = Array.isArray(options.body || {});

	let tokenStr = pathname;
	for (const key in request) {
		if (request[key]) {
			tokenStr += key + ":" + request[key];
		}
	}
	const key = method + ":" + pathname + ">" + uniqueKey(tokenStr);
	return key;
}

const makeRequest = async (method: HttpMethod, endpoint: string, options: RequestOptions = {}): Promise<unknown> => {
	const {
		body,
		page,
		sort,
		joins,
		hidden,
		fields,
		filter,
		search,
		nearby,
		session,
		validation,
		permissions,
		loading = true,
	} = options;

	const headers: any = {};

	if (hidden) headers.hidden = hidden;
	if (filter) headers.filter = filter;
	if (fields) headers.fields = fields;
	if (session) headers.session = session;
	if (nearby) headers.nearby = nearby;
	if (joins) headers.collections = joins;
	if (validation) headers.validation = validation;
	if (permissions) headers.permissions = permissions;

	const key = getKey(method, endpoint, options);
	const token = (tokens as Tokens)[key] || false;

	if (!token) {
		headers["key"] = key;
	} else {
		headers.token = token;
	}

	const params: Record<string, unknown> = {
		page: page,
		sort: sort,
		search: search,
	};

	try {
		if (loading) {
			// console.log("Loading started...");
		}

		const axiosInstance = axios.create({
			baseURL: token ? _BASE_URL : local_host,
			headers: { app: _DATABASE },
		});

		const requestConfig: AxiosRequestConfig = {
			method,
			params,
			headers,
			data: body,
			url: endpoint,
		};

		const response = await axiosInstance(requestConfig);
		return response.data;
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		console.error(`${method.toUpperCase()} Error:`, errorMessage);
		throw error;
	} finally {
		if (loading) {
			// console.log("Loading completed.");
		}
	}
};

const Api = {
	get: async (endpoint: string, options?: RequestOptions): Promise<unknown> => makeRequest("get", endpoint, options),
	put: async (endpoint: string, options?: RequestOptions): Promise<unknown> => makeRequest("put", endpoint, options),
	post: async (endpoint: string, options?: RequestOptions): Promise<unknown> => makeRequest("post", endpoint, options),
	delete: async (endpoint: string, options?: RequestOptions): Promise<unknown> => makeRequest("delete", endpoint, options),
	sql: async (endpoint: string, options?: RequestOptions): Promise<unknown> =>
		makeRequest("post", `/sql-${endpoint.replace("/", "")}`, options),
};

export default Api;
