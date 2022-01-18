import moment from 'moment';
import HttpStatus from 'http-status-codes';
import ServerUtils from '../utils/server-utils';

import User from '../models/user';

export default async (req, res, next) => {
	const today = moment();
	const token = req.headers.authorization || '';
	const data = ServerUtils.decodeToken(token);

	if (!token && !data ) {
		res.status(HttpStatus.FORBIDDEN).json({
			code: HttpStatus.FORBIDDEN,
			message: 'Logue no sistema para obter acesso.'
		});

		return next('Logue no sistema para obter acesso.');
	}

	const expiresAt = moment(data.expires_at);

	if (today.isAfter(expiresAt)) {
		res.status(HttpStatus.FORBIDDEN).json({
			code: HttpStatus.FORBIDDEN,
			message: 'Token expirado. Logue novamente no sistema para obter acesso.'
		});

		return next('Token expirado.');
	}

	const user = await User.findByPk(data.id);

	if (!user) {
		res.status(HttpStatus.FORBIDDEN).json({
			code: HttpStatus.FORBIDDEN,
			message: HttpStatus.getStatusText(HttpStatus.FORBIDDEN)
		});

		return next('Usuário não encontrado.');
	}

	return next();
};
