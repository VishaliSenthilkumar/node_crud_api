const uuid = require("uuid");
const writeToFile = require("../util/writeToFile.js");
const bodyParser = require("../util/bodyParser.js");
module.exports = async (req, res) => {
    if(req.url==="/api/todos")
    {
        console.log(req.todos);
        try{
            let body = await bodyParser(req);
            body.id = uuid.v4();
            req.todos.push(body);
            writeToFile(req.todos);
            res.writeHead(201, {"content-type": "application/json"});
            res.end();
        } catch(err){
            console.log(err);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                title: "Validation Failed",
                message: "Request body is not valid",
                })
            );
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
}