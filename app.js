const express    = require("express");
const app        = express();
const path       = require("path");
const ejsMate    = require("ejs-mate");
const session    = require('express-session');
const mongoose   = require('mongoose');
const axios      = require('axios');
const nodemailer = require('nodemailer');
let port = 8080;
require('dotenv').config();

// ══════════════════════════════════════════════════
//  ENGINE & VIEWS
// ══════════════════════════════════════════════════
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("view options", { root: path.join(__dirname, "views") });

// ══════════════════════════════════════════════════
//  MIDDLEWARE — ORDER MATTERS
// ══════════════════════════════════════════════════
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  const systemPrompt = `You are Algo, a smart study assistant for Algorium...

STRICT RULES:
- ONLY answer DS, Web Dev, AI/ML
- If not → say: "I can only help with Data Structures, Web Development, and AI/ML topics. Please ask something related to your studies!"
- Keep answers clear and simple`;

  try {
      const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    contents: [
      {
        parts: [
          {
            text: `${systemPrompt}\n\nQuestion: ${message}`
          }
        ]
      }
    ]
  }
);

    const reply = response.data.candidates[0].content.parts[0].text;

    res.json({ reply });
  } catch (err) {
    console.error('Gemini error FULL:', err.response?.data?.error || err.message);
    res.json({ reply: 'Something went wrong. Please try again.'});
  }
});
app.use(session({
  secret           : 'algorium-secret-key',
  resave           : false,
  saveUninitialized: false,
  cookie           : { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Make currentUser available in ALL ejs views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.student || null;
  res.locals.bodyClass   = "";
  next();
});

// ══════════════════════════════════════════════════
//  DATABASE
// ══════════════════════════════════════════════════
mongoose.connect('mongodb://127.0.0.1:27017/algorium')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB connection error:', err));

// ══════════════════════════════════════════════════
//  ROUTE FILES
// ══════════════════════════════════════════════════
const authRoutes   = require('./routes/auth');
const quizRoutes   = require('./routes/quiz');
const requireLogin = require('./middleware/requireLogin');

app.use('/', authRoutes);
app.use('/', quizRoutes);

// ══════════════════════════════════════════════════
//  GENERAL PAGES
// ══════════════════════════════════════════════════
app.get("/", async (req, res) => {
  res.render("listings/home.ejs");
});
app.get("/ai-intro", async (req, res) => {
  res.render("listings/ai-intro.ejs");
});
app.get("/webdev-intro", async (req, res) => {
  res.render("listings/webdev-intro.ejs");
});
app.get("/ds-intro", async (req, res) => {
  res.render("listings/ds-intro.ejs");
});
app.get("/about", async (req, res) => {
  res.render("listings/about.ejs");
});
app.get("/faculty", async (req, res) => {
  res.render("listings/faculty.ejs");
});
app.get("/contact", async (req, res) => {
  res.render("listings/contact.ejs");
});
app.get("/explore", async (req, res) => {
  res.render("listings/explore.ejs");
});
app.get("/privacy", async (req, res) => {
  res.render("listings/privacy.ejs");
});

// ══════════════════════════════════════════════════
//  CONTACT EMAIL
// ══════════════════════════════════════════════════
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Algoriumhelp@gmail.com',
      pass: 'swxunoajmxwlgtwc'
    }
  });

  const mailOptions = {
    from   : email,
    to     : 'algoriumhelp@gmail.com',
    subject: `New Message from Algorium Contact — ${name}`,
    html   : `
      <h2 style="color:#FF5500;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('EMAIL ERROR:', err.message);
    res.json({ success: false });
  }
});

// ══════════════════════════════════════════════════
//  PLAYER ROUTES — PROTECTED
// ══════════════════════════════════════════════════
app.get('/player', requireLogin, (req, res) => {
  res.redirect('/player/0');
});

app.get('/player/:lessonId', requireLogin, async (req, res) => {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const PLAYLIST_ID = "PLaldQ9PzZd9qT0KsKJ7yCq70iFFP3MFJ5";
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      { params: { part: "snippet", maxResults: 50, playlistId: PLAYLIST_ID, key: API_KEY } }
    );
    const items = response.data.items || [];

    if (!items.length) {
      throw new Error("No videos found or API failed");
    }

    const videos = items.map((item, index) => ({
      id: index.toString(),
      videoId: item.snippet?.resourceId?.videoId || "",
      title: item.snippet?.title || "No Title",
      description: item.snippet?.description || "",
      duration: "",
      views: "",
      completed: false,
      globalIndex: index
    }));
    const currentIndex = parseInt(req.params.lessonId);
    res.render('listings/player.ejs', {
      course        : { id: "1", instructor: "AI School", instructorAvatar: "/images/ai.png" },
      currentVideo  : { ...videos[currentIndex], index: currentIndex },
      prevVideo     : currentIndex > 0 ? videos[currentIndex - 1] : null,
      nextVideo     : currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null,
      sections      : [{ id: "1", title: "Playlist", totalDuration: "", videos }],
      completedCount: 0, totalCount: videos.length,
      progressPercent: Math.floor((currentIndex / videos.length) * 100),
      activeSectionIndex: 0,
      topic: "ai"
    });
  } catch (err) {
    console.error("YOUTUBE ERROR:", err.response?.data || err.message);
    res.send("Error loading playlist");
  }
});

app.get('/player1', requireLogin, (req, res) => {
  res.redirect('/player1/0');
});

app.get('/player1/:lessonId', requireLogin, async (req, res) => {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const PLAYLIST_ID = "PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w";
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      { params: { part: "snippet", maxResults: 50, playlistId: PLAYLIST_ID, key: API_KEY } }
    );
    const items = response.data.items || [];

    if (!items.length) {
      throw new Error("No videos found or API failed");
    }

    const videos = items.map((item, index) => ({
      id: index.toString(),
      videoId: item.snippet?.resourceId?.videoId || "",
      title: item.snippet?.title || "No Title",
      description: item.snippet?.description || "",
      duration: "",
      views: "",
      completed: false,
      globalIndex: index
    }));
    const currentIndex = parseInt(req.params.lessonId);
    res.render('listings/player.ejs', {
      course        : { id: "1", instructor: "Code With Harry", instructorAvatar: "/images/dev.png" },
      currentVideo  : { ...videos[currentIndex], index: currentIndex },
      prevVideo     : currentIndex > 0 ? videos[currentIndex - 1] : null,
      nextVideo     : currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null,
      sections      : [{ id: "1", title: "Playlist", totalDuration: "", videos }],
      completedCount: 0, totalCount: videos.length,
      progressPercent: Math.floor((currentIndex / videos.length) * 100),
      activeSectionIndex: 0,
      topic: "webdev"
      
    });
  } catch (err) {
    console.error("YOUTUBE ERROR:", err.response?.data || err.message);
    res.send("Error loading playlist");
  }
});

app.get('/player2', requireLogin, (req, res) => {
  res.redirect('/player2/0');
});

app.get('/player2/:lessonId', requireLogin, async (req, res) => {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const PLAYLIST_ID = "PLVHgQku8Z936EUyyl9WKYkvbJ5lJqTHPx";
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      { params: { part: "snippet", maxResults: 50, playlistId: PLAYLIST_ID, key: API_KEY } }
    );
    const items = response.data.items || [];

    if (!items.length) {
      throw new Error("No videos found or API failed");
    }

    const videos = items.map((item, index) => ({
      id: index.toString(),
      videoId: item.snippet?.resourceId?.videoId || "",
      title: item.snippet?.title || "No Title",
      description: item.snippet?.description || "",
      duration: "",
      views: "",
      completed: false,
      globalIndex: index
    }));
    const currentIndex = parseInt(req.params.lessonId);
    res.render('listings/player.ejs', {
      course        : { id: "1", instructor: "Intellipat", instructorAvatar: "/images/ds.png" },
      currentVideo  : { ...videos[currentIndex], index: currentIndex },
      prevVideo     : currentIndex > 0 ? videos[currentIndex - 1] : null,
      nextVideo     : currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null,
      sections      : [{ id: "1", title: "Playlist", totalDuration: "", videos }],
      completedCount: 0, totalCount: videos.length,
      progressPercent: Math.floor((currentIndex / videos.length) * 100),
      activeSectionIndex: 0,
      topic: "datascience"
    });
  } catch (err) {
    console.error("YOUTUBE ERROR:", err.response?.data || err.message);
    res.send("Error loading playlist");
  }
});

// ══════════════════════════════════════════════════
//  START SERVER
// ══════════════════════════════════════════════════
app.listen(port, () => {
  console.log("Listening to Port 8080");
});
