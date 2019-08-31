export default class ItemForCreationDto {
    constructor(name, date, params) {
        this.name = name
        this.dateEntered = date
        this.containerId = params.containerId
    }
}