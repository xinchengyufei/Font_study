import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import './index.css'

export default function StackLineCharts({ chartData, loading }) {
    // 绑定图标要存放处的DOM
    const chartRef = useRef(null)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    // 页面渲染后执行一次，后面随着数据变化也执行
    useEffect(() => {
        const myChart =  echarts.init(chartRef.current)
        
        if (!loading) return () => {
            if (myChart && myChart.dispose) {
                myChart.dispose()
            }
        }
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['react', 'vue', 'angular']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: chartData.xAxisData,
                axisLabel: {
                    formatter: function (value) {
                        const date = new Date(value);
                        if ([0, 3, 6, 9].includes(date.getMonth())) {
                            return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
                        } else {
                            return ''
                        }
                    }
                }
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: 'angular',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    data: chartData.yAxisSeries[3].data
                },
                {
                    name: 'vue',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    data: chartData.yAxisSeries[2].data
                },
                {
                    name: 'react',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    data: chartData.yAxisSeries[1].data
                },
            ]
        }
        option && myChart.setOption(option)
    },[loading])
        
  return (
    <div className='chart-area' ref={chartRef} ></div>
  )
}