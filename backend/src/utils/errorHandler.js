const { ZodError } = require('zod');

const formatZodErrors = (error) => {
  return error.issues.reduce((acc, issue) => {
    const path = issue.path.join('.');
    acc[path] = issue.message;
    return acc;
  }, {});
};

const handleControllerError = (res, error, customMessages = {}) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Erro de validação dos dados de entrada.",
      errors: formatZodErrors(error),
    });
  }

  const status = customMessages[error.message];
  if (status) {
    return res.status(status).json({ message: error.message });
  }

  console.error("Erro interno do servidor:", error);
  return res.status(500).json({ message: "Erro interno do servidor." });
};

module.exports = { handleControllerError };
