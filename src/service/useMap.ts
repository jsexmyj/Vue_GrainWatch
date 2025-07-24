import { ref, onMounted, watch, type Ref } from 'vue'
import L from 'leaflet'
import { ElMessage } from 'element-plus'

export function useMap(resultPath: Ref<string>) {
  let map: L.Map | null = null
  let resultLayer: L.Rectangle | null = null

  const initMap = (): void => {
    if (map) {
      map.remove()
    }

    map = L.map('map', {
      center: [39.9042, 116.4074],
      zoom: 6,
      zoomControl: true
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map)

    L.control.scale().addTo(map)
  }

  const loadResultOnMap = async (path: string): Promise<void> => {
    if (!map || !path) return

    try {
      if (resultLayer) {
        map.removeLayer(resultLayer)
      }

      const bounds = L.latLngBounds([
        [35, 110],
        [45, 120]
      ])

      resultLayer = L.rectangle(bounds, {
        color: '#ff0000',
        weight: 2,
        opacity: 0.8,
        fillColor: '#00ff00',
        fillOpacity: 0.3
      }).addTo(map)

      resultLayer.bindPopup(`
        <div style="font-family: '微软雅黑', sans-serif;">
          <h4 style="margin: 0 0 8px 0; color: #1f2937;">耕地识别结果</h4>
          <p style="margin: 0; font-size: 12px; color: #6b7280;">
            绿色区域：识别为耕地<br>
            结果文件：${path}
          </p>
        </div>
      `)

      map.fitBounds(bounds, { padding: [20, 20] })
      ElMessage.success('结果已在地图上显示')

    } catch (error) {
      console.error('加载地图结果失败:', error)
      ElMessage.error('地图结果加载失败')
    }
  }

  watch(resultPath, (newPath: string) => {
    if (newPath) {
      loadResultOnMap(newPath)
    }
  })

  onMounted(() => {
    initMap()
  })

  return {
    initMap,
    loadResultOnMap
  }
}