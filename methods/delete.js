const writeToFile = require("../util/writeToFile.js");

module.exports = (req, res) => {
    let baseURL = req.url.substring(0, req.url.lastIndexOf("/")+1);
    let id = req.url.split("/")[3];

    const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      );

    if(baseURL==="/api/todos/" && !regexV4.test(id))
    {
        res.writeHead(400, {"content-type": "application/json"});
        res.end(JSON.stringify({
            title: "Validation failed",
            message: "UUID is not valid"
        }))
    }
    else if(baseURL==="/api/todos/" && regexV4.test(id))
    {
        const index = req.todos.findIndex((todo) => {
            return todo.id===id;
        })

        if(index===-1)
        {
            res.statusCode = 404;
            res.write(
                JSON.stringify({title: "Not Found", message: "Todo not found"})
            );
            res.end();
        }
        else
        {
            req.todos.splice(index, 1);
            writeToFile(req.todos);
            res.writeHead(204, { "Content-Type": "application/json" });
            res.end(JSON.stringify(req.todos));
        }
    }
    else
    {
        res.statusCode = 404;
        res.setHeader("content-type", "application/json");
        res.write(
            JSON.stringify({title: "Not Found", message: "Route not found"})
        );
        res.end();
    }
}