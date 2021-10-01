import * as superagent from "superagent";

export const CommentsService = {
  comment: (data, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .post(
          [
            process.env.REACT_APP_API_ENDPOINT,
            "poems",
            data.pId,
            "comments",
          ].join("/")
        )
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
          [
            process.env.REACT_APP_API_ENDPOINT,
            "poems",
            pId,
            "comments?start=0&limit=20",
          ].join("/")
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
        .post(
          [
            process.env.REACT_APP_API_ENDPOINT,
            "poems",
            "comments",
            cId,
            "react",
          ].join("/")
        )
        .set("Authorization", token)
        .end((_, response) => {
          CommentsService.respond(response, resolve, reject);
        });
    });
  },
  update: (body, cId, token) => {
    return new Promise((resolve, reject) => {
      superagent
        .patch(
          [process.env.REACT_APP_API_ENDPOINT, "poems", "comments", cId].join(
            "/"
          )
        )
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
        .delete(
          [process.env.REACT_APP_API_ENDPOINT, "poems", "comments", cId].join(
            "/"
          )
        )
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
