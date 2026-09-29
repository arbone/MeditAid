import http from "node:http";

const port = Number(process.env.PORT || 3001);

const meditations = [
  { id: "gratitudine", title: "Gratitudine" },
  { id: "respiro", title: "Respiro" },
  { id: "rilassamento-profondo", title: "Rilassamento Profondo" },
];

const sendJson = (res, status, payload) => {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
};

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  if (req.method === "GET" && req.url === "/health") {
    return sendJson(res, 200, {
      status: "ok",
      service: "meditaid-api",
      timestamp: new Date().toISOString(),
    });
  }

  if (req.method === "GET" && req.url === "/api/meditations") {
    return sendJson(res, 200, { meditations });
  }

  return sendJson(res, 404, { error: "Not found" });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`MeditAid API listening on port ${port}`);
});
