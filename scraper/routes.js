import { load } from "cheerio";
import axios from "axios";

const OkXXXPopularBase = "https://ok.xxx/popular/";
const OkxxxBase = "https://ok.xxx";
const XhamsterPopularPornstarsUrl = "https://xhamster.desi/pornstars"; //use .com if youre outside india
const XhamsterBase = "https://xhamster.desi/";
const HanimeBase = "https://hanime.tv";
const TiavaBase = "https://www.tiava.com/";
const PornHatBase = "https://www.pornhat.one/"
// Gets Top model 
export const GetPopularPornstar = async ({ list = [], page = 1 }) => {
  try {
    const res = await axios.get(XhamsterPopularPornstarsUrl + `/${page}`);
    const $ = load(res.data);
    const cherdata = $(".thumb-container > .pornstar-thumb-container").each(
      (a, el) => {
        list.push({
          PornStarImage: $(el)
            .find(".pornstar-thumb-container__original-image")
            .attr("src"),
          PornStarRank: $(el).find("a > span").text().replace(/\s\s+/g, ""),
          PornStarName: $(el)
            .find(".pornstar-thumb-container__info > div > a")
            .text().replace(/\s\s+/g, ""),
          PornStarViews: $(el)
            .find(
              ".pornstar-thumb-container__info > .pornstar-thumb-container__info-videos > div"
            )
            .first()
            .text(),
          PornStarVideos: $(el)
            .find(
              ".pornstar-thumb-container__info > .pornstar-thumb-container__info-videos > div:nth-child(2)"
            )
            .first()
            .text()
            .replace(/\s\s+/g, ""),
        });
      }
    );
    return list;
  } catch (error) {
    console.log(error.message);
  }
};

// Get Popular videos from respective website
export const GetPopUlarVideosOkXXX = async ({ list = [], page = 1 }) => {
  try {
    const res = await axios.get(OkXXXPopularBase + `${page}/`);
    const $ = load(res.data);
    const cherdata = $("#custom_list_videos_custom_common_videos_list_items > .thumb-bl ").each(
      (div, el) => {
        list.push({
          VidTitle: $(el).find("a").attr("title"),
          VidWatch: OkxxxBase + $(el).find("a ").attr("href"),
          VidThumb: "https:" + $(el).find("a > img").attr("data-original"),
        });
      }
    );
    // console.log(list)
    return list;
  } catch (error) {
    console.log(error.message);
  }
};

export const GetTrendingVideosOkXXX = async ({ list = [], page = 1 }) => {
  try {
    const res = await axios.get(OkxxxBase + `/trending/${page}/`);
    const $ = load(res.data);
    const cherdata = $("#custom_list_videos_custom_common_videos_list_items > .thumb-bl ").each(
      (div, el) => {
        list.push({
          VidTitle: $(el).find("a").attr("title"),
          VidWatch: OkxxxBase + $(el).find("a ").attr("href"),
          VidThumb: "https:" + $(el).find("a > img").attr("data-original"),
        });
      }
    );
    console.log(list)
    return list;
  } catch (error) {
    console.log(error.message);
  }
};

// search for videos by keyword
export const GetbyKeyword = async ({ list = [], page = 1, keyw }) => {
  try {
    if (!keyw)
      return {
        error: "No keyword Specified",
      };
    const res = await axios.get(OkxxxBase + `/search/${keyw}/${page}/`);
    const $ = load(res.data);
    const cherdata = $(
      "#custom_list_videos_custom_videos_list_search_result_items> .thumb-bl "
    ).each((div, el) => {
      list.push({
        VidTitle: $(el).find("a").attr("title"),
        VidWatch: OkxxxBase + $(el).find("a ").attr("href"),
        VidThumb: "https:" + $(el).find("a > img").attr("data-original"),
      });
    });
    return list;
  } catch (error) {
    console.log(error.message);
  }
};

// // get hentai (totally weird) removing hanime and shit because weebs are weird
// export const GetHanimeWeeklyTop = async ({ list = [] }) => {
//   try {
//     const res = await axios.get(HanimeBase + "/browse/trending");
//     const $ = load(res.data);
//     const cherdata = $(
//       ".layout.results.flex.row > .flex.xs12.justify-center.align-center.wrap > .elevation-3.mb-3.hvc.item.card"
//     ).each((a, el) => {
//       list.push({
//         HanimeName: $(el).find("a").attr("alt"),
//         HanimeRank: $(el)
//           .find(
//             "a > div > div.card__title > div.hvc__content.flex.column.justify-center.align-center > div.hvc__slot_data"
//           )
//           .text()
//           .replace(/\s\s+/g, ""),
//         WatchHanime: `${HanimeBase}${$(el).find("a").attr("href")}`,
//       });
//     });
//     return list;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const GetPornstarsBykeyword = async ({ keyw, list = [] }) => {
//   try {
//     if (!keyw) {
//       keyw = "a";
//     }
//     const res = await axios.get(`${TiavaBase}pornstar/`);
//     const $ = load(res.data);
//     const loadkey = $(
//       ".category-all-container > mobile-category-list-view > .category-group"
//     ).attr(`${keyw}`);
//     const cherdata = $(loadkey)
//       .find("ul > li")
//       .each((a, el) => {
//         list.push({
//           PornstarName: $(el).find("a").attr("href"),
//         });
//       });
//     return list;
//   } catch (error) {
//     console.log(error);
//   }
// };

// get weekly top videos by hamster
export const GetWeeklyHamster = async ({ list = [], page = 1 }) => {
  try {
    const res = await axios.get(`${XhamsterBase}best/weekly/${page}`);
    const $ = load(res.data);
    const cherdata = $(
      ".mixed-section.index-videos > .thumb-list.thumb-list--sidebar > .thumb-list__item.video-thumb"
    ).each((div, el) => {
      list.push({
        VidTitle: $(el)
          .find("div > .video-thumb-info__name")
          .text()
          .replace(/\s\s+/g, ""),
        VidLink: $(el).find("a").attr("href"),
        VidThumb: $(el).find("a > img").attr("src"),
        VidViews: $(el)
          .find("div > .video-thumb-info__metrics > .views")
          .text()
          .replace(/\s\s+/g, ""),
        VidRating: $(el)
          .find("div > .video-thumb-info__metrics > .rating ")
          .text()
          .replace(/\s\s+/g, ""),
      });
    });
    console.log(`${XhamsterBase}best/weekly/${page}`);
    return list;
  } catch (error) {
    console.log(error);
  }
};

// cant decide? here a random vid
export const GetRandom = async ({ list = [] }) => {
  try {
    const res = await axios.get(OkXXXPopularBase);
    const $ = load(res.data);
    const cherdata = $("#custom_list_videos_custom_common_videos_list_items > .thumb-bl ").each(
      (div, el) => {
        list.push({
          VidTitle: $(el).find("a").attr("title"),
          VidWatch: OkxxxBase + $(el).find("a ").attr("href"),
          VidThumb: "https:" + $(el).find("a > img").attr("data-original"),
        });
      }
    );

    return list[Math.floor(Math.random() * list.length)];
  } catch (error) {
    console.log(error.message);
  }
};

export const GetPornHatPopular = async ({ list = [] }, page = 1) => {
  try {
    console.log(page)
    const res = await axios.get(`${PornHatBase}popular/${page}/`)
    const $ = load(res.data);
    const cherdata = $("#list_videos_common_videos_list_items > .thumb-bl-video").each((div, el) => {
      list.push({
        VidTitle: $(el).find("a").attr("title"),
        VidWatch: PornHatBase + $(el).find("a ").attr("href"),
        VidThumb: "https:" + $(el).find("a > img").attr("data-original"),
      });
    })
    return list;
  } catch (error) {
    console.log(error.message);
  }
}