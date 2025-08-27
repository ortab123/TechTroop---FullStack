function loggingMiddleware(req, res, next) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${req.method} ${req.url}`);
  next();
}

let globalRequestCount = 0;
function requestCounterMiddleware(req, res, next) {
  globalRequestCount += 1;
  req.requestCount = globalRequestCount;
  next();
}

module.exports = { loggingMiddleware, requestCounterMiddleware };
