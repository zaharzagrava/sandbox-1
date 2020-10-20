import { Sequelize, DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

import { ClientDTO, CreateClientDTO } from 'src/interfaces';

export default class Client
  extends Model<ClientDTO, CreateClientDTO>
  implements ClientDTO {
  public id!: number;
  public full_name!: string;
  public username!: string;
  public website!: string;
  public bio!: string;
  public avatar!: string;
  public email!: string;
  public phone_number!: string;
  public gender!: string;
  public password!: () => string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly clients?: Client[];

  constructor() {
    super();
  }

  static initModel(sequelize: Sequelize): Model<ClientDTO, CreateClientDTO> {
    return this.init(
      {
        full_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },

        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },

        website: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },

        bio: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },

        avatar: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },

        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },

        phone_number: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },

        gender: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },

        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
          get() {
            return () => this.getDataValue('password');
          },
        },
      },
      {
        sequelize,
        modelName: 'clients',
        timestamps: true,
        freezeTableName: true,
        tableName: 'clients',
        hooks: {
          beforeCreate: async (model: any) => {
            if (model.changed('password')) {
              model.password = bcrypt.hashSync(
                model.password(),
                Number(process.env.BCRYPT_SALT_ROUNDS)
              );
            }
          },
          beforeUpdate: async (model: any) => {
            if (model.changed('password')) {
              model.password = bcrypt.hashSync(
                model.password(),
                Number(process.env.BCRYPT_SALT_ROUNDS)
              );
            }
          },
        },
      }
    );
  }

  authenticate(password: string) {
    return bcrypt.compareSync(password, this.password());
  }
}
