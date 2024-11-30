export function putTasks(request, response) {
  response.setHeader("Content-Type", "application/json");

  request.on("data", (chunk) => {
    chunk = JSON.parse(chunk);

    console.log({ chunk });
  });
}
