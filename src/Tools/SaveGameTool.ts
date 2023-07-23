export const convertObjectToDataString = (object: unknown) => {
  const dataString = JSON.stringify(object)
  return dataString
}

export const convertDataStringToObject = (dataString: string) => {
  const object = JSON.parse(dataString)
  return object
}

export const saveData = (dataKey: string, dataString: string) => {
  localStorage.setItem(dataKey, dataString)
}

export const loadData = (dataKey: string) => {
  const dataString = localStorage.getItem(dataKey)
  return dataString
}

export const clearData = (dataKey: string) => {
  localStorage.removeItem(dataKey)
}
