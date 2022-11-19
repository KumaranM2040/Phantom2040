const fs = require("fs");
const  requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
  
    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>Enter message</title></head>");
        res.write(
          '<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        res.write("</html>");
        return res.end();
      }
      console.log(url, method);
      if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", chunk => {
          console.log(chunk);
          body.push(chunk);
        });
        return req.on("end", () => {
          const parsedBody = Buffer.concat(body).toString();
          console.log("ParsedBody is : ", parsedBody);
          const message = parsedBody.split("=")[1];
          fs.writeFile("test.txt", message, error => {
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
          });
          //res.writeHead(302, {'Location': '/'});
        });
      }
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>My First Node JS Page</title></head>");
      res.write("<body><h1>Hello from Node js</h1></body>");
      res.write("</html>");
      res.end();
}

//module.exports = requestHandler;

module.exports = {
    handler: requestHandler,
    someText: 'Some hardcoded text'
}