'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				type: Sequelize.DataTypes.INTEGER
			},
			name: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING(100)
			},
			username: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING(50)
			},
			is_admin: {
				allowNull: false,
				defaultValue: false,
				type: Sequelize.DataTypes.BOOLEAN,
			},
			password: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING(60)
			},
			updated_at: {
				type: Sequelize.DataTypes.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			created_at: {
				type: Sequelize.DataTypes.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			deleted_at: {
				defaultValue: null,
				type: Sequelize.DataTypes.DATE
			}
		});
	},
	down: async queryInterface => {
		await queryInterface.dropTable('users');
	}
};
