import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	create: {
		body: yup.object({
			name: yup.string().transform(sanitizeValue).required().label('Nome'),
			username: yup.string().transform(sanitizeValue).required().label('Nome de Usuário'),
			is_admin: yup.boolean().required().label('Admin'),
			password: yup.string().transform(sanitizeValue).required().label('Senha'),
			confirm_password: yup.string().transform(sanitizeValue).required()
		}).noUnknown()
	},
};

export default {
	create: schema.create
};
