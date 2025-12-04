// File: src/components/ThreeScene.jsx
// Main manager: handles refs, imperative API, effects, and orchestration.

import React, { useEffect, useRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupScene, setupLights, setupGroups } from '../helper/sceneSetup';
import { setupRenderer, setupCamera, setupControls } from '../helper/rendererSetup';
import { createPoints } from '../helper/pointUtils';
import { handleClick, handleTouchStart, handleTouchEnd, handlePointerDown, handlePointerUp, computeNDCFromClient } from '../helper/eventHandlers';
import { frameModelToView } from '../helper/modelUtils';

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
    const activeSectionRef = useRef(null);

    // stateful refs for interaction/animation
    const animationPausedRef = useRef(false);
    const userInteractingRef = useRef(false);
    const clickTouchStateRef = useRef({ down: false, startX: 0, startY: 0, time: 0 });

    const originalMaterial = new THREE.MeshStandardMaterial({ color: 0xdecfd7 });

    // CONFIGURAZIONE delle sezioni (rotation + come calcolare larghezza/altezza dal bbox)
    const sectionConfigs = {
        sagittale: {
            // piano per tagliare lungo X (normale X)
            rotation: new THREE.Euler(0, -Math.PI / 2, 0),
            sizeFromBBox: (size) => ({ w: size.z, h: size.y })
        },
        orizzontale: {
            // piano assiale (normale Y)
            rotation: new THREE.Euler(Math.PI / 2, 0, 0),
            sizeFromBBox: (size) => ({ w: size.x, h: size.z })
        },
        verticale: {
            // piano frontale (normale Z) — default plane è in XY con normale +Z
            rotation: new THREE.Euler(0, 0, 0),
            sizeFromBBox: (size) => ({ w: size.x, h: size.y })
        },
        trasversale: {
            // esempio: piano inclinato
            rotation: new THREE.Euler(-Math.PI / 4, 0, 0),
            sizeFromBBox: (size) => ({ w: Math.max(size.x, size.z), h: size.y })
        }
    };

    // expose imperative methods
    useImperativeHandle(ref, () => ({
        showSections: (sectionName) => {
            if (!modelRef.current || !rendererRef.current) return;

            // toggle off se è già attiva
            if (activeSectionRef.current === sectionName) {
                sectionGroupRef.current.clear();
                sectionGroupRef.current.visible = false;
                modelMeshesRef.current.forEach(mesh => {
                    if (mesh.material) {
                        mesh.material.transparent = false;
                        mesh.material.opacity = 1.0;
                        mesh.material.needsUpdate = true;
                    }
                });
                activeSectionRef.current = null;
                return;
            }

            const config = sectionConfigs[sectionName];
            if (!config) return;

            // bbox mondo del modello e centro
            const bbox = new THREE.Box3().setFromObject(modelRef.current);
            const size = bbox.getSize(new THREE.Vector3());
            const centerWorld = bbox.getCenter(new THREE.Vector3());

            // dimensioni piano con margine
            const margin = 1.2;
            const { w, h } = config.sizeFromBBox(size);
            const planeW = Math.max(0.01, w * margin);
            const planeH = Math.max(0.01, h * margin);

            // rendi il modello semi-trasparente per vedere il piano interno
            modelMeshesRef.current.forEach(mesh => {
                if (mesh.material) {
                    mesh.material.transparent = true;
                    mesh.material.opacity = 1;
                    mesh.material.needsUpdate = true;
                }
            });

            // pulisco il gruppo delle sezioni
            sectionGroupRef.current.clear();

            // creo piano
            const planeGeometry = new THREE.PlaneGeometry(planeW, planeH);
            const planeMaterial = new THREE.MeshStandardMaterial({
                color: 0x88eeff,
                side: THREE.DoubleSide,
                transparent: false,
                opacity: 1.0
            });
            const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
            planeMesh.receiveShadow = true;

            // parent del sectionGroup (preferisco usare il parent effettivo per worldToLocal)
            const parent = sectionGroupRef.current.parent || groupRef.current || sceneRef.current || null;
            const centerLocal = centerWorld.clone();
            if (parent) parent.worldToLocal(centerLocal);

            planeMesh.position.copy(centerLocal);
            planeMesh.rotation.copy(config.rotation);

            // piccolo offset lungo la normale del piano per evitare intersezioni visive
            const normal = new THREE.Vector3(0, 0, 1).applyEuler(config.rotation).normalize();
            const biggest = Math.max(size.x, size.y, size.z) || 1;
            const offset = Math.max(0.001, 0.002 * biggest);
            planeMesh.position.add(normal.multiplyScalar(offset));

            // aggiungo il piano al group delle sezioni e lo mostro
            sectionGroupRef.current.add(planeMesh);
            sectionGroupRef.current.visible = true;

            activeSectionRef.current = sectionName;
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
                if (activeSectionRef.current) {
                    // Hide sections if leaving screen
                    modelMeshesRef.current.forEach(mesh => {
                        if (mesh.material) {
                            mesh.material.transparent = false;
                            mesh.material.opacity = 1.0;
                            mesh.material.needsUpdate = true;
                        }
                    });
                    sectionGroupRef.current.clear();
                    activeSectionRef.current = null;
                }
            } else if (screen === 'sections') {
                sectionGroupRef.current.visible = true;
            }
        },
        changeModel: (nextModel) => setCurrentModel(nextModel),
    }));


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

        directionalRef.current = setupLights(scene, camera);

        const { group, sectionGroup, pointGroup } = setupGroups(scene);
        groupRef.current = group;
        sectionGroupRef.current = sectionGroup;
        pointGroupRef.current = pointGroup;

        pointsRef.current = createPoints();

        // Raycaster and mouse
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        // Bound handlers with refs
        const boundHandleClick = (e) => handleClick(e, renderer, camera, mouse, raycaster, modelMeshesRef, computeNDCFromClient);
        const boundHandleTouchStart = (ev) => handleTouchStart(ev, clickTouchStateRef);
        const boundHandleTouchEnd = (ev) => handleTouchEnd(ev, renderer, camera, mouse, raycaster, modelMeshesRef, clickTouchStateRef, computeNDCFromClient);
        const boundHandlePointerDown = (ev) => handlePointerDown(ev, userInteractingRef, animationPausedRef, clickTouchStateRef, renderer);
        const boundHandlePointerUp = () => handlePointerUp(userInteractingRef, clickTouchStateRef, renderer, animationPausedRef);

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
        renderer.domElement.addEventListener('click', boundHandleClick);
        renderer.domElement.addEventListener('pointerdown', boundHandlePointerDown);
        renderer.domElement.addEventListener('pointerup', boundHandlePointerUp);
        renderer.domElement.addEventListener('touchstart', boundHandleTouchStart, { passive: true });
        renderer.domElement.addEventListener('touchend', boundHandleTouchEnd);

        // Cleanup
        return () => {
            mounted = false;
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleWindowResize);

            controls.removeEventListener('start', onControlsStart);
            controls.removeEventListener('end', onControlsEnd);
            controls.dispose();

            renderer.domElement.removeEventListener('click', boundHandleClick);
            renderer.domElement.removeEventListener('pointerdown', boundHandlePointerDown);
            renderer.domElement.removeEventListener('pointerup', boundHandlePointerUp);
            renderer.domElement.removeEventListener('touchstart', boundHandleTouchStart);
            renderer.domElement.removeEventListener('touchend', boundHandleTouchEnd);

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

                // Apply per-model adjustments
                if (currentModel === 1) {
                    model.scale.set(0.7, 0.7, 0.7);
                    model.rotation.y = -Math.PI / 2;
                    model.position.set(0, 0, -10);
                } else if (currentModel === 2) {
                    model.scale.set(140, 140, 140);
                    model.position.set(0, -35, 1);
                } else {
                    model.scale.set(150, 150, 150);
                    model.position.set(0, -33, 3);
                }

                group.add(model);

                // Reset group rotation to prevent offset orbiting
                group.rotation.y = 0;

                const container = containerRef.current;
                const rect = container ? container.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
                frameModelToView(model, cameraRef.current, orbitRef.current, rect, 1.2);

                // Reapply active section if any
                if (activeSectionRef.current) {
                    ref.current.showSections(activeSectionRef.current);
                }

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