import { useEffect, useState } from 'react'
import { getTagsApi } from '@/services/tags'

export default function useOptions() {
    const [options, setOptions] = useState([])

    async function fetchTags() {
        const res = await getTagsApi()
        setOptions(res.data)
    }

    // 用于获取标签，搜索框用到，modal里用到，标签管理里也用到了，复用一下
    useEffect(() => {
        fetchTags()
    },[])

    return {options, fetchTags}
}
