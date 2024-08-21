import { Ref } from "vue"

type IItem = {
    id:number,
    name:string,
    done:boolean,
}

export const useDel = (arr:Ref<IItem[]>) => {
    const handleDel = (id:number) => {
        arr.value = arr.value.filter(item => item.id !== id)
    }
    return {handleDel}
}