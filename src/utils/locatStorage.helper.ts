interface ObjectWithExpiration {
  value: any;
  expiration: number;
}

export function createOrUpdatePropertyInObjectInLocalStorage<T>(
  key: string,
  propertyName: string,
  propertyValue: T
): void {
  console.log(key, propertyName, propertyValue);
  // Retrieve the existing object from local storage
  const existingData: ObjectWithExpiration | null =
    getObjectFromLocalStorage(key);

  // If there's no existing data, initialize an empty object
  const updatedData: { [key: string]: T } = existingData
    ? existingData.value
    : {};

  // Add or update the property in the object
  updatedData[propertyName] = propertyValue;

  // Save the updated object back to local storage
  saveObjectToLocalStorageWithExpiration(key, updatedData, 60); // Assuming a 60-minute expiration time
}

export function saveObjectToLocalStorageWithExpiration<T>(
  key: string,
  object: T,
  expirationMinutes: number
): void {
  const now = new Date();
  const item: ObjectWithExpiration = {
    value: object,
    expiration: now.getTime() + expirationMinutes * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getObjectFromLocalStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as ObjectWithExpiration).value : null;
}

// Example usage:
createOrUpdatePropertyInObjectInLocalStorage(
  "exampleKey",
  "exampleProperty",
  "exampleValue"
);
const retrievedData: { [key: string]: string } | null =
  getObjectFromLocalStorage("exampleKey");
console.log(retrievedData);
