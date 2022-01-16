'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('tasks', {
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
			user_id: {
				type: Sequelize.DataTypes.INTEGER,
				references: { model: 'users', key: 'id' }
			},
			short_description: {
				allowNull: true,
				defaultValue: null,
				type: Sequelize.DataTypes.STRING(60)
			},
			label_color_id: {
				allowNull: true,
				defaultValue: null,
				type: Sequelize.DataTypes.INTEGER,
				references: { model: 'colors', key: 'id' }
			},
			status: {
				allowNull: false,
				defaultValue: 'NOT_STARTED',
				type: Sequelize.DataTypes.STRING(25)
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
		await queryInterface.dropTable('tasks');
	}
};
