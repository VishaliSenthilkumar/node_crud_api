module.exports = (req, res) => {
    let baseURL = req.url.substring(0, req.url.lastIndexOf("/")+1);
    let id = req.url.split("/")[3];

    const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      );

    if(req.url==="/api/todos")
    {
        res.statusCode = 200;
        res.setHeader("content-type", "application/json");
        res.write(JSON.stringify(req.todos));
        res.end();
        console.log(req.todos);
    }
    else if(baseURL==="/api/todos/" && !regexV4.test(id))
    {
        res.writeHead(400, {"content-type": "application/json"});
        res.end(JSON.stringify({
            title: "Validation failed",
            message: "UUID is not valid"
        }))
    }
    else if(baseURL==="/api/todos/" && regexV4.test(id))
    {
        res.setHeader("content-type", "application/json");
        let filteredTodo = req.todos.filter( (todo)=> {
            return todo.id === id;
        })

        if(filteredTodo.length>0)
        {
            res.statusCode=200;
            res.write(JSON.stringify(filteredTodo));
            res.end();
        }
        else
        {
            res.statusCode = 404;
            res.write(
                JSON.stringify({title: "Not Found", message: "Todo not found"})
            );
            res.end();
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