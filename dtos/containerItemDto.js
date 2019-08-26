export default class ContainerItemDto {
    constructor(item) {
        this.id = item.id
        this.name = item.name
        this.link = "api/items/" + item.id
        this.date_entered = item.date_entered
    }
}