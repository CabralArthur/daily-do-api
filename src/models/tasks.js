import BaseModel from './base';

class Task extends BaseModel {
    static load(sequelize) {
		return super.init({}, {
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
	}
}


export default Task;

