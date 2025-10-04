const regexSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function validarSenha(senha) {
  return regexSenha.test(senha)
}

function validarEmail(email) {
  return regexEmail.test(email)
}

function validarNome(nome) {
  return nome.length >= 1
}

function validarConfirmacaoSenha(senha, confirmacao) {
  return senha === confirmacao
}

export { validarSenha, validarEmail, validarNome, validarConfirmacaoSenha }
