// Required modules, npm install is used to install them if not already installed
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3000;

/** @type {{ id: number, author: string, title: string, content: string, createdAt: string }[]} */
let posts = [];
let nextId = 1;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


// home route
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// post routes
app.post("/posts", (req, res) => {
  const { author, title, content } = req.body;

  if (!author?.trim() || !title?.trim() || !content?.trim()) {
    return res.redirect("/");
  }

  posts.unshift({
    id: nextId++,
    author: author.trim(),
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date().toLocaleString(),
  });

  res.redirect("/");
});

// edit / delete routes
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id));
  if (!post) {
    return res.redirect("/");
  }
  res.render("edit", { post });
});

app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.redirect("/");
  }
  const { author, title, content } = req.body;
  if (!author?.trim() || !title?.trim() || !content?.trim()) {
    return res.redirect(`/posts/${id}/edit`);
  }
  posts[index] = {
    ...posts[index],
    author: author.trim(),
    title: title.trim(),
    content: content.trim(),
  };

  res.redirect("/");
});

app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/");
});

// listening port
app.listen(PORT, () => {
  console.log(`Blog app running at http://localhost:${PORT}`);
});
