import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';

class App {
	constructor() {
		dotenv.config({ path: `${__dirname}/../.env` });

		this.app = express();
		this.port = process.env.PORT || 3000;
		this.httpServer = http.createServer(this.app);
	}

	setup() {
		this.app.use(express.json({ limit: '100000kb' }));
		this.app.use(express.urlencoded({ extended: false, limit: '100000kb' }));
		this.app.use(cors());
		this.app.use(helmet());
	}

	gracefulStop() {
		return () => {
			this.httpServer.close(error => {
				return error ? process.exit(1) : process.exit(0);
			});
		};
	}

	start() {
		this.httpServer.listen(this.port, () => this.setup());

		process.on('SIGINT', this.gracefulStop());
	}
}

export default App;
