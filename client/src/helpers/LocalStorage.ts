export const setLocalStorage = (parameter: string, content: string) => {
    return localStorage.setItem(parameter, content);
}

export const removeLocalStorage = (parameter: string) => {
    localStorage.removeItem(parameter);
}

export const getLocalStorage = (parameter: string) => {
    return localStorage.getItem(parameter);
}