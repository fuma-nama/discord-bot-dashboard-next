import { deepmerge } from 'deepmerge-ts';

export type ReturnOptions<T> = Options & {
  /**
   * Map result if status code is not equal to 200
   * @param status
   */
  allowed?: {
    [status: number]: (res: Response) => T;
  };
};

export type Options = {
  /**
   * specify the origin url
   */
  origin?: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  contentType?: 'application/json';
  body?: string | FormData;

  /**
   * throw an error if status code is not equal to 200
   *
   * default: true
   */
  errorOnFail?: boolean;
  init?: any;
};

export async function callDefault(url: string, init: Options) {
  const options = await parseOptions(url, init);

  return fetch(options.url, options.request).then((r) => handle(r, init));
}

export async function callReturn<T>(url: string, init: ReturnOptions<T>): Promise<T> {
  const options = await parseOptions(url, init);

  return fetch(options.url, options.request).then((res) =>
    handleResult<T>(res, init, (res) => res.json())
  );
}

async function handleResult<T>(
  res: Response,
  options: ReturnOptions<T>,
  mapper: (res: Response) => Promise<T>
): Promise<T> {
  if (!res.ok) {
    if (options.allowed && options.allowed[res.status]) {
      return options.allowed[res.status](res);
    } else {
      await handleError(res, options);
    }
  }

  return await mapper(res);
}

async function handle(res: Response, options: Options) {
  await handleError(res, options);

  return res;
}
/** throw error if condition matches */
async function handleError(res: Response, options: Options) {
  if (!res.ok && (options.errorOnFail ?? true)) {
    const raw = await res.json();
    throw new Error(raw);
  }
}

async function parseOptions<T extends Options>(url: string, options: T) {
  const isForm = options.body instanceof FormData;

  const request: RequestInit = {
    method: options.method,
    body: options.body,
    headers: {
      ...(!isForm && {
        'Content-Type': options.contentType ?? 'application/json',
      }),
    },
  };

  return {
    url: options.origin == null ? url : `${options.origin}${url}`,
    request: deepmerge(request, options.init),
  };
}
