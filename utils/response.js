module.exports = (ctx, data, error = null, code = 200) => {
  ctx.status = code;
  ctx.body = {
    error,
    data,
    success: !error ? true : false,
  };
  return ctx;
};
