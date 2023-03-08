const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
// const cors = require("cors");
const cors = require("@koa/cors");
const router = new Router();
const app = new Koa();
const response = require("./utils/response");

const PORT = 3456;

const setupServer = (db) => {
  router.post("/satisfaction", async (ctx, next) => {
    const { name, value, timestamp } = ctx.request.body;

    const queryPromise = () =>
      new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO satisfaction (name, value, timestamp) VALUES (?, ?, ?)",
          [name, value, timestamp],
          function (err) {
            if (err) reject(err);
            resolve(this.lastID);
          }
        );
      });

    try {
      const result = await queryPromise();
      response(ctx, result, null, 201);
    } catch (err) {
      response(ctx, null, err, 500);
    }
  });

  router.get("/satisfaction", async (ctx, next) => {
    const queryPromise = () =>
      new Promise((resolve, reject) => {
        db.all("SELECT * FROM satisfaction", [], function (err, rows) {
          if (err) reject(err);
          resolve(rows);
        });
      });

    try {
      const result = await queryPromise();
      response(ctx, result, null, 200);
    } catch (err) {
      response(ctx, null, err, 500);
    }
  });

  app.use(cors({ origin: "*" }));
  app.use(bodyParser());
  app.use(router.routes());

  return app.listen(PORT, () => console.log(`Listening on ${PORT} port`));
};

module.exports = setupServer;
