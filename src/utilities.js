export const noop = () => undefined;

export const has = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property);
