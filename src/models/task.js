import BaseModel from './base';

class Task extends BaseModel {
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
			user_id: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			short_description: {
				allowNull: true,
				defaultValue: null,
				type: DataTypes.STRING(60)
			},
			label_color_id: {
				allowNull: true,
				defaultValue: null,
				type: DataTypes.INTEGER
			},
			status: {
				allowNull: false,
				type: DataTypes.STRING(25),
				defaultValue: 'NOT_STARTED'
			},
			updated_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
			},
			deleted_at: {
				defaultValue: null,
				type: DataTypes.DATE
			}
		}, {
			paranoid: true,
			timestamps: true,
			sequelize: sequelize,
			modelName: 'task',
			tableName: 'tasks',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			scopes: {
				defaultWhere: userId => {
					return {
						paranoid: false,
						where: {
							deleted_at: null,
							user_id: userId
						}
					};
				}
			}
		});
	}

	static associate(models) {
		this.belongsTo(models.user, { foreignKey: 'user_id' });
		this.belongsTo(models.color, { foreignKey: 'label_color_id' });
	}
}


export default Task;

