export const isObjectEmpty = (v?: Record<any, any>) => !v || Object.keys(v).length === 0;

export const isObject = (v: unknown): v is object => v !== null && typeof v === 'object';