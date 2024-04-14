/**
 * The function checks if two objects are deeply equal by comparing their properties and values.
 * @param {any} value1 - The first value to compare. It can be of any type.
 * @param {any} value2 - The `value2` parameter is the second value that you want to compare for deep
 * equality.
 * @returns a boolean value indicating whether the two input values are deeply equal.
 */
export function objectDeepEqual(value1: any, value2: any): boolean {
  const areObjects: boolean = isObject(value1) && isObject(value2);
  if (!areObjects) return value1 === value2;
  const orderedObject1: Record<string, unknown> = sortObjectKeys(value1);
  const orderedObject2: Record<string, unknown> = sortObjectKeys(value2);
  return JSON.stringify(orderedObject1) === JSON.stringify(orderedObject2);
}

/**
 * The `sortObjectKeys` function takes an object as input and returns a new object with its keys sorted
 * in alphabetical order.
 * @param {any} object - The `object` parameter is of type `any`, which means it can accept any value.
 * @returns an ordered object with its keys sorted in alphabetical order.
 */
export function sortObjectKeys(
  object: Record<string, unknown>,
): Record<string, unknown> {
  if (!isObject(object)) return object;
  const orderedObject: Record<string, unknown> = Object.keys(object)
    .sort((a, b) => a.localeCompare(b))
    .reduce<Record<string, unknown>>((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
  return orderedObject;
}

/**
 * The function checks if a value is an object.
 * @param {any} value - The `value` parameter is the value that you want to check if it is an object or
 * not.
 * @returns a boolean value, which indicates whether the given value is an object or not.
 */
export function isObject(value: any): boolean {
  return (value !== null || value !== undefined) && typeof value === "object";
}
