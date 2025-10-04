const z = require('zod');
const regexSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

const UserSchema = z.object({
  id: z.number().int().positive().optional(),
  nome: z.string().min(1, "O nome não pode ser vazio."),
  email: z.email("Formato de e-mail inválido."),
  password: z.string().regex(regexSenha, "Senha inválida."),
  referralCode: z.uuid("Link de referência inválido.").optional(),
  referralCodeCount: z.number().int().min(0, "O contador de referências não pode ser negativo.").default(0),
  referralUser: z.number().int().positive().nullable().optional(),
  refreshToken: z.string().nullable().optional(),
  createdAt: z.date().optional(),
});

const CreateUserSchema = z.object({
  nome: UserSchema.shape.nome,
  email: UserSchema.shape.email,
  password: UserSchema.shape.password,
});

const UserRegistration = z.object({
  nome: UserSchema.shape.nome,
  email: UserSchema.shape.email,
  password: UserSchema.shape.password,
  referralToken: z.uuid("Link de referência inválido.").optional(),
})

const LoginSchema = z.object({
  email: UserSchema.shape.email,
  password: z.string("Senha inválida."),
});

const UpdateUserSchema = z.object({
  nome: UserSchema.shape.nome.optional(),
  email: UserSchema.shape.email.optional(),
  password: CreateUserSchema.shape.password.optional(),
  referralCodeCount: UserSchema.shape.referralCodeCount.optional(),
  refreshToken: UserSchema.shape.refreshToken,
  referralUser: UserSchema.shape.referralUser,
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "Pelo menos um campo deve ser fornecido para a atualização.",
    path: ['_root'],
  }
);

module.exports = {
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  LoginSchema,
  UserRegistration
};
