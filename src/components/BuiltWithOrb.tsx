import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export function BuiltWithOrb() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const section = sectionRef.current;
    if (!mount || !section) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.03);
    scene.environment = envRT.texture;

    // ---- Build the V mark as a real extruded glass solid ----
    const vShape = new THREE.Shape();
    vShape.moveTo(-1.3, 1.35);
    vShape.lineTo(0, -1.35);
    vShape.lineTo(1.3, 1.35);
    vShape.lineTo(0.74, 1.35);
    vShape.lineTo(0, -0.5);
    vShape.lineTo(-0.74, 1.35);
    vShape.lineTo(-1.3, 1.35);

    const vGeo = new THREE.ExtrudeGeometry(vShape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.05,
      bevelSegments: 4,
      curveSegments: 1,
    });
    vGeo.center();

    const vMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xb8390f), // deep ember/copper, not peach
      metalness: 0.05,
      roughness: 0.025,
      transmission: 0.88,
      thickness: 2.2,
      ior: 1.55,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      envMapIntensity: 2.2,
      attenuationColor: new THREE.Color(0xff6a2e),
      attenuationDistance: 1.2,
    });
    const vMesh = new THREE.Mesh(vGeo, vMat);
    scene.add(vMesh);

    // Crisp gold edge lines for precision-cut definition
    const edgeGeo = new THREE.EdgesGeometry(vGeo, 8);
    const edgeLines = new THREE.LineSegments(
      edgeGeo,
      new THREE.LineBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0.55 })
    );
    vMesh.add(edgeLines);

    // ---- Scattered glass shards that fly in around the V ----
    const SHARD_COUNT = 9;
    type Shard = { mesh: THREE.Mesh; start: THREE.Vector3; end: THREE.Vector3; rotStart: THREE.Euler; rotEnd: THREE.Euler };
    const shards: Shard[] = [];
    const shardColors = [0xff6a2e, 0xffd27a, 0xd9501f, 0xffb380];

    for (let i = 0; i < SHARD_COUNT; i++) {
      const size = 0.22 + Math.random() * 0.26;
      const geo = Math.random() > 0.5 ? new THREE.TetrahedronGeometry(size, 0) : new THREE.OctahedronGeometry(size, 0);
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(shardColors[i % shardColors.length]),
        metalness: 0.05,
        roughness: 0.04,
        transmission: 0.85,
        thickness: 1,
        ior: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0.03,
        envMapIntensity: 2,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const angle = (i / SHARD_COUNT) * Math.PI * 2;
      const scatterR = 4.5 + Math.random() * 2;
      const start = new THREE.Vector3(
        Math.cos(angle) * scatterR + (Math.random() - 0.5) * 1.5,
        Math.sin(angle) * scatterR + (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 3 - 1
      );

      // End position: hugging the silhouette of the V, slightly offset outward
      const t = i / SHARD_COUNT;
      const onLeftArm = t < 0.5;
      const localT = onLeftArm ? t * 2 : (t - 0.5) * 2;
      const armX = onLeftArm ? -1.0 + localT * 1.0 : localT * 1.0;
      const armY = 1.3 - localT * 2.4;
      const end = new THREE.Vector3(armX * (onLeftArm ? 1 : 1) + (onLeftArm ? -0.35 : 0.35), armY * 0.85, 0.5 + Math.random() * 0.4);

      const rotStart = new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const rotEnd = new THREE.Euler(Math.random() * 0.4, Math.random() * 0.4, Math.random() * 0.4);

      mesh.position.copy(start);
      mesh.rotation.copy(rotStart);
      scene.add(mesh);
      shards.push({ mesh, start, end, rotStart, rotEnd });
    }

    // ---- Lighting: dramatic, not flat ----
    const key = new THREE.PointLight(0xff5520, 16, 28);
    key.position.set(3.5, 2.5, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0xffd27a, 7, 28);
    rim.position.set(-4, -1.5, 3);
    scene.add(rim);
    const glint = new THREE.PointLight(0xffffff, 6, 10);
    glint.position.set(1.5, 1.5, 6);
    scene.add(glint);
    const fill = new THREE.PointLight(0xff8c42, 2.5, 25);
    fill.position.set(0, -3, -4);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0xffffff, 0.12));

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let progress = 0;
    const computeProgress = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      progress = Math.min(Math.max(traveled / total, 0), 1);
    };
    computeProgress();
    const onScroll = () => computeProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      const p = easeOutCubic(Math.min(progress * 1.3, 1));

      // V mesh: starts small/rotated/dim, settles upright and full scale
      const vScale = 0.5 + p * 0.65;
      vMesh.scale.setScalar(vScale);
      vMesh.rotation.y = (1 - p) * Math.PI * 0.9 + Math.sin(t * 0.15) * 0.05;
      vMesh.rotation.x = (1 - p) * 0.6;
      vMesh.position.y = (0.5 - p) * 0.6;

      shards.forEach(({ mesh, start: s, end: e, rotStart: rs, rotEnd: re }, i) => {
        mesh.position.lerpVectors(s, e, p);
        mesh.rotation.x = rs.x + (re.x - rs.x) * p + t * 0.15;
        mesh.rotation.y = rs.y + (re.y - rs.y) * p + t * 0.1;
        mesh.rotation.z = rs.z + (re.z - rs.z) * p;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      renderer.dispose();
      envRT.dispose();
      pmrem.dispose();
      vGeo.dispose();
      vMat.dispose();
      edgeGeo.dispose();
      shards.forEach((sh) => {
        sh.mesh.geometry.dispose();
        (sh.mesh.material as THREE.Material).dispose();
      });
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative mx-auto mt-28 h-[460px] w-full max-w-3xl md:h-[560px]" aria-hidden>
      <div ref={mountRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
