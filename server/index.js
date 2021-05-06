if (typeof window === "undefined") {
  global.window = {};
}
// const SSR = require("../src/search/index-server");
const path = require("path");
const fs = require("fs");
const express = require("express");
const { renderToString } = require("react-dom/server");
const SSR = require("../dist-ssr/search-server");

const renderMarkup = (str) => {
  const template = fs.readFileSync(
    path.resolve(__dirname, "../dist/search.html"),
    "utf-8"
  );
  return template.replace("<!--HTML_PLACEHOLDER-->", str);
};

const server = (port) => {
  const app = express();

  app.use(express.static("dist"));

  app.get("/search", (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log("Server is runnung on port 3000 now!");
  });
};
server(3000);
