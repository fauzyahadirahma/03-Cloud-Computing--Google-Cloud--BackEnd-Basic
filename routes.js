const { 
        addBookFau, 
        getAllBooksFau, 
        getSingleBookFau, 
        editBookFau, 
        deleteBookFau 
    } = require('./bookHandler');

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksFau
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBookFau
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getSingleBookFau
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookFau
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookFau
    }
];

module.exports = routes;