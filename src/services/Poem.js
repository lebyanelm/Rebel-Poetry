import * as superagent from "superagent";

export const PoemService = {
  // Gets poem data from the backend
  getPoemData: (pId) => {
    return new Promise((resolve, reject) => {
      superagent
        .get([process.env.REACT_APP_API_ENDPOINT, "poems", pId].join("/"))
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },

  // Get the details of a poet
  getPoemAuthors: (authorIds) => {
    return new Promise((resolve, reject) => {
      superagent
        .get(
          [process.env.REACT_APP_API_ENDPOINT, "authors", authorIds].join("/")
        )
        .end((_, response) => {
          console.log("response", response);
          PoemService.respond(response, resolve, reject);
        });
    });
  },

  // Gets a list of poems suggested for as a feed
  getUnauthenticatedFeed: () => {
    return new Promise((resolve, reject) => {
      superagent
        .get([process.env.REACT_APP_API_ENDPOINT, "poems", "feed"].join("/"))
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },

  updateDraft: (data, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .post([process.env.REACT_APP_API_ENDPOINT, "drafts"].join("/"))
        .send({ ...data })
        .set("Authorization", token)
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },
  getDraft: (did, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .get([process.env.REACT_APP_API_ENDPOINT, "drafts", did].join("/"))
        .set("Authorization", token)
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },
  uploadThumbnail: (file, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .put([process.env.REACT_APP_API_ENDPOINT, "assets", "upload"].join("/"))
        .set("Authorization", token)
        .attach("file", file)
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },
  // Publishes a poem to the the community for reading
  publish: (data, tags, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .post([process.env.REACT_APP_API_ENDPOINT, "publish", data.did].join("/"))
        .set("Authorization", token)
        .send({ tags: tags.split(","), is_anonymous: data.is_anonymous })
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },
  respond: (response, resolve, reject) => {
    if (response)
      if (response.statusCode === 200) resolve(response.body.data);
      else reject(response.body.reason || "Something went wrong.");
    else reject("No internet connection. Please connect your device and try again.");
  },
};
