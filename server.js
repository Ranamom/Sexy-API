import express from "express";
import cors from "cors";

import {
  GetTrendingVideosOkXXX,
  GetPopularPornstar,
  GetPopUlarVideosOkXXX,
  GetbyKeyword,
  // GetHanimeWeeklyTop, (weirdos)
  // GetPornstarsBykeyword,
  GetWeeklyHamster,
  GetRandom,
  GetPornHatPopular,
} from "./scraper/routes.js";

const app = express()
const port = process.env.PORT || 4000;

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.get("/gambit/getTop", async (req, res) => {
  const page = req.query.page;
  const data = await GetPopularPornstar({ page: page });
  res.send(data);
});

app.get("/gambit/popularxxx", async (req, res) => {
  const page = req.query.page;

  const data = await GetPopUlarVideosOkXXX({ page: page });
  res.send(data);
});

app.get("/gambit/trendingxxx", async (req, res) => {
  const page = req.query.page;

  const data = await GetTrendingVideosOkXXX({ page: page });
  res.send(data);
});

app.get("/gambit/search", async (req, res) => {
  const keyw = req.query.keyw;
  const page = req.query.page;
  console.log(`https://ok.xxx/search/${keyw}/${page}/`);
  const data = await GetbyKeyword({ keyw: keyw, page: page });
  res.send(data);
});

// app.get("/gambit/hanime", async (req, res) => {
//   const data = await GetHanimeWeeklyTop({});
//   res.send(data);
// });

// app.get("/gambit/tiavapornstars", async (req, res) => {
//   const keyw = req.query.keyw
//   const data = await GetPornstarsBykeyword({})
//   res.send(data)
//})

app.get("/gambit/weeklybest", async (req, res) => {
  const page = req.query.page;
  const data = await GetWeeklyHamster({ page: page });
  res.send(data);
});

app.get("/gambit/random", async (req, res) => {
  const data = await GetRandom({});
  res.send(data);
});
app.get("/gambit/pornhatpopular", async (req, res) => {
  const page = req.query.page;
  const data = await GetPornHatPopular({}, page)
  res.send(data);
})
app.get("/", async (req, res) => {
  res.sendFile("index.html", { root: "views" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} `);
});
