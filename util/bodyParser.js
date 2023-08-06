module.exports = async(req) => {
    return new Promise((resolve, reject) => {
        try{
            let body = "";
            req.on("data", (chunk) => {
                body+=chunk;
            });
            req.on("end", () => {
                resolve(JSON.parse(body));
            })
        } catch(err){
            console.log(err);
            reject(err);
        }
    })
}