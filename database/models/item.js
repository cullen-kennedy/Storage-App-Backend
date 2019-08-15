import ModelBase from './modelbase'

export default class Item extends ModelBase {
    constructor(data) {
        super()
        this.id = data.id
        this.name = data.name
        this.container_id = data.container_id
        this.date_entered = data.date_entered
    }
}


