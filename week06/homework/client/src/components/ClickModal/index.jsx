import { useEffect, useState } from 'react'
import { Form, Modal, Input, Select, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import useOptions from '@/hooks/useOptions'
import { useSelector } from 'react-redux'
 
export default function ClickModal({modalForm, mode, isModalVisible, handleOk, handleCancel }) {
    
    // token获取、下拉框选项、以及图片列表 
    const token = useSelector((state) => state.user.token)
    const lang = useSelector((state) => state.language.lang)
    const {options, _} = useOptions()
    const [imageList, setImageList] = useState([])

    // 上传图片按钮，当上传图片大于3张则不出现上传按钮
    const uploadButton = (
        <button
            style={{ border: 0, background: 'none', }} type="button" >
            <PlusOutlined />
            <div style={{ marginTop: 8, }} >
                Upload
            </div>
        </button>
    )

    useEffect(() => {
        // 编辑模式下将图片展示在页面上
        if (!mode) {
            setImageList([])
            return
        } else {
            const urlField = modalForm.getFieldValue('url')
            if(urlField) {
                setImageList([ { status: 'done', url: urlField, }])
            }
        }
    }, [isModalVisible, modalForm])

    const handleChange = ({ fileList: newImageList }) => { 
        setImageList(newImageList) 
    }

    // 将图片上传成功后的url置于表单中，随着添加一起送入服务器
    const onSuccess = async (response ) => {
        await modalForm.setFieldsValue({ url: response.path })
        setImageList([{ uid: -1, status: 'done', url: response.path, name: 'name.png' }])
    }

    // 图片上传失败
    const onFailure = () => {
        setImageList([{ uid: -1, status: 'error' }])
    }

    const validateNoSpaces = (rule, value, callback) => {
        if (value && value.includes(' ')) {
          callback(new Error('输入中不能包含空格'));
        } else {
          callback();
        }
    }

    return (
        <Modal title={mode ? (lang === 'zh'?"修改记录":"edit Recoder"):(lang === 'zh'?"添加记录":"add Recoder")} open={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
            <Form form={modalForm} layout="horizontal" >
                <Form.Item label={lang === 'zh'?"名称:":"name:"} name="name"
                    rules={[ { required: true, message: '* 请输入名称', }, { validator: validateNoSpaces },]}
                >
                    <Input showCount placeholder="请输入名称" maxLength={20} />
                </Form.Item>
                <Form.Item label={lang === 'zh'?"描述:":"description:"} name="description"
                    rules={[ { required: true, message: '* 请输入描述', }, ]}
                >
                    <Input.TextArea showCount  rows={3} maxLength={50} placeholder="请输入描述" />
                </Form.Item>
                <Form.Item label={lang === 'zh'?"标签:":"tag:"} name="tags" >
                    <Select mode="multiple" placeholder="请输入标签">
                        {options.map( (item) => ( <Select.Option key={item.id} value={item.id}>{ item.name }</Select.Option>))}
                    </Select>
                </Form.Item>
                <Form.Item label={lang === 'zh'?"上传:":"upload:"} name="url">
                    <Upload name="avatar" action="/api/upload" fileList={imageList} listType="picture-card"
                        headers={ {'Authorization': 'Bearer ' + token,} } showUploadList
                        onChange={handleChange} onSuccess={onSuccess} onFailure={onFailure}
                    >
                        {imageList.length >= 3 ? null : uploadButton}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}