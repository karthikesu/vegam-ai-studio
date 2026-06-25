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
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Real environment map so glass actually refracts/reflects, not flat matte
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    // Faceted glass crystal cluster — same visual language as hero orb, ember/gold only
    const group = new THREE.Group();
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffb380),
      metalness: 0,
      roughness: 0.04,
      transmission: 0.95,
      thickness: 1.4,
      ior: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMapIntensity: 1.6,
      flatShading: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Smaller orbiting shard for depth
    const shardGeo = new THREE.OctahedronGeometry(0.55, 0);
    const shardMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xd4af37),
      metalness: 0.1,
      roughness: 0.08,
      transmission: 0.85,
      thickness: 1,
      ior: 1.45,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.4,
    });
    const shard = new THREE.Mesh(shardGeo, shardMat);
    shard.position.set(1.7, 0.9, 0.4);
    group.add(shard);

    // Thin wireframe edge overlay for the techy facet look (matches hero)
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.32, 1),
      new THREE.MeshBasicMaterial({ color: 0xff8c42, wireframe: true, transparent: true, opacity: 0.15 })
    );
    group.add(wire);

    scene.add(group);

    // Lighting — ember key + warm rim only, no off-brand cool blue
    const key = new THREE.PointLight(0xff5520, 14, 25);
    key.position.set(3, 2, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0xffd27a, 8, 25);
    rim.position.set(-4, -1, 3);
    scene.add(rim);
    const warmFill = new THREE.PointLight(0xff8c42, 3, 25);
    warmFill.position.set(0, -3, -3);
    scene.add(warmFill);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

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

    // Scroll-linked progress through this section
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

    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      group.rotation.y = t * 0.1 + progress * Math.PI * 1.2;
      group.rotation.x = Math.sin(t * 0.2) * 0.06 + progress * Math.PI * 0.35;
      wire.rotation.copy(core.rotation);
      shard.rotation.y = -t * 0.3;
      shard.rotation.x = t * 0.2;

      const easedScale = 0.6 + Math.min(progress * 1.6, 1) * 0.5;
      group.scale.setScalar(easedScale);
      group.position.y = (0.5 - progress) * 1.0;

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
      coreGeo.dispose();
      coreMat.dispose();
      shardGeo.dispose();
      shardMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative mx-auto mt-28 h-[420px] w-full max-w-3xl md:h-[520px]" aria-hidden>
      <div ref={mountRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
