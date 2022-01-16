import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	create: {
		body: yup.object({
			name: yup.string().transform(sanitizeValue).required().label('Nome'),
			hex_code: yup.string().transform(sanitizeValue).required().label('Hexadecimal da Cor'),
		}).noUnknown()
	},
	find: {
		params: yup.object({
			id: yup.number().required().label('Id Da Cor')
		}).noUnknown()
	},
	update: {
		body: yup.object({
			name: yup.string().transform(sanitizeValue).nullable().label('Nome'),
			hex_code: yup.string().transform(sanitizeValue).nullable().label('Hexadecimal da Cor'),
		}).noUnknown()
	}
};

export default {
	find: schema.find,
	delete: schema.find,
	create: schema.create,
	update: {
		body: schema.update.body,
		params: schema.find.params
	}
};
