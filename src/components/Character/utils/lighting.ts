import * as THREE from "three";
import { RGBELoader } from "three-stdlib";

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }

  // Animate lights on (no GSAP)
  function turnOnLights() {
    // Animate environmentIntensity
    const startEnv = scene.environmentIntensity ?? 0;
    const endEnv = 0.64;
    const startDir = directionalLight.intensity;
    const endDir = 1;
    const duration = 2000; // ms
    const startTime = performance.now();

    function animate(time: number) {
      const t = Math.min((time - startTime) / duration, 1);
      // Simple ease in-out
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      scene.environmentIntensity = startEnv + (endEnv - startEnv) * ease;
      directionalLight.intensity = startDir + (endDir - startDir) * ease;

      // Animate .character-rim if present
      const rim = document.querySelector<HTMLElement>(".character-rim");
      if (rim) {
        rim.style.transform = `translateY(${55 * ease}%)`;
        rim.style.opacity = `${ease}`;
      }

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
