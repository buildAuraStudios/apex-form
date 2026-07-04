import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight Three.js scene: floating dumbbell, kettlebell, weight plate,
 * and geometric rings. Rotates slowly + reacts subtly to cursor.
 */
export function FloatingScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

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

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const key = new THREE.DirectionalLight(0xff8a3d, 2.2);
    key.position.set(5, 4, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0xff6b00, 3, 20);
    rim.position.set(-4, 2, 3);
    scene.add(rim);

    const metal = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a, metalness: 0.9, roughness: 0.3,
    });
    const accent = new THREE.MeshStandardMaterial({
      color: 0xff6b00, metalness: 0.6, roughness: 0.25, emissive: 0xff4400, emissiveIntensity: 0.35,
    });

    // Dumbbell
    const dumbbell = new THREE.Group();
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.6, 24), metal);
    bar.rotation.z = Math.PI / 2;
    dumbbell.add(bar);
    [-0.75, 0.75].forEach((x) => {
      const head = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.35, 32), metal);
      head.rotation.z = Math.PI / 2;
      head.position.x = x;
      dumbbell.add(head);
    });
    dumbbell.position.set(-2.2, 1.3, 0);
    scene.add(dumbbell);

    // Kettlebell
    const kettlebell = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32), metal);
    kettlebell.add(body);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.07, 16, 32, Math.PI), metal);
    handle.position.y = 0.5;
    handle.rotation.x = Math.PI;
    kettlebell.add(handle);
    kettlebell.position.set(2.3, -0.5, 0);
    scene.add(kettlebell);

    // Weight plate
    const plate = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.14, 48), accent);
    disc.rotation.x = Math.PI / 2;
    plate.add(disc);
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.2, 24), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    hole.rotation.x = Math.PI / 2;
    plate.add(hole);
    plate.position.set(-2.0, -1.5, 0.5);
    plate.rotation.y = 0.4;
    scene.add(plate);

    // Rings
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.02, 8, 64), new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.5 }));
    ring1.position.set(1.5, 1.2, -1);
    scene.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.015, 8, 64), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }));
    ring2.position.set(-0.5, 0.3, -1.5);
    scene.add(ring2);

    // Cursor parallax
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      dumbbell.rotation.y = t * 0.6 + current.x;
      dumbbell.rotation.x = Math.sin(t * 0.8) * 0.2 + current.y * 0.5;
      dumbbell.position.y = 1.3 + Math.sin(t * 1.2) * 0.15;

      kettlebell.rotation.y = -t * 0.5 + current.x * 0.8;
      kettlebell.position.y = -0.5 + Math.sin(t * 1.5 + 1) * 0.2;

      plate.rotation.y = t * 0.7;
      plate.rotation.z = Math.sin(t * 0.6) * 0.15;
      plate.position.y = -1.5 + Math.sin(t * 1.1 + 2) * 0.15;

      ring1.rotation.x = t * 0.3;
      ring1.rotation.y = t * 0.4;
      ring2.rotation.x = -t * 0.2;
      ring2.rotation.z = t * 0.5;

      camera.position.x = current.x * 0.5;
      camera.position.y = -current.y * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
}
