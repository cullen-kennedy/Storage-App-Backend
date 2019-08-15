import ModelBase from './modelbase'

export default class Category extends ModelBase {
    constructor(data) {
        super()
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.date_entered = data.date_entered
    }
}