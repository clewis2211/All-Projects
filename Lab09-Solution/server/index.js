var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var clientPath = path.join(__dirname, "../client");

var server = http.createServer(function (req, res) {
    //PARSE THE URL INTO A MORE READABLE FORMAT
    var parsedUrl = url.parse(req.url, true);

    //IF THE PATH-NAME WAS BLANK...
    if (parsedUrl.pathname === "/") {
        //I'M GOING TO BE SENDING BACK SOME HTML TO THE CLIENT
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.readFile(path.join(clientPath, "index.html"), "utf8", function (err, data) {
            if (err) {
                res.writeHead(404, "Cannot load index.html file!");
                res.end();
            } else {
                res.end(data);
            }
        }); //.then(function(success) {}, function(err) {}); THIS WORKS TOO!
        //IF THE PATH-NAME WAS /API/CHIRPS...    
    } else if (parsedUrl.pathname === "/api/chirps") {
        //IF THIS WAS A 'GET' REQUEST...
        if (req.method == "GET") {
            res.writeHead(200, { "Content-Type": "application/json" });
            fs.readFile(path.join(__dirname, "data.json"), "utf8", function (err, data) {
                if (err) {
                    res.writeHead(404, "Error! Could not load the file data.json");
                    res.end();
                } else {
                    console.log(data); //SAVE THIS FOR LATER
                    res.end(data);
                }
            });
            //OTHERWISE, IF THIS WAS A 'POST' REQUEST...    
        } else if (req.method == "POST") {
            var newChirp = '';

            //ANY TIME SOME DATA COMES IN, APPEND IT TO THE newChirp VARIABLE
            req.on('data', function (data) {
                newChirp += data;
            });

            req.on('end', function (data) {
                //READ FROM THE DATA.JSON FILE
                fs.readFile(path.join(__dirname, "data.json"), "utf8", function (err, data) {
                    if (err) {
                        res.writeHead(404, "Error! Could not load the file data.json");
                        res.end();
                    } else {
                        //ASSIGN THE VARIABLE allChirps TO EQUAL THE ARRAY FROM DATA.JSON
                        var allChirps = JSON.parse(data);
                        allChirps.push(JSON.parse(newChirp));
                        //WRITE OUR UPDATED ARRAY-O-CHIRPS TO THE DATA.JSON FILE 
                        fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(allChirps), function (err) {
                            if (err) {
                                res.writeHead(404, "Error! Could not write to the file data.json");
                                res.end();
                            } else {
                                res.writeHead(201);
                                res.end();
                            }
                        });
                    }
                });
            });
        }
        //OTHERWISE IF IT'S ANYTHING ELSE 
    } else {
        if (parsedUrl.pathname == "/styles.css") {
            //LOAD OUR STYLES.CSS FILE FROM /CLIENTS FOLDER
            res.writeHead(200, { "Content-Type": "text/css" });
            fs.readFile(path.join(clientPath, "styles.css"), "utf8", function (err, data) {
                if (err) {
                    res.writeHead(404, "Cannot load styles.css file!");
                    res.end();
                } else {
                    res.end(data);
                }
            });
        } else if(parsedUrl.pathname == "/scripts.js") {
            //LOAD OUR SCRIPTS.JS FILE FROM /CLIENTS FOLDER
            res.writeHead(200, { "Content-Type": "application/javascript" });
            fs.readFile(path.join(clientPath, "scripts.js"), "utf8", function (err, data) {
                if (err) {
                    res.writeHead(404, "Cannot load scripts.js file!");
                    res.end();
                } else {
                    res.end(data);
                }
            });
        } else {
            res.writeHead(404, "File not found! Dunno what you were trying to do...");
            res.end();
        }
    }
});
server.listen(3000);


//  var pathInfo = path.parse(parsedUrl.pathname);
//         var cType;
//         //GET OUR CONTENT-TYPE BASED ON THE EXTENSION OF THE FILE WE'RE TRYING TO GET
//         if(pathInfo.ext == ".js") {
//             cType = "application/javascript";
//         } else if(pathInfo.ext == ".css") {
//             cType = "text/css";
//         } else {
//             cType = "text/html";
//         }
//         //LOAD THAT FILE!
//         var filePath = path.join(__dirname, "../client", pathInfo.base);
//         fs.readFile(filePath, "utf8", function(err, data) {
//             if(err) {
//                 res.writeHead(404);
//                 res.end("CONTENT NOT FOUND!");
//             } else {
//                 res.writeHead(200, {"Content-Type": cType});
//                 res.end(data);
//             }
//         });
//     }