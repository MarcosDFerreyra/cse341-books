import { getAllBooks } from "../models/books.js";

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    }
    catch (error) {
        console.log("GET/ books failed ", error.message)
        res.status(500).json({ message: "failed to retrive collection"})
    }
}

export { getBooksHandler };