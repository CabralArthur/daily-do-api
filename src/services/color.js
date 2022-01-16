import Color from '../models/color';

class ColorService {
	constructor() {
		this.colorModel = Color.getInstance();
		this.colorReadModel = Color.getInstance('replica');
	}

	list() {
		return this.colorReadModel.findAll();
	}

	async delete(filter) {
		return this.colorModel.destroy({
			where: { id: filter.id}
		});
	}

	async create(color) {
		const hasExistentColor = await this.colorReadModel.count({
			where: {
				hex_code: color.hex_code
			}
		});

		if (hasExistentColor) {
			return null;
		}

		const createdColor = this.colorReadModel.create(color);

		return createdColor;
	}

	async update({ data, filter }) {
		const colorInfo = {
			...data
		};

		const updatedColor = await this.colorModel.update(colorInfo, {
			where: { id: filter.id }
		});

		return updatedColor;
	}


	find(filter) {
		return this.colorReadModel.findAll({
			where: { id: filter.id }
		});
	}

}

export default ColorService;
