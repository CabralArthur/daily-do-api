import BaseController from './base';
import HttpStatus from 'http-status-codes';
import ColorService from '../services/color';

class ColorController extends BaseController {
	constructor() {
		super();

		this.service = new ColorService();
		this.list = this.list.bind(this);
		this.find = this.find.bind(this);
		this.create = this.create.bind(this);
		this.delete = this.delete.bind(this);
		this.update = this.update.bind(this);
	}

	async list(req, res) {
		try {
			const colors = await this.service.list();

			this.successHandler(colors, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async find(req, res) {
		try {
			const filter = {
				id: req.params.id
			};

			const color = await this.service.find(filter);

			this.successHandler(color, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async update(req, res) {
		try {
			const options = {
				data: { ...req.data },
				filter: { ...req.params }
			};

			const updatedColor = await this.service.update(options);

			this.successHandler(updatedColor, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async delete(req, res) {
		try {
			const filter = {
				id: req.params.id
			};

			const deletedColor = await this.service.delete(filter);

			this.successHandler(deletedColor, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async create(req, res) {
		try {
			const data = {
				name: req.data.name,
				hex_code: req.data.hex_code
			};

			const color = await this.service.create(data);

			if (!color) {
				res.status(HttpStatus.CONFLICT).json({
					code: HttpStatus.CONFLICT,
					message: 'Já existe uma cor cadastrada com esse código.'
				});
			}

			res.status(HttpStatus.OK).json({ data: color });
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}

export default ColorController;

