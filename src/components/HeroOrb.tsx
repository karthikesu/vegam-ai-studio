import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroOrb() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Faceted crystal — icosahedron with flat shading
    const geo = new THREE.IcosahedronGeometry(1.4, 1);
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x1a1a1a),
      metalness: 0.95,
      roughness: 0.18,
      flatShading: true,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
    });
    const crystal = new THREE.Mesh(geo, mat);
    scene.add(crystal);

    // Wireframe overlay for that techy "data" feel
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.42, 1),
      new THREE.MeshBasicMaterial({ color: 0xff6b35, wireframe: true, transparent: true, opacity: 0.18 })
    );
    scene.add(wire);

    // Lights — strong ember rim + cool fill
    const key = new THREE.PointLight(0xff5520, 8, 20);
    key.position.set(3, 2, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0xffaa66, 4, 20);
    rim.position.set(-3, -1, 2);
    scene.add(rim);
    const fill = new THREE.PointLight(0x4466ff, 2, 20);
    fill.position.set(0, 3, -3);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));

    // Floating particles
    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const points = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0xff8855, size: 0.025, transparent: true, opacity: 0.6, sizeAttenuation: true })
    );
    scene.add(points);

    // Resize
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Mouse parallax
    let mx = 0, my = 0, tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.6;
      my = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("mousemove", onMove);

    // Scroll
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Animate
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      tx += (mx - tx) * 0.06;
      ty += (my - ty) * 0.06;
      crystal.rotation.x = ty + t * 0.15;
      crystal.rotation.y = tx + t * 0.25;
      wire.rotation.copy(crystal.rotation);
      wire.rotation.x += 0.03;
      points.rotation.y = t * 0.05;
      // Scroll-driven scale + lift
      const s = 1 - Math.min(scrollY / 800, 0.3);
      crystal.scale.setScalar(s);
      wire.scale.setScalar(s);
      crystal.position.y = -scrollY * 0.002;
      wire.position.y = crystal.position.y;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      pGeo.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
