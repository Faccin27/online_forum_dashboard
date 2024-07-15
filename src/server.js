const app = require("./app");

const DOOR = 3001;

app.listen(DOOR, () => { console.log(`Servidor escutando na porta ${DOOR}`) })
