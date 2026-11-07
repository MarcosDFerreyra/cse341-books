import { getDb } from "../db/connect.js";

const getAllBooks = async () => {
   
        const db = getDb();
        const collection = db.collection("books");
        const books = await collection.find({}).toArray();
        return books;
}
   
const getBookById = async (bookId) => {
        const db = getDb();
        const collection = db.collection("books");
        const book = await collection.findOne({ id: bookId });
        return book;
};

const createBooks = async (newBook) => {
        const db = getDb();
        const collection = db.collection("books");
        const result = await collection.insertOne(newBook);
        return result;
}

const updateBooks = async (bookId, updatedBook) => {
        const db = getDb();
        const collection = db.collection("books");
        const result = await collection.updateOne({ id: bookId }, { $set: updatedBook });
        return result.matchedCount;
}

const deleteBooks = async (bookId) => {
        const db = getDb();
        const collection = db.collection("books");
        const result = await collection.deleteOne({ id: bookId });
        return result.deletedCount;
}

const countAuthors = async (authorId) => {
        const db = getDb();
        return await db.collection("books").countDocuments({ authorId });
}

export { getAllBooks, getBookById, createBooks, updateBooks, deleteBooks, countAuthors };