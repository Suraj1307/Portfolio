const http = require("http");
const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const port = Number(process.env.PORT) || 3000;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

function sendFile(filePath, res, statusCode = 200) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
      res.end("Internal Server Error");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();

    res.writeHead(statusCode, {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=86400",
      "X-Content-Type-Options": "nosniff"
    });
    res.end(data);
  });
}

function resolvePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0]);
  const normalizedPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  return path.join(rootDir, normalizedPath);
}

const server = http.createServer((req, res) => {
  const requestPath = req.url === "/" ? "/index.html" : req.url;
  let filePath = resolvePath(requestPath);

  if (!filePath.startsWith(rootDir)) {
    sendFile(path.join(rootDir, "404.html"), res, 404);
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (!statError && stats.isDirectory()) {
      const directoryIndex = path.join(filePath, "index.html");
      fs.access(directoryIndex, fs.constants.F_OK, accessError => {
        if (!accessError) {
          sendFile(directoryIndex, res);
          return;
        }

        sendFile(path.join(rootDir, "404.html"), res, 404);
      });
      return;
    }

    if (!statError && stats.isFile()) {
      sendFile(filePath, res);
      return;
    }

    // Support clean access like /projects or /experience for the existing folders.
    const htmlPath = resolvePath(`${requestPath}.html`);
    fs.access(htmlPath, fs.constants.F_OK, htmlError => {
      if (!htmlError) {
        sendFile(htmlPath, res);
        return;
      }

      sendFile(path.join(rootDir, "404.html"), res, 404);
    });
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Portfolio server running on http://0.0.0.0:${port}`);
});
