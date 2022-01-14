import BaseController from './base';
class UserController extends BaseController {
	constructor() {
		super();

		this.create = this.create.bind(this);
		//this.service = new UserService() -> Will use an UserModel to create
	}

	create() { // req,res
		/*
			Create Function:

			User -> Id, Name, User-Name, Password
		*/
	}
}

export default UserController;

