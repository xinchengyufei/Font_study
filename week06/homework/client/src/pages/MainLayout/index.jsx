import { useEffect, useState } from 'react'
import { BarChartOutlined, LineChartOutlined, TagsOutlined, FileTextOutlined, SettingFilled  } from '@ant-design/icons'
import { Layout, Menu, Popover, Switch, ConfigProvider, Button } from 'antd'
import { Outlet, useNavigate, useLocation  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLang, updateLang } from '@/store/lang'
import { removeToken } from '@/utils/token'
import { setToken } from '@/store/user'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import './index.css'

const { Header, Sider } = Layout

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const lang = useSelector((state) => state.language.lang)
  const location = useLocation()
  const locale = lang === 'zh' ? zhCN : enUS
  const getItem = (label, key, icon) => ({ key, icon, label })

  const items = [
    getItem(lang === 'zh'? '学习心得':'Study Think', '/', <FileTextOutlined />),
    getItem(lang === 'zh'? '数据管理':'Data Manager', '/details', <BarChartOutlined />),
    getItem(lang === 'zh'? '标签管理':'Tag Manager', '/tags', <TagsOutlined />),
    getItem(lang === 'zh'? '前端动态':'Font Dynamic', '/fontframe', <LineChartOutlined />),
  ]

  const activeKey = items.find(item => item.key === location.pathname)?.key

  useEffect(() => {
    dispatch(fetchLang())
  },[])

  const switchLang = async (checked) => {
    if(checked) {
      await dispatch(updateLang('zh'))
    }else {
      await dispatch(updateLang('en'))
    }
  }

  const handleLayOut = async () => {
    navigate('/login')
    await dispatch(setToken(''))
    removeToken()
  }

  return (
    <ConfigProvider locale={locale}>
      <Layout style={{minHeight:'100vh'}}>
        <Header className='page-header' >
          <div className="demo-logo page-title">{lang === 'zh'? '内容管理平台':'Content Manager Platform'}</div>
          <div className='header-right'>
            <Popover
              content={
                <Switch checked={lang === 'zh'} checkedChildren="中文" unCheckedChildren="English" onChange={switchLang} /> }
              trigger="click"
              >
              <div className="ant-dropdown-link page-setting">
                <SettingFilled /><span>{lang === 'zh'? '设置':'Setting'}</span>
              </div>
            </Popover>
            <Button type="link" onClick={handleLayOut}>{lang === 'zh'? '登出':'Layout'}</Button>
          </div>
        </Header>
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={[activeKey]} mode="inline" items={items} onClick={(e) => navigate(e.key)}/>
          </Sider>
          <Layout className='content-layout' >
            <Outlet></Outlet>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default MainLayout