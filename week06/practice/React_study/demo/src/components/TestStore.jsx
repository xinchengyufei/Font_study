import { useDispatch, useSelector } from "react-redux"
import { updatename } from "../store/actions"


export default function TestStore() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    return (
        <div>
            <hr></hr>
            name : { user.name }
            <button onClick={ () => dispatch(updatename("小小"))}>修改姓名</button>
        </div>
    )
}
