import moment from 'moment';
import jwt from 'jwt-simple';

class ServerUtils {
	static generateToken(user) {
		return jwt.encode({
			id: user.id,
			name: user.name,
			is_admin: user.is_admin,
			username: user.username,
			expires_at: moment().add(7, 'day')
		}, process.env.SECRET_KEY);
	}

	static decodeToken(token) {
		try {
			return jwt.decode(token, process.env.SECRET_KEY);
		} catch (err) {
			return null;
		}
	}
}

export default ServerUtils;
