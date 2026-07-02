import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { useUiStore } from '@/stores/ui'

interface Props {
  type:
    | 'line'
    | 'area'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'heatmap'
    | 'candlestick'
    | 'radar'
    | 'polarArea'
  series: ApexOptions['series']
  options?: ApexOptions
  height?: number | string
  width?: number | string
}

/**
 * Theme-aware ApexCharts wrapper. Merges sensible defaults (brand palette,
 * dark-mode foreground) with caller options so charts match the template.
 */
export default function ApexChart({
  type,
  series,
  options = {},
  height = 300,
  width = '100%',
}: Props) {
  const darkMode = useUiStore((s) => s.darkMode)

  const merged = useMemo<ApexOptions>(() => {
    const fg = darkMode ? '#98a2b3' : '#667085'
    const grid = darkMode ? '#1f2937' : '#e4e7ec'
    return {
      chart: {
        fontFamily: 'inherit',
        foreColor: fg,
        toolbar: { show: false },
        zoom: { enabled: false },
        ...options.chart,
      },
      colors: options.colors ?? ['#485fc7', '#48c774', '#f59e0b', '#f14668', '#3273dc'],
      grid: { borderColor: grid, strokeDashArray: 4, ...options.grid },
      tooltip: { theme: darkMode ? 'dark' : 'light', ...options.tooltip },
      legend: { labels: { colors: fg }, ...options.legend },
      dataLabels: { enabled: false, ...options.dataLabels },
      stroke: { curve: 'smooth', width: 2, ...options.stroke },
      ...options,
    }
  }, [options, darkMode])

  return <ReactApexChart type={type} series={series} options={merged} height={height} width={width} />
}
