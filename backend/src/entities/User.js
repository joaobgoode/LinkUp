const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    nome: {
      type: 'varchar',
      nullable: false
    },
    email: {
      unique: true,
      type: 'varchar',
      nullable: false
    },
    password: {
      type: 'varchar',
      nullable: false
    },
    //Codigo de referência do usuário
    referralCode: {
      type: 'uuid',
      nullable: false,
      unique: true,
      default: () => 'uuid_generate_v4()'
    },
    //Contagem de usuarios que utilizaram o código de referência
    referralCodeCount: {
      type: 'int',
      nullable: false,
      default: 0
    },
    //User id do usuario cujo codigo foi utilizado para se cadastrar
    referralUser: {
      type: 'int',
      nullable: true,
    },
    refreshToken: {
      type: "varchar",
      nullable: true,
    },
    createdAt: {
      type: 'timestamp',
      nullable: true,
      default: () => 'CURRENT_TIMESTAMP'
    }
  },
})
