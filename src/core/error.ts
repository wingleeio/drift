export const DRIFT_ERROR = Symbol("DRIFT_ERROR");
export type DRIFT_ERROR = typeof DRIFT_ERROR;

export const error = <TErrorData, const TCode extends number = 500>(data: TErrorData, code: TCode = 500 as TCode) => {
    return {
        [DRIFT_ERROR]: DRIFT_ERROR,
        code,
        data,
    };
};
