const { AppDataSource } = require('./data-source');
const app = require('./app');

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado com sucesso!");

    app.listen(3000, () => {
      console.log("Servidor Express rodando na porta 3000");
    });
  })
  .catch((error) => {
    console.error("Erro durante a inicialização do Data Source:", error);
    process.exit(1);
  });
