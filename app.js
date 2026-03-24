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



const axios = require('axios');

app.get('/player', (req, res) => {
  res.redirect('/player/0');
});

app.get('/player/:lessonId', async (req, res) => {
  const API_KEY = "AIzaSyBJ1d7QOMG0bDc641nLskI8dfy8OOj3Vb4";
  const PLAYLIST_ID = "PLaldQ9PzZd9qT0KsKJ7yCq70iFFP3MFJ5";

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          maxResults: 50,
          playlistId: PLAYLIST_ID,
          key: API_KEY
        }
      }
    );

    const videos = response.data.items.map((item, index) => ({
      id: index.toString(),
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      duration: "N/A",
      views: "N/A",
      completed: false,
      globalIndex: index
    }));

    const currentIndex = parseInt(req.params.lessonId);

    const sections = [{
      id: "1",
      title: "Playlist",
      totalDuration: "",
      videos
    }];

    res.render('listings/player.ejs', {
      course: {
        id: "1",
        instructor: "YouTube",
        instructorAvatar: "/images/rnlogo.png"
      },
      currentVideo: {
        ...videos[currentIndex],
        index: currentIndex
      },
      prevVideo: currentIndex > 0 ? videos[currentIndex - 1] : null,
      nextVideo: currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null,
      sections,
      completedCount: 0,
      totalCount: videos.length,
      progressPercent: Math.floor((currentIndex / videos.length) * 100),
      activeSectionIndex: 0
    });

  } catch (err) {
    console.error(err);
    res.send("Error loading playlist");
  }
});


app.get('/player1', (req, res) => {
  res.redirect('/player1/0');
});

app.get('/player1/:lessonId', async (req, res) => {
  const API_KEY = "AIzaSyBJ1d7QOMG0bDc641nLskI8dfy8OOj3Vb4";
  const PLAYLIST_ID = "PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w";

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          maxResults: 50,
          playlistId: PLAYLIST_ID,
          key: API_KEY
        }
      }
    );

    const videos = response.data.items.map((item, index) => ({
      id: index.toString(),
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      duration: "N/A",
      views: "N/A",
      completed: false,
      globalIndex: index
    }));

    const currentIndex = parseInt(req.params.lessonId);

    const sections = [{
      id: "1",
      title: "Playlist",
      totalDuration: "",
      videos
    }];

    res.render('listings/player.ejs', {
      course: {
        id: "1",
        instructor: "YouTube",
        instructorAvatar: "/images/rnlogo.png"
      },
      currentVideo: {
        ...videos[currentIndex],
        index: currentIndex
      },
      prevVideo: currentIndex > 0 ? videos[currentIndex - 1] : null,
      nextVideo: currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null,
      sections,
      completedCount: 0,
      totalCount: videos.length,
      progressPercent: Math.floor((currentIndex / videos.length) * 100),
      activeSectionIndex: 0
    });

  } catch (err) {
    console.error(err);
    res.send("Error loading playlist");
  }
});


app.get('/player2', (req, res) => {
  res.redirect('/player2/0');
});

app.get('/player2/:lessonId', async (req, res) => {
  const API_KEY = "AIzaSyBJ1d7QOMG0bDc641nLskI8dfy8OOj3Vb4";
  const PLAYLIST_ID = "PLVHgQku8Z936EUyyl9WKYkvbJ5lJqTHPx";

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          maxResults: 50,
          playlistId: PLAYLIST_ID,
          key: API_KEY
        }
      }
    );

    const videos = response.data.items.map((item, index) => ({
      id: index.toString(),
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      duration: "N/A",
      views: "N/A",
      completed: false,
      globalIndex: index
    }));

    const currentIndex = parseInt(req.params.lessonId);

    const sections = [{
      id: "1",
      title: "Playlist",
      totalDuration: "",
      videos
    }];

    res.render('listings/player.ejs', {
      course: {
        id: "1",
        instructor: "YouTube",
        instructorAvatar: "/images/rnlogo.png"
      },
      currentVideo: {
        ...videos[currentIndex],
        index: currentIndex
      },
      prevVideo: currentIndex > 0 ? videos[currentIndex - 1] : null,
      nextVideo: currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null,
      sections,
      completedCount: 0,
      totalCount: videos.length,
      progressPercent: Math.floor((currentIndex / videos.length) * 100),
      activeSectionIndex: 0
    });

  } catch (err) {
    console.error(err);
    res.send("Error loading playlist");
  }
});
