const users = [];

function configDayAtual() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  console.log(`${day}/${month}/${year}`);

  return `${day}/${month}/${year}`;
}

let id = 1; // Variável para gerar IDs únicos para cada usuário

export function postTasks(request, response) {
  response.setHeader("Content-Type", "application/json");

  // recebi os dados
  request.on("data", (chunk) => {
    chunk = JSON.parse(chunk);

    const acceptedFields = ["title", "description"];
    const receivedKeys = Object.keys(chunk);
    const isValid =
      receivedKeys.length === acceptedFields.length &&
      receivedKeys.every((key) => acceptedFields.includes(key));

    console.log({ isValid });
    if (isValid) {
      if (
        typeof chunk.title === "string" &&
        typeof chunk.description === "string"
      ) {
        if (chunk.title != "" && chunk.description != "") {
          chunk.id = id;
          chunk.completed_at = null;
          chunk.created_at = configDayAtual();
          users.push(chunk);

          id++;
        } else {
          return response.end(
            JSON.stringify({ error: "Título e descrição são obrigatórios" })
          );
        }
      } else {
        return response.writeHead(400).end("Tipos inválidos de dados.");
      }
    } else {
      return response.writeHead(400).end("Invalid field dados.");
    }
  });

  // quando eu paro de receber, coloca no users
  request.on("end", () => {
    console.log(users);
    console.log("aaaa");
    return response.end(JSON.stringify(users));
  });
}
