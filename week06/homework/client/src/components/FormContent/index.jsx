import { Form, Input, Select, DatePicker, Button, Layout, theme} from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import useOptions from '@/hooks/useOptions'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh');
import './index.css'

const { Content } = Layout
const { RangePicker } = DatePicker

export default function FormContent({ handleSearch, handleReset}) {
    const {options,_} = useOptions()
    const lang = useSelector((state) => state.language.lang)
    const { token: { colorBgContainer}, } = theme.useToken()
    const [searchForm] = Form.useForm()
    lang === 'zh'? dayjs.locale('zh-cn'):dayjs.locale('en')

    // 表单提交事件，回调父类的搜索处理函数
    const onFinish = (values) => {
        handleSearch(values)
    }
    
    // 重置函数，表单信息重置功能
    const onClickReset = () => {
        searchForm.resetFields()
        handleReset()
    }

    return (
        <Content className='top-content content' style={{ background: colorBgContainer }}>
            <Form form={searchForm} className='form' layout="inline" onFinish={onFinish}>
                <Form.Item label={lang === 'zh'?'名称：':'name'} className='search-input' name="name">
                    <Input showCount placeholder="请输入搜索名称" maxLength={20} />
                </Form.Item>
                <Form.Item label={lang === 'zh'?'标签：':'tag'} className='select-tags' name="tag">
                    <Select showSearch placeholder="请输入标签" allowClear
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) }
                    >
                        {options.map( (item) => ( <Select.Option key={item.id} value={item.id}>{ item.name }</Select.Option>))}
                    </Select>
                </Form.Item>
                {lang === 'zh'?'添加时间：':'add time：'}<Form.Item className='date-pick' name="date">
                    <RangePicker format="YYYY-MM-DD HH:mm:ss" showTime />
                </Form.Item>
                <Form.Item className='button-area'>
                    <Button className='search-button' type="primary" htmlType="submit" icon={<SearchOutlined />}>
                        {lang === 'zh'?'搜索':'search'}
                    </Button>
                    <Button onClick={onClickReset} htmlType="button" icon={<ReloadOutlined style={{ transform: 'rotate(90deg)' }}/>}>
                        {lang === 'zh'?'重置':'reset'}
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    )
}