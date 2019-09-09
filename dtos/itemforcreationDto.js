export default class ItemForCreationDto {
    constructor(name, date, params, userId) {
        this.name = name
        this.dateEntered = date
        this.containerId = params.containerId
        this.userId = userId
    }
}