import { getAuthorsById } from "../models/authors.js";

const authorExists = async (id) => {    
    const author = await getAuthorsById(id);
    return author !== null && author !== undefined;
} 

const validateYear = (year) =>{
    const currentYear = new Date().getFullYear();

    if (year === undefined || year === null) {
        return "Missing required field: birthYear";
    }
    if (!Number.isInteger(year)) {
        return "birthYear must be a whole number";
    }
    if (year > currentYear) {
        return "birthYear cannot be greater than the current year";
    }
    if (year < 1) {
        return "birthYear must be a realistic year";
    }
    return null;
}

const validateAuthor = (id, name, birthYear) => {
    const fields = { id, name };

    for (const [field, value] of Object.entries(fields)) {
        if (value === undefined || value === null) return `Missing required field: ${field}`;
        if (typeof value !== "string") return `Field ${field} must be a string`;
        if (value.trim() === "") return `Missing required field: ${field}`;
    }

    return validateYear(birthYear); 
};



export { authorExists, validateAuthor };