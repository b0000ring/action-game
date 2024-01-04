import { Actor } from '@common/types/Actor'

let aimable: (() => Actor)[] = []
let aiming: {
  target: () => Actor
  getData: (target: Actor) => void
}[] = []

export function apply() {

}

export function subscribeAimable(getData: () => Actor) {
  aimable.push(getData)
}

export function unsubscribeAimable(getData: () => Actor) {
  aimable = aimable.filter(item => item !== getData)
  aiming = aiming.filter(item => item.target !== getData)
}

export function subscribeAiming(getData: (target: Actor) => void) {
  const target = aimable[0]
  aiming.push({
    target,
    getData
  })
}

export function unsubscribeAiming(getData: (target: Actor) => void) {
  aiming = aiming.filter(item => item.getData !== getData)
}