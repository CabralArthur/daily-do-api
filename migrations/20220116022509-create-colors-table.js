'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('colors', {
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
			hex_code: {
				allowNull: true,
				type: Sequelize.DataTypes.STRING(6)
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
		await queryInterface.dropTable('colors');
	}
};
