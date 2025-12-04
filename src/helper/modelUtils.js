import * as THREE from 'three';

export const frameModelToView = (model, camera, controls, containerRect, padding = 1.2) => {
  if (!model || !camera) return;

  // bounding box e centro (in world del model prima della normalizzazione)
  const bbox = new THREE.Box3().setFromObject(model);
  const size = bbox.getSize(new THREE.Vector3());
  const center = bbox.getCenter(new THREE.Vector3());

  // porta il centro del modello all'origine locale (mantieni questa trasformazione)
  model.position.sub(center);

  // dimensione massima e calcolo della distanza basata sul FOV
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let distance = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * padding;

  // se mobile, aumenta la distanza (mantieni il comportamento precedente)
  const isMobile = containerRect && containerRect.width < 600;
  if (isMobile) distance *= 1.7;

  // BACK OFFSET: mettiamo la camera un po' più indietro per "frontale ma distante"
  // Puoi abbassare o alzare questo valore (es. 1.1 -> più vicina, 1.4 -> più lontana)
  const backOffset = 1.6;

  // posiziona la camera frontalmente: z positivo (davanti allo schermo)
  // y leggermente sopra il centro (per un leggero angolo naturale)
  const camY = Math.max(size.y * 0.15, 0);
  const camZ = distance * backOffset;
  camera.position.set(0, camY, camZ);

  // assicura che la camera guardi il centro del modello
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // aggiorna near/far in base alla distanza
  camera.near = Math.max(0.01, distance / 1000);
  camera.far = distance * 20 + 1000;
  camera.updateProjectionMatrix();

  // aggiorna i controls (target al centro)
  if (controls) {
    controls.target.set(0, 0, 0);
    // limita leggermente quanto l'utente può avvicinarsi/separarsi (opzionale,
    // utile se vuoi evitare di "entrare" nel modello)
    if (typeof controls.minDistance !== 'undefined') controls.minDistance = Math.max(0.1, maxDim * 0.2);
    if (typeof controls.maxDistance !== 'undefined') controls.maxDistance = Math.max(distance * 2.5, maxDim * 10);
    controls.update();
  }
};
