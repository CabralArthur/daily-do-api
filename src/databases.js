import fs from 'fs';
import Sequelize from 'sequelize';

import Logger from './utils/logger';

class Database {
    constructor() {

    }

    _loadModels() {
		fs.readdirSync(`${__dirname}/models`, { withFileTypes: true })
        .filter(entry => fs.statSync(`${__dirname}/models/${entry.name}`).isFile())

        Logger.message('Loaded Files.')
    }

    connect() {
        this._loadModels();

    }
}

export default Database
