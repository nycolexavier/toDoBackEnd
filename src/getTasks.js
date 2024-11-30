export function getTask(request, response) {
  
    // Configura o cabeçalho para JSON
    response.setHeader("Content-Type", "application/json");

    // Envia os dados armazenados em 'users'
    return response.end(JSON.stringify(users));
}
