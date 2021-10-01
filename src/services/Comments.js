import * as superagent from "superagent";
import config from "./config";

export const CommentsService = {
  comment: (data, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .post([config.BACKEND, "poems", data.pId, "comments"].join("/"))
        .set("Authorization", token)
        .send(data)
        .end((_, response) => {
          CommentsService.respond(response, resolve, reject);
        });
    });
  },
  getComments: (pId) => {
    return new Promise((resolve, reject) => {
      superagent
        .get(
          [config.BACKEND, "poems", pId, "comments?start=0&limit=20"].join("/")
        )
        .end((_, response) => {
          CommentsService.respond(response, resolve, reject);
        });
    });
  },
  react: (cId, token) => {
    console.log(cId, token);
    return new Promise((resolve, reject) => {
      superagent
        .post([config.BACKEND, "poems", "comments", cId, "react"].join("/"))
        .set("Authorization", token)
        .end((_, response) => {
          CommentsService.respond(response, resolve, reject);
        });
    });
  },
  update: (body, cId, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .patch([config.BACKEND, "poems", "comments", cId].join("/"))
        .set("Authorization", token)
        .send({ body })
        .end((_, response) => {
          CommentsService.respond(response, resolve, reject);
        });
    });
  },
  delete: (cId, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .delete([config.BACKEND, "poems", "comments", cId].join("/"))
        .set("Authorization", token)
        .end((_, response) => {
          CommentsService.respond(response, resolve, reject);
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
