const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "David Kunnuji is a skilled full-stack web developer with a passion for creating user-friendly and visually appealing web applications. With several years of experience in the industry, he has a solid understanding of web development technologies, including HTML, CSS, JavaScript, React, Node.js, and MongoDB. David's expertise in both front-end and back-end development enables him to create dynamic and responsive web applications that meet clients' needs."
const aboutContent = "David Kunnuji is a skilled full-stack web developer with a passion for creating user-friendly and visually appealing web applications. With several years of experience in the industry, he has a solid understanding of web development technologies, including HTML, CSS, JavaScript, React, Node.js, and MongoDB. David's expertise in both front-end and back-end development enables him to create dynamic and responsive web applications that meet clients' needs. He has experience working with various frameworks and libraries such as Express, Angular, and Vue.js, allowing him to choose the most suitable solution for each project. David is committed to delivering high-quality work on time and within budget. He is an excellent communicator who thrives in collaborative environments and enjoys working closely with clients to ensure that their vision is fully realized. In his free time, David enjoys keeping up with the latest web development trends and exploring new technologies. He is a problem solver who enjoys tackling complex challenges and finding innovative solutions.";
const contactContent = "Let's get in touch to discuss your needs and how I can help. Please feel free to contact me via email, and I will get back to you as soon as possible. I look forward to hearing from you!";

const app = express();

app.set('view engine', 'ejs');

const posts = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {homeContent: homeStartingContent, message: posts})
});


app.get("/about", function(req, res) {
  res.render("about", {acontent: aboutContent})
});

app.get("/contact", function(req, res) {
  res.render("contact", {ccontent: contactContent})
});

app.get("/compose", function(req, res) {
  res.render("compose")
});

app.post("/Compose", function(req, res) {
  const textInput = {
    title: req.body.title,
    body: req.body.post
};
posts.push(textInput);
res.redirect("/");
});

app.get("/posts/:topic", function(req, res) {
let topics = _.lowerCase(req.params.topic);

posts.forEach(function(post) {
let storedTitle = _.lowerCase(post.title)

if (topics === storedTitle){
  res.render("post", {bTitle: post.title, content: post.body})
}
})
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
