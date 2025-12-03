// File: src/components/ThreeScene.jsx
// Versione corretta: usa ResizeObserver, adatta la camera al modello (fit-to-view), canvas 100% width/height,
// gestione pulita degli event listeners e cleanup completo.
// Refactored: extracted setup functions for modularity.

import React, { useEffect, useRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const ThreeScene = React.forwardRef(({ currentModel, setCurrentModel, setIsLoading, currentScreen }, ref) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const orbitRef = useRef(null);
  const groupRef = useRef(null);
  const modelRef = useRef(null);
  const partObjectsRef = useRef({});
  const modelMeshesRef = useRef([]);
  const pointsRef = useRef([]);
  const sectionGroupRef = useRef(null);
  const pointGroupRef = useRef(null);
  const directionalRef = useRef(null);

  // stateful refs for interaction/animation
  const animationPausedRef = useRef(false);
  const userInteractingRef = useRef(false);
  const clickTouchStateRef = useRef({ down: false, startX: 0, startY: 0, time: 0 });

  const originalMaterial = new THREE.MeshStandardMaterial({ color: 0xdecfd7 });

  // expose imperative methods
  useImperativeHandle(ref, () => ({
    showSections: (sectionName) => {
      // TODO: implement if needed
    },
    colorObjectByName: (partName, color) => {
      for (const id in partObjectsRef.current) {
        const object = partObjectsRef.current[id];
        if (object && object.userData && object.userData.name === partName) {
          object.material = new THREE.MeshStandardMaterial({ color });
        }
      }
    },
    colorObjectById: (id, color) => {
      if (partObjectsRef.current[id]) {
        const object = partObjectsRef.current[id];
        object.material = new THREE.MeshStandardMaterial({ color });
        return { id, object };
      }
      return null;
    },
    resetColor: () => {
      for (const id in partObjectsRef.current) {
        const object = partObjectsRef.current[id];
        if (object) object.material = originalMaterial;
      }
    },
    showPoint: (selectedNumber) => {
      pointGroupRef.current.clear();
      const pointIndex = selectedNumber - 1;
      if (selectedNumber >= 1 && pointsRef.current[pointIndex]) {
        const p = pointsRef.current[pointIndex];
        p.visible = true;
        pointGroupRef.current.add(p);
        groupRef.current.add(pointGroupRef.current);
      }
    },
    stopAnimation: () => {
      animationPausedRef.current = true;
    },
    resumeAnimation: () => {
      animationPausedRef.current = false;
    },
    cleanLayout: (screen) => {
      const infoContainer = document.getElementById('containerTexts');
      if (infoContainer) infoContainer.classList.add('hidden');
      if (screen === 'lobes' || screen === 'anumb') {
        pointGroupRef.current.clear();
        sectionGroupRef.current.visible = false;
      } else if (screen === 'sections') {
        sectionGroupRef.current.visible = true;
      }
    },
    changeModel: (nextModel) => setCurrentModel(nextModel),
  }));

  // Helper: fit model into view
  function frameModelToView(model, camera, controls, containerRect, padding = 1.2) {
    if (!model || !camera) return;
    const bbox = new THREE.Box3().setFromObject(model);
    const size = bbox.getSize(new THREE.Vector3());
    const center = bbox.getCenter(new THREE.Vector3());

    model.position.sub(center);
    model.scale.set(1, 1, 1);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let distance = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * padding;

    const isMobile = containerRect && containerRect.width < 600;
    if (isMobile) distance *= 1.5;

    camera.position.set(0, Math.max(size.y * 0.15, 0), distance);
    camera.near = Math.max(0.1, distance / 1000);
    camera.far = distance * 10 + 1000;
    camera.updateProjectionMatrix();

    if (controls) {
      controls.target.set(0, 0, 0);
      controls.update();
    }
  }

  // Module: Setup Scene
  const setupScene = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    return scene;
  };

  // Module: Setup Renderer
  const setupRenderer = (container) => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0xdddddd);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    if (renderer.domElement.parentElement !== container) {
      container.appendChild(renderer.domElement);
    }

    return renderer;
  };

  // Module: Setup Camera
  const setupCamera = (rect) => {
    const camera = new THREE.PerspectiveCamera(45, rect.width / Math.max(rect.height, 1), 0.1, 10000);
    camera.position.set(0, 20, 70);
    return camera;
  };

  // Module: Setup Controls
  const setupControls = (camera, domElement) => {
    const controls = new OrbitControls(camera, domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.rotateSpeed = 0.6;
    controls.zoomSpeed = 1.0;
    controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    return controls;
  };

  // Module: Setup Lights
  const setupLights = (scene, camera) => {
    const ambient = new THREE.AmbientLight(0x333333);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 0.9);
    directional.castShadow = true;
    directional.position.copy(camera.position);
    scene.add(directional);
    directionalRef.current = directional;
  };

  // Module: Setup Groups
  const setupGroups = (scene) => {
    const group = new THREE.Group();
    scene.add(group);

    const sectionGroup = new THREE.Group();
    scene.add(sectionGroup);

    const pointGroup = new THREE.Group();
    scene.add(pointGroup);

    return { group, sectionGroup, pointGroup };
  };

  // Module: Create Points
  const createPoints = () => {
    const pointPositions = [
      [6, 10, 1.5], [7, 9, 1.7], [5, 11, 1.2], [5, 11, 3.5], [3, 12, -0.8], [5, 11, 4], [5, 10.5, -1.5],
      [3, 12, 6], [2, 11, 11], [1.3, 7, 14], [1.7, 3, 14], [1.3, 3, 11], [0, 0, 0], [0, 0, 0],
      [0, 0, 0], [0, 0, 0], [2.2, -1, -10], [2.2, 3, -10], [2.2, 6, -9], [9, 0, 4], [10, 1, 2],
      [10, 2, 4], [1, 6, -2.2], [1.7, 5, 6], [0, 0, 0], [1, 4.7, -3.2], [1, 3.8, -2.6], [1, 3.5, -2],
      [0, 0, 0], [1, 4.5, -3.5], [1, 7, -2.4], [1.3, 4.5, 10], [0, 0, 0], [1, 4, -2.6], [1, 3.6, -2.6],
      [1, 3, -2], [10, 2, -3], [8, 2, 8], [10, 4, -2.2], [10, 5.4, -1.2], [10, 3.3, 1], [10, 3.8, 1.3],
      [10, 4.6, -1.2], [8, 5.6, 10], [7, 5, 12], [5, 6.5, 12], [7, 3, 12], [0, 0, 0], [0, 0, 0],
      [0, 0, 0], [0, 0, 0], [9, 3, 7],
    ];

    const points = [];
    for (let i = 0; i < 52; i++) {
      const geom = new THREE.SphereGeometry(0.5, 16, 16);
      const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const m = new THREE.Mesh(geom, mat);
      const pos = pointPositions[i] || [0, 0, 0];
      m.position.set(pos[0], pos[1], pos[2]);
      m.visible = false;
      points.push(m);
    }
    return points;
  };

  // Main setup effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = setupScene();
    sceneRef.current = scene;

    const renderer = setupRenderer(container);
    rendererRef.current = renderer;

    const rect = container.getBoundingClientRect();
    const camera = setupCamera(rect);
    cameraRef.current = camera;

    const controls = setupControls(camera, renderer.domElement);
    orbitRef.current = controls;

    setupLights(scene, camera);

    const { group, sectionGroup, pointGroup } = setupGroups(scene);
    groupRef.current = group;
    sectionGroupRef.current = sectionGroup;
    pointGroupRef.current = pointGroup;

    pointsRef.current = createPoints();

    // Raycaster and mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Handlers
    const computeNDCFromClient = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;
      return { x, y };
    };

    const handleClick = (e) => {
      const ndc = computeNDCFromClient(e.clientX, e.clientY);
      mouse.x = ndc.x; mouse.y = ndc.y;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(modelMeshesRef.current, true);
      if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj) obj.material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
      }
    };

    const handleTouchStart = (ev) => {
      const t = ev.touches?.[0];
      if (t) {
        clickTouchStateRef.current.startX = t.clientX;
        clickTouchStateRef.current.startY = t.clientY;
        clickTouchStateRef.current.time = Date.now();
        clickTouchStateRef.current.down = true;
      }
    };

    const handleTouchEnd = (ev) => {
      const touches = ev.changedTouches;
      if (touches && touches.length > 0) {
        const t = touches[0];
        const start = clickTouchStateRef.current;
        const dx = Math.abs(t.clientX - start.startX);
        const dy = Math.abs(t.clientY - start.startY);
        const dt = Date.now() - start.time;
        if (dx < 10 && dy < 10 && dt < 500) {
          const ndc = computeNDCFromClient(t.clientX, t.clientY);
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

    const handlePointerDown = (ev) => {
      userInteractingRef.current = true;
      animationPausedRef.current = true;
      clickTouchStateRef.current.down = true;
      clickTouchStateRef.current.startX = ev.clientX || (ev.touches?.[0]?.clientX) || 0;
      clickTouchStateRef.current.startY = ev.clientY || (ev.touches?.[0]?.clientY) || 0;
      clickTouchStateRef.current.time = Date.now();
      renderer.domElement.style.cursor = 'grabbing';
    };

    const handlePointerUp = () => {
      userInteractingRef.current = false;
      clickTouchStateRef.current.down = false;
      renderer.domElement.style.cursor = 'auto';
      setTimeout(() => { animationPausedRef.current = false; }, 200);
    };

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (!width || !height) continue;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(Math.max(1, Math.floor(width)), Math.max(1, Math.floor(height)), false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(container);

    const handleWindowResize = () => {
      const r = container.getBoundingClientRect();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(Math.max(1, Math.floor(r.width)), Math.max(1, Math.floor(r.height)), false);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleWindowResize);

    // Controls events
    const onControlsStart = () => {
      userInteractingRef.current = true;
      animationPausedRef.current = true;
    };
    const onControlsEnd = () => {
      userInteractingRef.current = false;
    };
    controls.addEventListener('start', onControlsStart);
    controls.addEventListener('end', onControlsEnd);

    // Animation loop
    let mounted = true;
    const animate = () => {
      if (!mounted) return;
      requestAnimationFrame(animate);
      if (!animationPausedRef.current && groupRef.current) {
        groupRef.current.rotation.y -= 0.005;
      }
      if (directionalRef.current) {
        directionalRef.current.position.copy(camera.position);
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Add event listeners
    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);
    renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    renderer.domElement.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      mounted = false;
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);

      controls.removeEventListener('start', onControlsStart);
      controls.removeEventListener('end', onControlsEnd);
      controls.dispose();

      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      renderer.domElement.removeEventListener('touchstart', handleTouchStart);
      renderer.domElement.removeEventListener('touchend', handleTouchEnd);

      renderer.dispose();
      if (container && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }

      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
          else o.material.dispose();
        }
      });
    };
  }, []);

  // Model loading effect
  useEffect(() => {
    const scene = sceneRef.current;
    const group = groupRef.current;
    if (!scene || !group) return;

    const loader = new GLTFLoader();
    const brain1Url = new URL('../media/img/Brain1.glb', import.meta.url).href;
    const brain2Url = new URL('../media/img/Brain2.glb', import.meta.url).href;
    const brain3Url = new URL('../media/img/Brain3.glb', import.meta.url).href;
    const modelUrl = currentModel === 1 ? brain1Url : currentModel === 2 ? brain2Url : brain3Url;

    let isCancelled = false;
    setIsLoading(true);

    loader.load(
      modelUrl,
      (gltf) => {
        if (isCancelled) return;
        if (modelRef.current) {
          group.remove(modelRef.current);
          scene.remove(modelRef.current);
        }

        const model = gltf.scene || gltf.scenes[0];
        modelRef.current = model;
        partObjectsRef.current = {};
        modelMeshesRef.current = [];

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = originalMaterial.clone();
            const partId = child.uuid;
            child.userData.partId = partId;
            partObjectsRef.current[partId] = child;
            modelMeshesRef.current.push(child);
          }
        });

        model.scale.set(1, 1, 1);
        group.add(model);

        const container = containerRef.current;
        const rect = container ? container.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
        frameModelToView(model, cameraRef.current, orbitRef.current, rect, 1.2);

        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error('GLTF load error', err);
        if (!isCancelled) setIsLoading(false);
      }
    );

    return () => {
      isCancelled = true;
    };
  }, [currentModel, setIsLoading]);

  return <div ref={containerRef} id="containerModel" className="w-full h-full md:w-screen md:h-screen relative" />;
});

export default ThreeScene;