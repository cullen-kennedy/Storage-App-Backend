export default class ItemDto {
    constructor(item) {
        this.id = item.id
        this.name = item.name
        this.link = "api/items/" + item.id
        this.dateEntered = item.dateEntered
        this.rel = {
             name: item.containerName,
             link: "api/containers/" + item.containerId
            }
    }
}