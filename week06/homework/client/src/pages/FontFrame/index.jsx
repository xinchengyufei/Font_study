import { useEffect, useState } from 'react'
import { Layout, theme } from 'antd'
import StackLineCharts from '@/components/StackLineCharts'
import { getFrameApi } from '@/services/fontFrame'
import './index.css'

const { Content } = Layout

const FontFrame = () => {
  const frame = ['react', 'vue', 'angular']
  const { token: { colorBgContainer }, } = theme.useToken()
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState({
    xAxisData: [],
    yAxisSeries:[{ data: [] }],
  })
  const windosSize = 7

  // 窗口滑动计算平均下载量
  const slidingWindowAverage = (data) => {
    let result = []
    let windowSum = data.slice(0, windosSize).reduce((acc, curr) => acc + curr, 0)
    result.push(windowSum / windosSize)

    // 每次滑动减去最左边的和加上最右边的就可得到窗口内的总和与平均
    for (let i = windosSize; i < data.length; i++) {
        windowSum = windowSum - data[i - windosSize] + data[i]
        result.push((windowSum / windosSize).toFixed(2))
    }

    // 返回数组比原来少了前windosSize-1天的数据
    return result
  }

  useEffect(() => {
    const fetchData = async () => {
      const responses = []
      for (let i = 0; i < frame.length; i++) {
        try {
          const { code, data } = await getFrameApi(frame[i])
          if (code === 200) {
            const { downloads } = data
            const dayData = downloads.map(download => download.day)
            const downloadsData = downloads.map(download => download.downloads)
            const resDownloadsData = slidingWindowAverage(downloadsData)

            responses.push({
              xAxisData: dayData.slice(windosSize-1),
              yAxisSeries: [{ data: resDownloadsData, }]
            })
          }
        } catch (error) {
          console.error(`Failed to fetch ${frame[i]}:`, error)
        }
      }
      const mergedData = responses.reduce((acc, response) => {
        acc.xAxisData = [ ...response.xAxisData ]
        acc.yAxisSeries.push(...response.yAxisSeries)
        return acc
      }, { ...chartData })
      setChartData(mergedData)
      setLoading(!loading)
    }
  
    fetchData()
  }, [])

  return (
    <Content className='content' style={{ background: colorBgContainer }}>
      <StackLineCharts chartData={chartData} loading={loading}></StackLineCharts>
    </Content>
  )
}

export default FontFrame