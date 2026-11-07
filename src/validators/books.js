import { getBookById } from "../models/books.js";

const bookExists = async (id) => {
    const book = await getBookById(id);
    return book !== null && book !== undefined;
} 

const validatePublicationDate = (publicationDate) => { 

    if (publicationDate === undefined || publicationDate === null)
        return "Missing required field: publicationDate";
    
    if (!/^\d{4}-\d{2}-\d{2}$/.test(publicationDate)) 
        return "publicationDate must use the format YYYY-MM-DD";
    
    const parsed = new Date(`${publicationDate}T00:00:00Z`);
    if (isNaN(parsed) || parsed.toISOString().slice(0, 10) !== publicationDate) 
        return "publicationDate must be a real date";

    return null;
}

const validateBook = (id, title, authorId, publicationDate) => {
    const fields = { id, title, authorId, publicationDate };

    for (const [field, value] of Object.entries(fields)) {
        if (value === undefined || value === null) return `Missing required field: ${field}`;
        if (typeof value !== "string") return `Field ${field} must be a string`;
        if (value.trim() === "") return `Missing required field: ${field}`;
    }

    return validatePublicationDate(publicationDate);
};
    
export { bookExists, validateBook };