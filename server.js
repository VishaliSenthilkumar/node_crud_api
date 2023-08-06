const http = require("http");
require("dotenv").config();
const getReq = require("./methods/get");
const postReq = require("./methods/post");
const putReq = require("./methods/put");
const deleteReq = require("./methods/delete");
const todos = require("./data/todos.json")

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
    const method = req.method;
    req.todos = todos;
    switch(method)
    {
        case "GET":
            getReq(req, res);
            break;
        case "POST":
            postReq(req, res);
            break;
        case "PUT":
            putReq(req, res);
            break;
        case "DELETE":
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("content-type", "application/json");
            res.write(
                JSON.stringify({title: "Not Found", message: "Node.js"})
            );
            res.end();
    }
});

server.listen(PORT, ()=> {
    console.log(`Server started at port : ${PORT}`);
})