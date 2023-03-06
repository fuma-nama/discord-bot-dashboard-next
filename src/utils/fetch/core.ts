export type ReturnOptions<T> = Options & {
  /**
   * Map result if status code is not equal to 200
   * @param status
   */
  allowed?: {
    [status: number]: (res: Response) => T | Promise<T>;
  };
};

export type Options = {
  /**
   * specify the origin url
   */
  origin?: string;

  /**
   * throw an error if status code is not equal to 200
   *
   * default: true
   */
  errorOnFail?: boolean;

  request: RequestInit;
};

export async function callDefault(url: string, init: Options) {
  const options = await parseOptions(url, init);

  return fetch(options.url, options.request).then((r) => handleError(r, init));
}

export async function callReturn<T>(url: string, init: ReturnOptions<T>): Promise<T> {
  const options = await parseOptions(url, init);

  const res = await fetch(options.url, options.request);

  if (!res.ok) {
    if (init.allowed?.[res.status] != null) {
      return await init.allowed[res.status](res);
    } else {
      await handleError(res, options);
    }
  }

  return await res.json();
}

/** throw error if condition matches */
async function handleError(res: Response, options: Options) {
  if (!res.ok && (options.errorOnFail ?? true)) {
    const raw = await res.json();
    throw new Error(raw);
  }
}

async function parseOptions<T extends Options>(url: string, options: T) {
  return {
    url: options.origin == null ? url : `${options.origin}${url}`,
    request: options.request,
  };
}
