import { Model } from 'sequelize';

class BaseModel extends Model {
    static init() {
        this.instances = {};

        return super.init(...arguments);
    }

    static setInstance(instanceName, instance) {
        this.instance[instanceName] = instance;
    }

    static getInstance(instanceName) {
        return this.instances[instanceName] || this.instances['master'];
    }
}

export default BaseModel;