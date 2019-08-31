export default class ContainerDto {
    constructor(container) {
        this.id = container.id
        this.name = container.name
        this.link = "api/containers/" + container.id
        this.dateEntered = container.dateEntered
        this.rel = {
            categoryName: container.categoryName,
            locationName: container.locationName
        }
    }
}