const http = require("http");
const server = http.createServer((req, res) => {
    const url = req.url;
    if(url === "/users"){
        res.setHeader("Content-Type","text/html");
        res.write("<html>");
        res.write("<body>");
        res.write("<ul>");
        res.write("<li>");
        res.write("<h1>User 1</h1>")
        res.write("<li>");
        res.write("<ul>");
        res.write("</body>");
        res.write("</html>");
        res.end();
    }else{
        res.setHeader("Content-Type","html/text");
        res.write("<html>");
        res.write("<body>");
        res.write("<h1>Home Page</h1>")
        res.write("</body>");
        res.write("</html>");
        res.end();
    }
});
const PORT = 1337;

server.listen(PORT, () => {
    console.log(`Server running in ${PORT}`);
})