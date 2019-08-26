export default class ContainerItemResourceParameters {
    constructor(params) {
        this.containerId = params.Cid || null
        this.itemId = params.Iid || null
    }

    containerIdIsValid() {
        if (!this.containerId || isNaN(parseInt(this.containerId, 10))) {
            return false
        }
        return true
    }

    itemIdIsValid() {
        if (!this.itemId || isNaN(parseInt(this.itemId, 10))) {
            return false
        }
        return true
    }
}