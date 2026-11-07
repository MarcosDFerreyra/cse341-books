import express from 'express';
import { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler } from './controllers/books.js';
import { authorHandler, authorHandlerById, createAuthorHandler, updateAuthorHandler, deleteAuthorHandler } from './controllers/authors.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: List of books returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: internal server error
 */
router.get("/books", getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get one book by id
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Book not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: internal server error
 */
router.get("/books/:id", getBookByIdHandler);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *                 format: date
 *           example:
 *             id: b4
 *             authorId: a1
 *             title: The Silmarillion
 *             publicationDate: "1977-09-15"
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 authorId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 publicationDate:
 *                   type: string
 *             example:
 *               id: b4
 *               authorId: a1
 *               title: The Silmarillion
 *               publicationDate: "1977-09-15"
 *       400:
 *         description: Invalid fields, invalid date, or the author does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               missingField:
 *                 summary: Missing field
 *                 value:
 *                   error: "Missing required field: title"
 *               wrongType:
 *                 summary: Wrong type
 *                 value:
 *                   error: Field title must be a string
 *               invalidDate:
 *                 summary: Invalid date format
 *                 value:
 *                   error: publicationDate must use the format YYYY-MM-DD
 *               notRealDate:
 *                 summary: Date does not exist
 *                 value:
 *                   error: publicationDate must be a real date
 *               authorNotFound:
 *                 summary: Author does not exist
 *                 value:
 *                   error: Author with id a9 does not exist
 *       409:
 *         description: A book with that id already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: A book with id b1 already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: internal server error
 */
router.post("/books", createBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom id of the book to update
 *         schema:
 *           type: string
 *           example: b4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *               title:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *                 format: date
 *           example:
 *             authorId: a1
 *             title: The Silmarillion (Second Edition)
 *             publicationDate: "1999-10-01"
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 authorId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 publicationDate:
 *                   type: string
 *             example:
 *               id: b4
 *               authorId: a1
 *               title: The Silmarillion (Second Edition)
 *               publicationDate: "1999-10-01"
 *       400:
 *         description: Invalid fields, invalid date, or the author does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               missingField:
 *                 summary: Missing field
 *                 value:
 *                   error: "Missing required field: title"
 *               wrongType:
 *                 summary: Wrong type
 *                 value:
 *                   error: Field title must be a string
 *               invalidDate:
 *                 summary: Invalid date format
 *                 value:
 *                   error: publicationDate must use the format YYYY-MM-DD
 *               notRealDate:
 *                 summary: Date does not exist
 *                 value:
 *                   error: publicationDate must be a real date
 *               authorNotFound:
 *                 summary: Author does not exist
 *                 value:
 *                   error: Author with id a9 does not exist
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Book with id b9 does not exist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: internal server error
 */
router.put("/books/:id", updateBookHandler);


/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete an existing book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom id of the book to delete
 *         schema:
 *           type: string
 *           example: b4
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Book with id b4 deleted successfully
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Book with id b9 does not exist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: internal server error
 */
router.delete("/books/:id", deleteBookHandler);


/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: List of authors returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   birthYear:
 *                     type: integer
 *             example:
 *               - id: a1
 *                 name: J.R.R. Tolkien
 *                 birthYear: 1892
 *               - id: a2
 *                 name: J.K. Rowling
 *                 birthYear: 1965
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Internal server error
 */
router.get("/authors", authorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get one author by id
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom id of the author
 *         schema:
 *           type: string
 *           example: a1
 *     responses:
 *       200:
 *         description: Author returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 birthYear:
 *                   type: integer
 *             example:
 *               id: a1
 *               name: J.R.R. Tolkien
 *               birthYear: 1892
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Author a9 not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Internal server error
 */
router.get("/authors/:id", authorHandlerById);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *           example:
 *             id: a4
 *             name: Brandon Sanderson
 *             birthYear: 1975
 *     responses:
 *       201:
 *         description: Author created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 birthYear:
 *                   type: integer
 *             example:
 *               id: a4
 *               name: Brandon Sanderson
 *               birthYear: 1975
 *       400:
 *         description: A field is missing, empty, has the wrong type, or birthYear is not a realistic year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               missingField:
 *                 summary: Missing field
 *                 value:
 *                   error: "Missing required field: name"
 *               wrongType:
 *                 summary: Wrong type
 *                 value:
 *                   error: Field id must be a string
 *               invalidYear:
 *                 summary: Invalid birth year
 *                 value:
 *                   error: birthYear cannot be greater than the current year
 *       409:
 *         description: An author with that id already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: An author with id a1 already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Internal server error
 */
router.post("/authors", createAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom id of the author to update
 *         schema:
 *           type: string
 *           example: a4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: integer
 *           example:
 *             name: Brandon Sanderson
 *             birthYear: 1975
 *     responses:
 *       200:
 *         description: Author updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 birthYear:
 *                   type: integer
 *             example:
 *               id: a4
 *               name: Brandon Sanderson
 *               birthYear: 1975
 *       400:
 *         description: A field is missing, empty, has the wrong type, or birthYear is not a realistic year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               missingField:
 *                 summary: Missing field
 *                 value:
 *                   error: "Missing required field: name"
 *               wrongType:
 *                 summary: Wrong type
 *                 value:
 *                   error: Field name must be a string
 *               invalidYear:
 *                 summary: Invalid birth year
 *                 value:
 *                   error: birthYear must be a whole number
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Author a9 not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Internal server error
 */
router.put("/authors/:id", updateAuthorHandler);


/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an existing author
 *     description: An author cannot be deleted while any book still references its id.
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom id of the author to delete
 *         schema:
 *           type: string
 *           example: a4
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Author a4 was deleted
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Author a9 not found
 *       409:
 *         description: The author still has books that reference it
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Author a1 cannot be deleted because 2 books still reference it. Delete or reassign those books first.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Internal server error
 */
router.delete("/authors/:id", deleteAuthorHandler);






export default router;
