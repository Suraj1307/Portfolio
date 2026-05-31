const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const distDir = path.join(rootDir, "dist");

const rootFiles = [
  "index.html",
  "404.html",
  "robots.txt",
  "site.webmanifest",
  "sitemap.xml",
  "skills.json"
];

const rootDirectories = [
  "assets",
  "experience",
  "projects"
];

function removeDirectory(targetPath) {
  fs.rmSync(targetPath, {recursive: true, force: true});
}

function ensureDirectory(targetPath) {
  fs.mkdirSync(targetPath, {recursive: true});
}

function copyFile(sourcePath, targetPath) {
  ensureDirectory(path.dirname(targetPath));
  fs.copyFileSync(sourcePath, targetPath);
}

function copyDirectory(sourceDir, targetDir) {
  ensureDirectory(targetDir);

  for (const entry of fs.readdirSync(sourceDir, {withFileTypes: true})) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
      continue;
    }

    copyFile(sourcePath, targetPath);
  }
}

removeDirectory(distDir);
ensureDirectory(distDir);

for (const fileName of rootFiles) {
  copyFile(path.join(rootDir, fileName), path.join(distDir, fileName));
}

for (const directoryName of rootDirectories) {
  copyDirectory(path.join(rootDir, directoryName), path.join(distDir, directoryName));
}

console.log("Static site build step completed.");
