export function getEnumKey(
  value: any,
  enumField: any,
  lowerCase: boolean = false
) {
  const key = Object.keys(enumField)[Object.values(enumField).indexOf(value)];
  if (lowerCase) return key.toLowerCase();
  return key;
}
