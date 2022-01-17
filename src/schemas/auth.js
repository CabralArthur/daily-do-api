import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	authenticate: {
		body: yup.object({
			username: yup.string().transform(sanitizeValue).required().label('Nome de Usuário'),
			password: yup.string().transform(sanitizeValue).required().label('Senha')
		}).noUnknown()
	}
};

export default {
	authenticate: schema.authenticate,
};
