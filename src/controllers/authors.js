import { getAuthors, getAuthorsById, createAuthor, updateAuthor, deleteAuthor, countBooksByAuthor} from "../models/authors.js";
import { authorExists, validateAuthor } from "../validators/authors.js";

const authorHandler = async (req, res) => {
    try {
        const authors = await getAuthors();
        return res.status(200).json(authors);
    }
    catch (error) {
        console.log("GET/authors failed", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }

};

const authorHandlerById = async (req, res) => {
    const id = req.params.id;
    try {
        const author = await getAuthorsById(id);
        if (!author) {
            console.log(`GET /authors/${id} failed: author not found`);
            return res.status(404).json({ error: `Author ${id} not found` });
        }
        return res.status(200).json(author);
    }
    catch (error) {
        console.log("GET/authors/:id failed");
        return res.status(500).json({ error: "Internal server error" })
    }
};

const createAuthorHandler = async (req, res) => {
    const { id, name, birthYear } = req.body;
    try {
        const fieldError = await validateAuthor(id, name, birthYear);
        if (fieldError) {
            console.log("POST/authors/ failed")
            return res.status(400).json({ error: fieldError });
        }
        if (await authorExists(id)) {
            console.log("POST/authors/ failed")
            return res.status(409).json({ error: `An author with id ${id} already exists` });
        }
        const newAuthor = { id: id.trim(), name: name.trim(), birthYear };
        await createAuthor({ ...newAuthor })
        return res.status(201).json(newAuthor);   
    }
    catch {
        console.log("POST/authors/ failed")
        return res.status(500).json({ error: "Internal server error" })
    }
}

const updateAuthorHandler = async (req, res) => {
    const id = req.params.id;
    const { name, birthYear } = req.body;
    try {
        const fieldError = validateAuthor(id, name, birthYear);
        if (fieldError) {
            console.log(`PUT /authors/${id} failed:`, fieldError);
            return res.status(400).json({ error: fieldError });
        }

        const newUpdate = { name: name.trim(), birthYear };
        const matched = await updateAuthor(id, newUpdate);
        console.log("matched:", matched);
        if (matched === 0) {
            console.log(`PUT /authors/${id} failed: author not found`);
            return res.status(404).json({ error: `Author ${id} not found` });
        }

        return res.status(200).json({ id, ...newUpdate });
    }
    catch (error) {
        console.log(`PUT /authors/${id} failed:`, error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const deleteAuthorHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const booksByAuthor = await countBooksByAuthor(id)
        if (booksByAuthor >= 1) {
            console.log(`DELETE/authors/${id}`)
            return res.status(409).json({message: `Author ${id} cannot be deleted because ${booksByAuthor} books still reference it. Delete or reassign those books first.`})
        }
        const deleteAuth = await deleteAuthor(id);
        if (deleteAuth === 0) {
            console.log(`DELETE/authors/${id} failed: author not found`);
            return res.status(404).json({ error: `Author ${id} not found` });
        }
        return res.status(200).json({ message: `Author ${id} was deleted`})
    }
    catch (error) {
        console.log(`DELETE/authors/${id} failed:`, error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export { authorHandler, authorHandlerById, createAuthorHandler, updateAuthorHandler, deleteAuthorHandler };