import { Actor } from '@common/types/Actor'
import { IEffect } from '@game/interfaces/IEffect'

let damaging: {
  getData: () => Actor
  getEffect: () => IEffect
}[] = []

let damaged: {
  getData: () => Actor
  applyEffect: (effect: IEffect) => void
}[] = []

export function apply() {
  damaging.forEach(item => {
    damaged.forEach(target => {
      const data = item.getData()
      const targetData = target.getData()

      if(!data) return
  
      if (
        data.x < targetData.x + targetData.width &&
        data.x + data.width > targetData.x &&
        data.y < targetData.y + targetData.height &&
        data.y + data.height > targetData.y
      ) {
        target.applyEffect(item?.getEffect())
      }
     
    })
  })
}

export function subscribeDamaging(getData: () => Actor, getEffect: () => IEffect) {
  damaging.push({
    getData,
    getEffect,
  })
}

export function subscribeDamaged(getData: () => Actor, applyEffect: (effect: IEffect) => void) {
  damaged.push({
    getData,
    applyEffect
  })
}

export function unsubscribeDamaging(getEffect: () => IEffect) {
  damaging = damaging.filter(item => item.getEffect !== getEffect)
}

export function unsubscribeDamaged(applyEffect: (effect: IEffect) => void) {
  damaged = damaged.filter(item => item.applyEffect !== applyEffect)
}
