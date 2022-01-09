import BaseModel from './base';

class User extends BaseModel {
	static load(sequelize) {
		return super.init({}, {
			timestamps: true,
			sequelize: sequelize,
			modelName: 'user',
			tableName: 'users',
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		});
	}
}

export default User;
