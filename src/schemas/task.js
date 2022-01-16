import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	create: {
		body: yup.object({
			user_id: yup.number().required().label('Id Do Usuário'),
			name: yup.string().transform(sanitizeValue).required().label('Nome'),
			status: yup.string().transform(sanitizeValue).required().label('Status'),
			label_color_id: yup.string().transform(sanitizeValue).required().label('Id Da Cor'),
			short_description: yup.string().transform(sanitizeValue).nullable().label('Descrição Curta'),
		}).noUnknown()
	}
};

export default {
	create: schema.create
};
