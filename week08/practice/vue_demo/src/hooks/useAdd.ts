import { ref } from 'vue';
export const useAdd = () => {
    
    const arr = ref([{
        id:1,
        name:"吃饭",
        done:false,
    }])
    
    const msg = ref('')
    
    const handleUp = (e : KeyboardEvent) => {
        if(e.key === 'Enter'){
            arr.value.push({
                id:arr.value.length +1,
                name:msg.value,
                done:false,
            })
            msg.value = ''
        }
    }
    return {arr, msg, handleUp}
}