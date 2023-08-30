import { SystemData } from '@common/types/SystemData'

let data: SystemData | null = null

function calculateSystemData(): SystemData {
  return {
    screenSize: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}

export function getSystemData(): SystemData {
  if(!data) {
    data = calculateSystemData()
  }

  return data
}

