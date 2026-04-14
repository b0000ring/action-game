import { Actor } from "@common/types/Actor";

export type CollisionDirection = "up" | "down" | "left" | "right";

export type CollisionOffset = { x: number; y: number };

type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CollidedEntry = {
  previousData: Actor;
  getData: () => Actor;
  cb: (direction: CollisionDirection) => void;
};

type CollidingEntry = {
  getData: () => Actor;
  cb: (direction: CollisionDirection, data: CollisionOffset) => void;
};

type CollisionCallback =
  (direction: CollisionDirection, data: CollisionOffset) => void;

const OVERLAP_Y_TOLERANCE = 0;
const DOWN_OFFSET_BASE = 0;
const DOWN_OVERLAP_MIN = 0;
const SIDE_OFFSET_BASE = 0;
const SIDE_OFFSET_MIN = 0;

let colliding: CollidingEntry[] = [];
let collided: CollidedEntry[] = [];

function getSpeed(data: Actor) {
  if (!data.modificators.speed) {
    return { speedx: 0, speedy: 0 };
  }

  return data.modificators.speed;
}

function getMovingBounds(data: Actor): Bounds {
  const { speedx, speedy } = getSpeed(data);
  const previousX = data.x - speedx;
  const previousY = data.y - speedy;

  return {
    x: Math.min(previousX, data.x),
    y: Math.min(previousY, data.y),
    width: data.width + Math.abs(data.x - previousX),
    height: data.height + Math.abs(data.y - previousY),
  };
}

function getTargetBounds(targetData: Actor, targetPreviousData: Actor): Bounds {
  return {
    x: Math.min(targetPreviousData.x, targetData.x),
    y: Math.min(targetPreviousData.y, targetData.y),
    width: targetData.width + Math.abs(targetData.x - targetPreviousData.x),
    height: targetData.height + Math.abs(targetData.y - targetPreviousData.y),
  };
}

function intersects(a: Bounds, b: Bounds) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function apply(data: Actor, cb: CollisionCallback) {
  const sourceBounds = getMovingBounds(data);
  const sourceId = data.modificators.id;

  for (let i = 0; i < collided.length; i += 1) {
    const target = collided[i];
    const targetData = target.getData();
    const targetBounds = getTargetBounds(targetData, target.previousData);

    if (sourceId === targetData.modificators.id) {
      continue;
    }

    if (!intersects(sourceBounds, targetBounds)) {
      continue;
    }

    const dx =
      sourceBounds.x +
      sourceBounds.width / 2 -
      (targetBounds.x + targetBounds.width / 2);
    const dy =
      sourceBounds.y +
      sourceBounds.height / 2 -
      (targetBounds.y + targetBounds.height / 2);
    const totalWidth = (sourceBounds.width + targetBounds.width) / 2;
    const totalHeight = (sourceBounds.height + targetBounds.height) / 2;
    const overlapX = totalWidth - Math.abs(dx);
    const overlapY = totalHeight - Math.abs(dy);

    if (overlapX >= overlapY - OVERLAP_Y_TOLERANCE) {
      if (dy > 0) {
        cb("up", { x: 0, y: targetData.y + targetData.height - data.y });
        target.cb("down");
        continue;
      }

      const offset = overlapY * -1 + DOWN_OFFSET_BASE;
      cb("down", { x: 0, y: overlapY > DOWN_OVERLAP_MIN ? offset : 0 });
      target.cb("up");
      continue;
    }

    if (dx > 0) {
      const offset = overlapX - SIDE_OFFSET_BASE;
      cb("left", {
        x: overlapX > 0 && overlapX < SIDE_OFFSET_MIN ? offset : 0,
        y: 0,
      });
      target.cb("right");
      continue;
    }

    const offset = overlapX - SIDE_OFFSET_BASE;
    cb("right", {
      x: overlapX > 0 && overlapX < SIDE_OFFSET_MIN ? -offset : 0,
      y: 0,
    });
    target.cb("left");
  }
}

export function subscribeCollided(
  getData: () => Actor,
  cb: (direction: CollisionDirection) => void,
) {
  collided.push({
    previousData: getData(),
    getData,
    cb,
  });
}

export function unsubscribeCollided(
  cb: (direction: CollisionDirection) => void,
) {
  collided = collided.filter((item) => item.cb !== cb);
}

export function subscribeColliding(getData: () => Actor, cb: CollisionCallback) {
  colliding.push({
    getData,
    cb,
  });
}

export function unsubscribeColliding(cb: CollisionCallback) {
  colliding = colliding.filter((item) => item.cb !== cb);
}

export function checkCollisions(cb: CollisionCallback) {
  const source = colliding.find((item) => item.cb === cb);

  if (!source) {
    return;
  }

  apply(source.getData(), source.cb);
}
