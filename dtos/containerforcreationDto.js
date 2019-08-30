export default class ItemForCreationDto {
    constructor(name, date, category_id, location_id) {
        this.name = name
        this.date_entered = date
        this.category_id = category_id
        this.location_id = location_id
    }
}