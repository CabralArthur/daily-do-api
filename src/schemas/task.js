import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	create: {
		body: yup.object({
			user_id: yup.number().required().label('Id Da Task'),
			name: yup.string().transform(sanitizeValue).required().label('Nome'),
			label_color_id: yup.string().transform(sanitizeValue).required().label('Id Da Cor'),
			short_description: yup.string().transform(sanitizeValue).nullable().label('Descrição Curta'),
			status: yup.string().transform(sanitizeValue).oneOf(['NOT_STARTED', 'STARTED', 'FINISHED']).required().label('Status'),
		}).noUnknown()
	},
	find: {
		params: yup.object({
			id: yup.number().required().label('Id Da Task')
		}).noUnknown()
	},
	update: {
		body: yup.object({
			name: yup.string().transform(sanitizeValue).nullable().label('Nome'),
			status: yup.string().transform(sanitizeValue).nullable().label('Status'),
			label_color_id: yup.string().transform(sanitizeValue).nullable().label('Id Da Cor'),
			short_description: yup.string().transform(sanitizeValue).nullable().label('Descrição Curta')
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
	},
};
