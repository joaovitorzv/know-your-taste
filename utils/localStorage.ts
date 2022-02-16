export function getLocalStorageItem(name: string) {
  const item = localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
}

export function setLocalStorageItem(name: string, value: unknown) {
  return localStorage.setItem(name, JSON.stringify(value));
}

export function dropLocalStorageItem(name: string) {
  return localStorage.removeItem(name);
}
