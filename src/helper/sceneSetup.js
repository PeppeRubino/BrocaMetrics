// File: src/helper/sceneSetup.js
// Responsibility: Handles scene creation, lighting, and group setup.

import * as THREE from 'three';

export const setupScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);
  return scene;
};

export const setupLights = (scene, camera) => {
  const ambient = new THREE.AmbientLight(0x333333);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 0.9);
  directional.castShadow = true;
  directional.position.copy(camera.position);
  scene.add(directional);
  return directional;  // Restituito per assegnare a directionalRef
};

export const setupGroups = (scene) => {
  const group = new THREE.Group();
  scene.add(group);

  const sectionGroup = new THREE.Group();
  group.add(sectionGroup);  // Aggiunto a group per ruotare con il modello

  const pointGroup = new THREE.Group();
  group.add(pointGroup);  // Aggiunto a group per ruotare con il modello

  return { group, sectionGroup, pointGroup };
};