import { verify } from 'jsonwebtoken';

class AuthUtils {
	static decodeData(token, key) {
		try {
			return verify(token, key);
		} catch (err) {
			return null;
		}
	}

	static getBearerToken(req) {
		const authorization = (req.headers.authorization || '');
		const [, token] = authorization.split(' ');

		return token;
	}
}

export default AuthUtils;
