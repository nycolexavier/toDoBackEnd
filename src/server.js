import http from "node:http";
import { type } from "node:os";
import { getTask } from "./getTasks.js";
import { postTasks } from "./postTasks.js";
import { putTasks } from "./putTasks.js";

const users = []; // Lista de usuários (vazia por enquanto)

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === "GET" && url === "/tasks") {
    return getTask(request, response);
  }

  if (method === "POST" && url === "/tasks") {
    return postTasks(request, response);
  } else {
    // Caso nenhuma rota seja encontrada
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not found");
  }

  if (method === "PUT") {
    return putTasks(request, response);
  }
  console.log(method, url);
});

// Inicia o servidor na porta 3333
server.listen(3333, () => {
  console.log("Server is running on http://localhost:3333");
});
