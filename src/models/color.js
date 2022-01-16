import BaseModel from './base';

class User extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init({
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				type: DataTypes.INTEGER
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING(100)
			},
			hex_code: {
				allowNull: true,
				type: DataTypes.STRING(6)
			},
			updated_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
			}
		}, {
			timestamps: true,
			paranoid: true,
			sequelize: sequelize,
			modelName: 'color',
			tableName: 'colors',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at'
		});
	}
}

export default User;
