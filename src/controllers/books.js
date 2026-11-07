import { getAllBooks, getBookById, createBooks, updateBooks, deleteBooks, countAuthors } from "../models/books.js";
import { bookExists, validateBook } from "../validators/books.js";

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    }
    catch (error) {
        console.log("GET/ books failed ", error.message)
        return res.status(500).json({ message: "internal server error"})
    }
}

const getBookByIdHandler = async (req, res) => {
    const requestedId = req.params.id;
    try {
        const book = await getBookById(requestedId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }
        return res.status(200).json(book);
    }
    catch (error) {
        console.log("GET/books/:id failed ", error.message)
        return res.status(500).json({ message: "internal server error" })
    }
}

const createBookHandler = async (req, res) => {
    const { id, title, authorId, publicationDate } = req.body;
    try {
        const fieldError = validateBook(id, title, authorId, publicationDate);
        if (fieldError) {
            console.log("POST/books/ failed")
            return res.status(400).json({ error: fieldError });
        }
        if (await bookExists(id)) {
            console.log("POST/books/ failed")
            return res.status(409).json({ error: `A book with id ${id} already exists` });
        }
        if (await countAuthors(authorId) === 0) {
            console.log("POST/books/ failed")
            return res.status(400).json({ error: `Author with id ${authorId} does not exist` });
        }
        const newBook = { id: id.trim(), title: title.trim(), authorId: authorId.trim(), publicationDate: publicationDate.trim() };
        await createBooks({ ...newBook })
        return res.status(201).json(newBook);
    }
    catch (error) {
        console.log("POST/books/ failed ", error.message)
        return res.status(500).json({ error: "internal server error" })
    }
} 

const updateBookHandler = async (req, res) => { 
    const id = req.params.id;
    const { authorId, title, publicationDate } = req.body;
    try {
        const valideBook = validateBook(id, title, authorId, publicationDate);
        if (valideBook) {
            console.log(`PUT /books/${id} failed`);
            return res.status(400).json({ error: valideBook });
        }
        if (await countAuthors(authorId) === 0) {
            console.log(`PUT /books/${id} failed`);
            return res.status(400).json({ error: `Author with id ${authorId} does not exist` });
        }
        const updatedBook = { title: title.trim(), authorId: authorId.trim(), publicationDate: publicationDate.trim() };
        const bookTracket = await updateBooks(id, updatedBook);
        if (bookTracket === 0) {
            console.log(`PUT /books/${id} failed`);
            return res.status(404).json({ error: `Book with id ${id} does not exist` });
        }
        return res.status(200).json({ id, ...updatedBook });
    }
    catch (error) { 
        console.log(`PUT/books/${id} failed "`, error.message)
        return res.status(500).json({ error: "internal server error" })
    }
}

const deleteBookHandler = async (req, res) => { 
    const id = req.params.id;
    try { 
        const bookTracket = await deleteBooks(id);
        if (bookTracket === 0) {
            console.log(`DELETE /books/${id} failed`);
            return res.status(404).json({ error: `Book with id ${id} does not exist` });
        }
        return res.status(200).json({ message: `Book with id ${id} deleted successfully` });
    }
    catch (error) {
        console.log(`DELETE/books/${id} failed "`, error.message)
        return res.status(500).json({ error: "internal server error" })
    }
}

export { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler };