export default class ItemForCreationDto {
    constructor(name, date, categoryId, locationId) {
        this.name = name
        this.dateEntered = date
        this.categoryId = categoryId
        this.locationId = locationId
    }
}