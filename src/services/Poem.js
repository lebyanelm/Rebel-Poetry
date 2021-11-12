import * as superagent from "superagent";
import config from "../config";

export const PoemService = {
  // Gets poem data from the backend
  getPoemData: (pId) => {
    return new Promise((resolve, reject) => {
      superagent
        .get([config.BACKEND, "poems", pId].join("/"))
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },

  // Get the details of a poet
  getPoemAuthors: (authorIds) => {
    return new Promise((resolve, reject) => {
      superagent
        .get([config.BACKEND, "authors", authorIds].join("/"))
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },

  // Gets a list of poems suggested for as a feed
  getUnauthenticatedFeed: () => {
    return new Promise((resolve, reject) => {
      superagent
        .get([config.BACKEND, "poems", "feed"].join("/"))
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },

  updateDraft: (data, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .post([config.BACKEND, "drafts"].join("/"))
        .send({ ...data })
        .set("Authorization", token)
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },
  updatePoem: (data, pId, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .patch([config.BACKEND, "poems", pId].join("/"))
        .send(data)
        .set("Authorization", token)
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },
  likePoem: (pId, token) => {
    console.log(pId, token)
    return new Promise((resolve, reject) => {
      superagent
        .post([config.BACKEND, "poems", pId, "react"].join("/"))
        .set("Authorization", token)
        .end((_, response) => {
          // Response will bring back a number of likes that are synced with the server.
          PoemService.respond(response, resolve, reject);
        });
    });
  },
  bookmarkPoem: (pId, token) => {
    console.log(pId, token)
    return new Promise((resolve, reject) => {
      superagent
        .post([config.BACKEND, "poems", "bookmark"].join("/"))
        .set("Authorization", token)
        .send({ pId })
        .end((_, response) => {
          // Response returns synced bookmarks numbers of the poem
          PoemService.respond(response, resolve, reject);
        });
    });
  },
  deletePoem: (pId, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .delete([config.BACKEND, "poems", pId].join("/"))
        .set("Authorization", token)
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },
  getDraft: (did, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .get([config.BACKEND, "drafts", did].join("/"))
        .set("Authorization", token)
        .end((_, response) => {
          PoemService.respond(response, resolve, reject);
        });
    });
  },
  uploadThumbnail: (file, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .put([config.BACKEND, "assets", "upload"].join("/"))
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
        .post([config.BACKEND, "publish", data.did].join("/"))
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
    else
      reject(
        "No internet connection. Please connect your device and try again."
      );
  },
};
