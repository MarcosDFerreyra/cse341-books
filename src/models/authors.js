import { getDb } from "../db/connect.js";

const getAuthors = async () => {
    const db = getDb();
    const collection = db.collection("authors");
    const authors = await collection.find({}).toArray();
    return authors
}

const getAuthorsById = async (authorId) => {
    const db = getDb();
    const collection = db.collection("authors");
    const authors = await collection.findOne({ id: authorId });
    return authors
}

const createAuthor = async (newAuthor) => {
    const db = getDb();
    const collection = db.collection("authors");
    const result = await collection.insertOne(newAuthor);
    return result;
}

const updateAuthor = async (authorId, updatedAuthor) => {
    const db = getDb();
    const collection = db.collection("authors");
    const result = await collection.updateOne({ id: authorId }, { $set: updatedAuthor });
    return result.matchedCount;
}

const deleteAuthor = async (authorId) => {
    const db = getDb();
    const collection = db.collection("authors");
    const result = await collection.deleteOne({ id: authorId });
    return result.deletedCount;
}

const countBooksByAuthor = async (authorId) => {
    const db = getDb();
    return await db.collection("books").countDocuments({ authorId });
};


export { getAuthors, getAuthorsById, createAuthor, updateAuthor, deleteAuthor, countBooksByAuthor};