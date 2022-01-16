import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	create: {
		body: yup.object({
			name: yup.string().transform(sanitizeValue).required().label('Nome'),
			username: yup.string().transform(sanitizeValue).required().label('Nome de Usuário'),
			is_admin: yup.boolean().required().label('Admin'),
			password: yup.string().transform(sanitizeValue).required().label('Senha'),
			confirm_password: yup.string().transform(sanitizeValue).required().test('invalidFormat', 'As senhas não conferem', function(value) {
				return this.resolve(yup.ref('password')) === value;
			})
		}).noUnknown()
	},
	find: {
		params: yup.object({
			id: yup.number().required().label('Id Do Usuário')
		})
	},
	update: {
		body: yup.object({
			name: yup.string().transform(sanitizeValue).nullable().label('Nome'),
			password: yup.string().transform(sanitizeValue).nullable().label('Senha'),
			username: yup.string().transform(sanitizeValue).nullable().label('Nome de Usuário'),
			new_password: yup.string().transform(sanitizeValue).nullable()
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
