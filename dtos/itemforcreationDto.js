export default class ItemForCreationDto {
    constructor(name, date, params) {
        this.name = name
        this.date_entered = date
        this.container_id = params.containerId
    }
}