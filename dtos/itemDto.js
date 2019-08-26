export default class ItemDto {
    constructor(item) {
        this.id = item.id
        this.name = item.name
        this.link = "api/items/" + item.id
        this.date_entered = item.date_entered
        this.rel = {
             name: item.container_name,
             link: "api/containers/" + item.container_id
            }
    }
}