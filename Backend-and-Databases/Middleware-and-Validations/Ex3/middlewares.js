const { performance } = require("node:perf_hooks");

function loggerWithTiming(req, res, next) {
  const start = performance.now();
  const ts = new Date().toISOString();
  res.on("finish", () => {
    const ms = (performance.now() - start).toFixed(1);
    console.log(
      `[${ts}] ${req.ip} ${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`
    );
  });
  next();
}

const hits = new Map();
function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection?.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 60_000;
  const max = 10;

  const arr = hits.get(ip) || [];
  const recent = arr.filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);

  if (recent.length > max) {
    res.set("Retry-After", "60");
    return res
      .status(429)
      .json({ error: "Too many requests, try again later" });
  }
  next();
}

function requireJson(req, res, next) {
  if (req.method === "POST" || req.method === "PUT") {
    if (!req.is("application/json")) {
      return res
        .status(415)
        .json({ error: "Unsupported Media Type: application/json required" });
    }
  }
  next();
}

function responseFormatter(req, res, next) {
  res.ok = (data, status = 200) =>
    res.status(status).json({ success: true, data });
  res.fail = (status = 400, message = "Bad Request", details) => {
    const payload = { success: false, error: message };
    if (details) payload.details = details;
    return res.status(status).json(payload);
  };
  next();
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  const message = err.message || "Server error";
  const details = err.details;
  const payload = { success: false, error: message };
  if (details) payload.details = details;
  res.status(status).json(payload);
}

module.exports = {
  loggerWithTiming,
  rateLimiter,
  requireJson,
  responseFormatter,
  errorHandler,
};
