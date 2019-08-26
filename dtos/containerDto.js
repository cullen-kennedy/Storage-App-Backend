export default class ContainerDto {
    constructor(container) {
        this.id = container.id
        this.name = container.name
        this.link = "api/containers/" + container.id
        this.date_entered = container.date_entered
        this.rel = {
            category_name: container.category_name,
            location_name: container.location_name
        }
    }
}