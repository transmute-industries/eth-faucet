

// TODO: Add Encryption here
// to hide contract data from firebase...
// store encryption key in a contract with owner 
// https://github.com/cisco/node-jose
// https://github.com/OR13/JOE

// not sure if i trust this...
const hashCode = (s) => {
    return s.split("")
        .reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
}

export const resolveKeyType = (key) => {
    return (typeof key === 'string') ? key : hashCode(JSON.stringify(key));
}

export const getItem = (key) => {
    let resolvedKey = resolveKeyType(key);
    let itemAsString = sessionStorage.getItem(resolvedKey);
    try {
        return JSON.parse(itemAsString);
    } catch (e) {
        // 
        return itemAsString;
    }
}

export const setItem = (key, value) => {
    let resolvedKey = resolveKeyType(key);
    return sessionStorage.setItem(resolvedKey, JSON.stringify(value));
}