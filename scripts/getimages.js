const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const axios = require("axios");
require("dotenv").config();

const characters = require("../src/constants/names");

const { SEARCH_KEY, SEARCH_ID } = process.env;

async function search(query) {
  const resp = await axios({
    method: "get",
    url: "https://www.googleapis.com/customsearch/v1",
    params: {
      key: SEARCH_KEY,
      cx: SEARCH_ID,
      searchType: "image",
      q: query,
    },
  });
  const result = resp.data.items[0];
  return {
    url: result.link,
    image: result.image,
  };
}

async function saveImage(url, name) {
  name = name.replace(/[ "]/gi, "_");
  const response = await axios({
    method: "get",
    url,
    responseType: "stream",
  });
  let ext = "";
  const contentType = response.headers["content-type"];
  switch (contentType) {
    case "image/jpg":
    case "image/jpeg":
      ext = "jpg";
      break;

    case "image/png":
      ext = "png";
      break;

    case "image/gif":
      ext = "gif";
      break;

    case "image/webp":
      ext = "webp";
      break;

    default:
      console.log(response.headers);
  }
  const fname = `${name}.${ext}`;
  response.data.pipe(fs.createWriteStream(path.join("images", fname)));
  return fname;
}

async function findAndSaveImage(name) {
  const res = await search(`${name} game of thrones`);
  const fname = await saveImage(res.url, name);
  console.log(`${name}: ${fname}...`);
  return { name, image: fname };
}

async function main() {
  const readFile = promisify(fs.readFile);
  const writeFile = promisify(fs.writeFile);

  const imageFile = path.join(__dirname, "..", "src", "constants", "images.json");
  let imageData = [];
  imageData = await readFile(imageFile).then(data => {
    return JSON.parse(data);
  });
  await Promise.all(characters.slice(0, 30)
    .map(name => findAndSaveImage(name)
      .then(metadata => {
        imageData.push(metadata);
      })
    )
  );
  await writeFile(imageFile, JSON.stringify(imageData, null, 2));
}

main();
