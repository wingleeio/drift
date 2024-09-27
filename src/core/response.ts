export const JSON_RESPONSE = Symbol("JSON_RESPONSE");
export type JSON_RESPONSE = typeof JSON_RESPONSE;

export const HTML_RESPONSE = Symbol("HTML_RESPONSE");
export type HTML_RESPONSE = typeof HTML_RESPONSE;

export type DriftResponse<TData, TCode extends number> =
    | {
          type: JSON_RESPONSE;
          data: TData;
          code: TCode;
      }
    | {
          type: HTML_RESPONSE;
          data: string;
          code: TCode;
      }
    | Response;

export const json = <TData, const TCode extends number>(
    data: TData,
    code: TCode = 200 as TCode
): DriftResponse<TData, TCode> => {
    return {
        type: JSON_RESPONSE,
        data,
        code,
    };
};

export const html = <const TCode extends number>(
    data: string,
    code: TCode = 200 as TCode
): DriftResponse<string, TCode> => {
    return {
        type: HTML_RESPONSE,
        data,
        code,
    };
};
