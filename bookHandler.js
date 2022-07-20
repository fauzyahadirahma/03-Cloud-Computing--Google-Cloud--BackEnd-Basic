const books =  require('./books');
const { v4: uuidv4 } = require('uuid');

const addBookFau = (req, res) => {
    const  {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = req.payload;

    if(name == undefined) {
        const response = res.response({
            status: 'fail',
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        }).code(400);

        return response;

    } else  if (readPage > pageCount){
        const response =  res.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400);

        return response;

    } else {
        const bookId = uuidv4();
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        const finished = pageCount === readPage;

        const newBook = {
            id: bookId,
            name: name,
            year: year,
            author: author,
            summary: summary,
            publisher: publisher,
            pageCount: pageCount,
            readPage: readPage,
            finished: finished,
            reading: reading,
            insertedAt: insertedAt,
            updatedAt: updatedAt,
        };

        books.push(newBook);

        const isSuccess =  books.filter((books) => books.id === bookId);

        if(isSuccess.length > 0) {
            const response = res.response({
                status: "success",
                message: "Buku berhasil ditambahkan",
                data: {
                    bookId: bookId
                }
            }).code(201);
            return response;
        } else {
            const response = res.response({
                status: 'error',
                message: 'Buku gagal ditambahkan',
            });
            response.code(500);
            return response;
        }
    }

}

const getAllBooksFau = (req, res) => {

    if(typeof req.query.name !== 'undefined') {

        const regex = new RegExp(`\\b${req.query.name}\\b`, "gi");
        // const regex = /[]/

        const listBook = books.filter((book) => regex.test(book.name) == true);

        const response = res.response({
            status: "success",
            data: {
                books: listBook
            }
        }).code(200);

        return response;

    }

    if(typeof req.query.reading !== 'undefined') {

        const param = req.query.reading;

        const listBook = books.filter((book) => +book.reading == param);

        const response = res.response({
            status: "success",
            data: {
                books: listBook
            }
        }).code(200);true

        return response;

    }

    if(typeof req.query.finished !== 'undefined') {

        const param = req.query.finished;

        const listBook = books.filter((book) => +book.finished == param);

        const response = res.response({
            status: "success",
            data: {
                books: listBook
            }
        }).code(200);true

        return response;

    }

    const response = res.response({
        status: "success",
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            })),
        }
    }).code(200);

    return response;
}

const getSingleBookFau = (req, res) => {
    const { id } = req.params;

    const book = books.filter((book) => book.id == id)[0];

    if(book) {
        const response = res.response({
            status: "success",
            data: {
                book: book
            }
        }).code(200);

        return response;

    } else {
        const response = res.response({
            status: "fail",
            message: "Buku tidak ditemukan"
        }).code(404);

        return response;
    }
}

const editBookFau = (req, res) => {
    const  {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = req.payload;

    const { id } = req.params;

    const bookIndex = books.findIndex((book) => book.id === id);

    if(bookIndex === -1) {
        const response = res.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        }).code(404);

        return response;

    } else {
         
        if(name == undefined) {
            const response = res.response({
                status: "fail",
                message: "Gagal memperbarui buku. Mohon isi nama buku"
            }).code(400);
            
            return response;
            
        } else if (readPage > pageCount) {
            const response = res.response({
                status: "fail",
                message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400);
            
            return response;

        } else {

            const updatedAt = new Date().toISOString();
            const finished = pageCount === readPage;

            books[bookIndex] = {
                ...books[bookIndex],
                finished,
                id: id,
                name: name,
                year: year,
                author: author,
                summary: summary,
                publisher: publisher,
                pageCount: pageCount,
                readPage: readPage,
                reading: reading,
                updatedAt: updatedAt
            }

            const response = res.response({
                status: "success",
                message: "Buku berhasil diperbarui"
            }).code(200);

            return response;
        }
    }
}

const deleteBookFau = (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex((book) => book.id === id);

    if(bookIndex < 0){
        const response = res.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan"
        }).code(404);

        return response;
    } else {
        books.splice(bookIndex, 1);
        const response = res.response({
            status: "success",
            message: "Buku berhasil dihapus"
        }).code(200);

        return response;
    }
}

module.exports = {
    addBookFau,
    getAllBooksFau,
    getSingleBookFau,
    editBookFau,
    deleteBookFau
}