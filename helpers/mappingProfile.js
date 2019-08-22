import ItemDto from '../dtos/itemDto'
import ContainerDto from '../dtos/containerDto'
import ContainerItemDto from '../dtos/containerItemDto'

export class Mapper {

    static itemToDto(item) {
        let Itemdto = new ItemDto(item)
        
        return Itemdto
    }

    static containerToDto(container) {
        let containerDto = new ContainerDto(container)
        
        return containerDto
    }

    static containerItemToDto(containerItem) {
        let Itemdto = new ContainerItemDto(containerItem)
        
        return Itemdto
    }

}