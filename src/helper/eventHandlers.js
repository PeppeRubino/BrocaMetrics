// File: src/helper/eventHandlers.js
// Responsibility: Handles all event-related logic and computations.

import * as THREE from 'three';

export const computeNDCFromClient = (clientX, clientY, renderer) => {
  const rect = renderer.domElement.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((clientY - rect.top) / rect.height) * 2 + 1;
  return { x, y };
};

export const handleClick = (e, renderer, camera, mouse, raycaster, modelMeshesRef, computeNDCFromClient) => {
  const ndc = computeNDCFromClient(e.clientX, e.clientY, renderer);
  mouse.x = ndc.x;
  mouse.y = ndc.y;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(modelMeshesRef.current, true);

  // Se non ci sono intersezioni, esci subito
  if (intersects.length === 0) return;

  const obj = intersects[0].object;
  if (!obj) return;

  // Cambia colore della parte cliccata
  obj.material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  // Logga informazioni solo se c'è un oggetto valido
  console.log('Parte cliccata:');
  console.log('UUID:', obj.userData.partId);
  console.log('Nome mesh:', obj.name);
  console.log('Oggetto completo:', obj);
};



export const handleTouchStart = (ev, clickTouchStateRef) => {
  const t = ev.touches?.[0];
  if (t) {
    clickTouchStateRef.current.startX = t.clientX;
    clickTouchStateRef.current.startY = t.clientY;
    clickTouchStateRef.current.time = Date.now();
    clickTouchStateRef.current.down = true;
  }
};

export const handleTouchEnd = (ev, renderer, camera, mouse, raycaster, modelMeshesRef, clickTouchStateRef, computeNDCFromClient) => {
  const touches = ev.changedTouches;
  if (touches && touches.length > 0) {
    const t = touches[0];
    const start = clickTouchStateRef.current;
    const dx = Math.abs(t.clientX - start.startX);
    const dy = Math.abs(t.clientY - start.startY);
    const dt = Date.now() - start.time;
    if (dx < 10 && dy < 10 && dt < 500) {
      const ndc = computeNDCFromClient(t.clientX, t.clientY, renderer);
      mouse.x = ndc.x; mouse.y = ndc.y;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(modelMeshesRef.current, true);
      if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj) obj.material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
      }
    }
  }
  clickTouchStateRef.current.down = false;
};

export const handlePointerDown = (ev, userInteractingRef, animationPausedRef, clickTouchStateRef, renderer, wasPausedRef) => {
  userInteractingRef.current = true;
  wasPausedRef.current = animationPausedRef.current; // salva lo stato attuale
  animationPausedRef.current = true;
  clickTouchStateRef.current.down = true;
  clickTouchStateRef.current.startX = ev.clientX || (ev.touches?.[0]?.clientX) || 0;
  clickTouchStateRef.current.startY = ev.clientY || (ev.touches?.[0]?.clientY) || 0;
  clickTouchStateRef.current.time = Date.now();
  renderer.domElement.style.cursor = 'grabbing';
};

export const handlePointerUp = (userInteractingRef, clickTouchStateRef, renderer, animationPausedRef, wasPausedRef) => {
  userInteractingRef.current = false;
  clickTouchStateRef.current.down = false;
  renderer.domElement.style.cursor = 'auto';
  // Riprendi solo se non era in pausa manuale
  if (!wasPausedRef.current) {
    animationPausedRef.current = false;
  }
};
