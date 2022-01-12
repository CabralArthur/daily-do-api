import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';

import Database from './databases';
import Logger from './utils/logger';

class App {
	constructor() {
		dotenv.config({ path: `${__dirname}/../.env` });

		this.app = express();
		this.port = process.env.PORT || 3000;
		this.httpServer = http.createServer(this.app);

		this.logger = new Logger();
		this.database = new Database();
	}

	async setup() {
		await this.database.connect();

		this.app.use(express.json({ limit: '100000kb' }));
		this.app.use(express.urlencoded({ extended: false, limit: '100000kb' }));
		this.app.use(cors());
		this.app.use(helmet());
	}

	gracefulStop() {
		return () => {
			this.httpServer.close(async error => {
				await this.database.disconnect();

				return error ? process.exit(1) : process.exit(0);
			});
		};
	}

	start() {
		this.httpServer.listen(this.port, () => {
			Logger.success(`Server running port ${this.port}`);
			this.setup();
		});

		process.on('SIGINT', this.gracefulStop());
	}
}

export default App;
