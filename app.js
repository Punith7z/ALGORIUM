
const express = require("express")
const app = express()
const path = require("path")
const ejsMate = require("ejs-mate");
let port = 8080

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.set("view options", { root: path.join(__dirname, "views") });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.bodyClass = "";
    next();
});
app.listen(port, () => {
    console.log("Listining to Port 8080")
});
app.get("/", async (req, res) => {
    res.render("listings/home.ejs")
});
app.get("/about", async (req, res) => {
    res.render("listings/about.ejs")
})
app.get("/faculty", async (req, res) => {
    res.render("listings/faculty.ejs")
})
app.get("/login", async (req, res) => {
    res.render("listings/login.ejs")
})
app.get("/contact", async (req, res) => {
    res.render("listings/contact.ejs")
})
app.get("/explore", async (req, res) => {
    res.render("listings/explore.ejs");
});
app.get("/privacy", async (req, res) => {
    res.render("listings/privacy.ejs");
});
app.get("/player", async (req, res) => {
    res.render("listings/player.ejs");
});

