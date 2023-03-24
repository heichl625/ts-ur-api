export function trimObject(obj) {
    if (Array.isArray(obj)) {
        // If obj is an array, slice it and iterate through each element
        return obj.slice(0, 3).map(item => trimObject(item));
    } else if (typeof obj === "object" && obj !== null) {
        // If obj is an object, iterate through its properties and format them recursively
        const formattedObj = {};
        for (const prop in obj) {
            formattedObj[prop] = trimObject(obj[prop]);
        }
        return formattedObj;
    } else {
        // If obj is a primitive value, return it as is
        return obj;
    }
}