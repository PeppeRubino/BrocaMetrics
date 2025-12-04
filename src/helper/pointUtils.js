// File: src/helper/pointUtils.js
import * as THREE from 'three';
import { BROADMANN_POINTS } from '../components/Variables.jsx';

export const createPoints = () => {
  const points = [];

  for (let i = 0; i < 52; i++) {
    const geom = new THREE.SphereGeometry(0.5, 16, 16);
    const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const m = new THREE.Mesh(geom, mat);

    // Prendi la posizione dal campo 'pos' dell'oggetto
    const pointData = BROADMANN_POINTS[i] || { pos: [0, 0, 0] };
    const pos = pointData.pos;

    m.position.set(pos[0], pos[1], pos[2]);
    m.visible = false;
    points.push(m);
  }

  return points;
};
