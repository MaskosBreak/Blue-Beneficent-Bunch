# Blue-Beneficent-Bunch
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0f; overflow: hidden; font-family: 'Georgia', serif; }
  #container { width: 100vw; height: 100vh; cursor: grab; }
  #container:active { cursor: grabbing; }
  #label {
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
    color: #c8a84b; font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase;
    opacity: 0.6; pointer-events: none; user-select: none;
  }
</style>
</head>
<body>
<div id="container"></div>
<div id="label">drag to rotate &nbsp;·&nbsp; gabriel, judge of hell</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
const container = document.getElementById('container');
let W = window.innerWidth, H = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(W, H);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200);
camera.position.set(0, 2.5, 14);
camera.lookAt(0, 1.5, 0);

/* ── LIGHTS ── */
scene.add(new THREE.AmbientLight(0xfff0dd, 0.35));

const sun = new THREE.DirectionalLight(0xffeedd, 2.8);
sun.position.set(6, 14, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
scene.add(sun);

const rimBlue = new THREE.DirectionalLight(0x99ccff, 0.9);
rimBlue.position.set(-8, 4, -6);
scene.add(rimBlue);

const haloGlow = new THREE.PointLight(0xffd060, 3.5, 9);
haloGlow.position.set(0, 6.8, 0);
scene.add(haloGlow);

const eyeGlow = new THREE.PointLight(0xff3300, 2.0, 5);
eyeGlow.position.set(0, 3.8, 1.2);
scene.add(eyeGlow);

/* ── MATERIALS ── */
const M = {
  armor:   new THREE.MeshStandardMaterial({ color: 0xf2ede0, roughness: 0.28, metalness: 0.45 }),
  armorDk: new THREE.MeshStandardMaterial({ color: 0xd8d2c0, roughness: 0.35, metalness: 0.40 }),
  gold:    new THREE.MeshStandardMaterial({ color: 0xd4a030, roughness: 0.15, metalness: 0.95, emissive: 0x7a4800, emissiveIntensity: 0.4 }),
  goldBright: new THREE.MeshStandardMaterial({ color: 0xffe060, roughness: 0.1, metalness: 1.0, emissive: 0xffaa00, emissiveIntensity: 0.8 }),
  eye:     new THREE.MeshStandardMaterial({ color: 0xff2200, emissive: 0xff2200, emissiveIntensity: 2.5, roughness: 0.05, metalness: 0.1 }),
  dark:    new THREE.MeshStandardMaterial({ color: 0x1a1510, roughness: 0.8, metalness: 0.3 }),
  blade:   new THREE.MeshStandardMaterial({ color: 0xdce8ff, roughness: 0.08, metalness: 0.92, emissive: 0x6699ff, emissiveIntensity: 0.5 }),
  wing:    new THREE.MeshStandardMaterial({ color: 0xfaf7f0, roughness: 0.6, metalness: 0.05, side: THREE.DoubleSide }),
  wingTip: new THREE.MeshStandardMaterial({ color: 0xffd070, roughness: 0.3, metalness: 0.2, side: THREE.DoubleSide }),
  cape:    new THREE.MeshStandardMaterial({ color: 0xeeeae0, roughness: 0.9, metalness: 0.0, side: THREE.DoubleSide }),
};

/* ── GABRIEL GROUP ── */
const G = new THREE.Group();
scene.add(G);

function add(geo, mat, x, y, z, rx, ry, rz, sx, sy, sz) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x||0, y||0, z||0);
  if (rx) m.rotation.x = rx;
  if (ry) m.rotation.y = ry;
  if (rz) m.rotation.z = rz;
  if (sx) m.scale.set(sx, sy||sx, sz||sx);
  m.castShadow = true;
  G.add(m);
  return m;
}

/* ─── TORSO ─── */
add(new THREE.BoxGeometry(1.6, 2.0, 0.85), M.armor, 0, 1.6, 0);
// Chest pectoral plates
add(new THREE.BoxGeometry(0.62, 0.75, 0.12), M.armor,  0.38, 1.85, 0.48);
add(new THREE.BoxGeometry(0.62, 0.75, 0.12), M.armor, -0.38, 1.85, 0.48);
// Center sternum bar
add(new THREE.BoxGeometry(0.12, 0.9, 0.14), M.gold, 0, 1.85, 0.48);
// Horizontal chest ridge
add(new THREE.BoxGeometry(1.4, 0.1, 0.14), M.gold, 0, 2.1, 0.47);
add(new THREE.BoxGeometry(1.4, 0.1, 0.14), M.gold, 0, 1.55, 0.47);
// Belly / lower cuirass
add(new THREE.BoxGeometry(1.35, 0.5, 0.78), M.armorDk, 0, 0.9, 0);
// Belt
add(new THREE.BoxGeometry(1.65, 0.22, 0.9), M.gold, 0, 0.62, 0);

/* ─── HIPS / TASSETS ─── */
add(new THREE.BoxGeometry(0.55, 0.55, 0.5), M.armor, -0.58, 0.3, 0);
add(new THREE.BoxGeometry(0.55, 0.55, 0.5), M.armor,  0.58, 0.3, 0);
add(new THREE.BoxGeometry(0.38, 0.9, 0.45), M.armorDk, 0, 0.28, 0);

/* ─── LEGS ─── */
// Thighs
add(new THREE.BoxGeometry(0.6, 1.1, 0.6), M.armor, -0.42, -0.38, 0);
add(new THREE.BoxGeometry(0.6, 1.1, 0.6), M.armor,  0.42, -0.38, 0);
// Knee guards
add(new THREE.BoxGeometry(0.62, 0.22, 0.65), M.gold, -0.42, -0.95, 0);
add(new THREE.BoxGeometry(0.62, 0.22, 0.65), M.gold,  0.42, -0.95, 0);
// Shins
add(new THREE.BoxGeometry(0.52, 0.95, 0.55), M.armor, -0.42, -1.55, 0);
add(new THREE.BoxGeometry(0.52, 0.95, 0.55), M.armor,  0.42, -1.55, 0);
// Shin ridges
add(new THREE.BoxGeometry(0.14, 0.85, 0.1), M.gold, -0.42, -1.55, 0.3);
add(new THREE.BoxGeometry(0.14, 0.85, 0.1), M.gold,  0.42, -1.55, 0.3);
// Boots
add(new THREE.BoxGeometry(0.58, 0.38, 0.72), M.gold, -0.42, -2.18, 0.07);
add(new THREE.BoxGeometry(0.58, 0.38, 0.72), M.gold,  0.42, -2.18, 0.07);

/* ─── ARMS ─── */
// Pauldrons
const pGeo = new THREE.CylinderGeometry(0.48, 0.38, 0.38, 12);
add(pGeo, M.gold, -0.98, 2.2, 0, 0, 0, 0.2);
add(pGeo, M.gold,  0.98, 2.2, 0, 0, 0, -0.2);
// Pauldron ridges
add(new THREE.BoxGeometry(0.44, 0.08, 0.44), M.armor, -0.98, 2.38, 0);
add(new THREE.BoxGeometry(0.44, 0.08, 0.44), M.armor,  0.98, 2.38, 0);

// Upper arms
add(new THREE.BoxGeometry(0.44, 0.95, 0.44), M.armor, -1.05, 1.55, 0, 0, 0,  0.08);
add(new THREE.BoxGeometry(0.44, 0.95, 0.44), M.armor,  1.05, 1.55, 0, 0, 0, -0.08);
// Elbow guards
add(new THREE.SphereGeometry(0.26, 10, 8), M.gold, -1.08, 1.08, 0);
add(new THREE.SphereGeometry(0.26, 10, 8), M.gold,  1.08, 1.08, 0);
// Forearms
add(new THREE.BoxGeometry(0.4, 0.85, 0.4), M.armorDk, -1.1, 0.55, 0, 0, 0,  0.05);
add(new THREE.BoxGeometry(0.4, 0.85, 0.4), M.armorDk,  1.1, 0.55, 0, 0, 0, -0.05);
// Gauntlets
add(new THREE.BoxGeometry(0.46, 0.42, 0.46), M.gold, -1.12, 0.1, 0);
add(new THREE.BoxGeometry(0.46, 0.42, 0.46), M.gold,  1.12, 0.1, 0);
// Knuckle bars
add(new THREE.BoxGeometry(0.46, 0.08, 0.12), M.armor, -1.12, 0.32, 0.24);
add(new THREE.BoxGeometry(0.46, 0.08, 0.12), M.armor,  1.12, 0.32, 0.24);

/* ─── HEAD ─── */
add(new THREE.BoxGeometry(1.15, 1.2, 1.0), M.armor, 0, 3.45, 0);
// Jaw/chin lower
add(new THREE.BoxGeometry(0.9, 0.38, 0.9), M.armorDk, 0, 2.95, 0.05);
// Visor slit (dark recess)
add(new THREE.BoxGeometry(0.88, 0.3, 0.08), M.dark, 0, 3.52, 0.52);
// Glowing eyes
add(new THREE.SphereGeometry(0.11, 8, 6), M.eye, -0.24, 3.53, 0.55);
add(new THREE.SphereGeometry(0.11, 8, 6), M.eye,  0.24, 3.53, 0.55);
// Cheek plates
add(new THREE.BoxGeometry(0.18, 0.6, 0.12), M.gold, -0.59, 3.42, 0.47);
add(new THREE.BoxGeometry(0.18, 0.6, 0.12), M.gold,  0.59, 3.42, 0.47);
// Top helmet ridge
add(new THREE.BoxGeometry(0.18, 0.62, 0.85), M.gold, 0, 4.07, 0);
// Forehead brow
add(new THREE.BoxGeometry(1.05, 0.12, 0.1), M.gold, 0, 3.68, 0.52);
// Neck collar
add(new THREE.CylinderGeometry(0.42, 0.5, 0.3, 12), M.gold, 0, 2.77, 0);

/* ─── HALO ─── */
const haloMesh = add(new THREE.TorusGeometry(0.85, 0.055, 18, 90), M.goldBright, 0, 4.75, 0, 0.12);
// Inner glow ring (thinner)
add(new THREE.TorusGeometry(0.85, 0.02, 12, 90), M.goldBright, 0, 4.75, 0, 0.12);

/* ─── SWORD (right hand) ─── */
const sword = new THREE.Group();
sword.position.set(1.55, -0.65, 0.45);
sword.rotation.set(0.1, 0.15, -0.22);
G.add(sword);

// Pommel
const pom = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), M.gold);
pom.position.y = -0.42;
sword.add(pom);
// Grip
const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.75, 10), M.dark);
grip.position.y = 0.0;
sword.add(grip);
// Grip wrapping
for (let i = 0; i < 5; i++) {
  const wrap = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.018, 6, 16), M.gold);
  wrap.position.y = -0.28 + i * 0.14;
  wrap.rotation.x = Math.PI / 2;
  sword.add(wrap);
}
// Guard
const guard = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.1, 0.14), M.gold);
guard.position.y = 0.45;
sword.add(guard);
// Guard tips
const gTip = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), M.goldBright);
gTip.position.set(-0.48, 0.45, 0);
sword.add(gTip);
const gTip2 = gTip.clone();
gTip2.position.set(0.48, 0.45, 0);
sword.add(gTip2);
// Blade — tapered box stack
for (let i = 0; i < 12; i++) {
  const t = i / 11;
  const w = 0.14 * (1 - t * 0.85);
  const seg = new THREE.Mesh(new THREE.BoxGeometry(w, 0.28, 0.04), M.blade);
  seg.position.y = 0.6 + i * 0.27;
  sword.add(seg);
}
// Blood groove ridge
const groove = new THREE.Mesh(new THREE.BoxGeometry(0.025, 2.8, 0.012), M.goldBright);
groove.position.y = 1.7;
sword.add(groove);

/* ─── WINGS ─── */
function buildWing(side) {
  const wg = new THREE.Group();

  const featherCount = 10;
  for (let layer = 0; layer < 3; layer++) {
    for (let i = 0; i < featherCount - layer * 2; i++) {
      const t = i / (featherCount - layer * 2 - 1);
      const len = (3.8 - layer * 0.8) * (0.7 + Math.sin(t * Math.PI) * 0.45);
      const wid = 0.48 - layer * 0.06 + Math.sin(t * Math.PI) * 0.18;

      const shape = new THREE.Shape();
      shape.moveTo(-wid / 2, 0);
      shape.quadraticCurveTo(-wid * 0.6, len * 0.5, -wid * 0.1, len);
      shape.lineTo(wid * 0.1, len);
      shape.quadraticCurveTo(wid * 0.6, len * 0.5, wid / 2, 0);
      shape.closePath();

      const geo = new THREE.ShapeGeometry(shape, 6);
      const isTip = t > 0.6 && layer === 0;
      const f = new THREE.Mesh(geo, isTip ? M.wingTip : M.wing);

      const span = 1.0 + layer * 0.1;
      const arc = (t - 0.5) * Math.PI * 0.75;
      f.position.set(
        side * (span + t * 2.8 + layer * 0.4),
        Math.sin(arc) * 1.0 + 0.6 - layer * 0.3,
        -0.2 - layer * 0.15
      );
      f.rotation.y = side * (0.25 + layer * 0.12);
      f.rotation.z = side * (arc * 0.55 + (side > 0 ? -0.18 : 0.18));

      wg.add(f);
    }
  }

  // Wing bone / leading edge
  const boneGeo = new THREE.CylinderGeometry(0.04, 0.025, 4.5, 8);
  const bone = new THREE.Mesh(boneGeo, M.gold);
  bone.position.set(side * 2.8, 0.6, -0.1);
  bone.rotation.z = side * (-Math.PI / 2 + 0.4);
  bone.rotation.y = side * -0.3;
  wg.add(bone);

  return wg;
}

const wingL = buildWing(-1);
wingL.position.set(-0.7, 2.0, -0.55);
G.add(wingL);

const wingR = buildWing(1);
wingR.position.set(0.7, 2.0, -0.55);
G.add(wingR);

/* ─── CAPE ─── */
const capeGroup = new THREE.Group();
capeGroup.position.set(0, 2.1, -0.48);
G.add(capeGroup);

for (let s = -1; s <= 1; s++) {
  const cW = 0.7, cH = 3.0;
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(s < 0 ? -cW : s > 0 ? cW : cW * 0.5, 0);
  shape.lineTo((s < 0 ? -cW * 1.3 : s > 0 ? cW * 1.3 : cW * 0.6), -cH);
  shape.lineTo(s < 0 ? 0 : s > 0 ? 0 : -cW * 0.5, -cH);
  shape.closePath();
  const capeGeo = new THREE.ShapeGeometry(shape, 4);
  const capeM = new THREE.Mesh(capeGeo, M.cape);
  capeM.position.x = s * 0.0;
  capeGroup.add(capeM);
}

/* ─── GROUND SHADOW DISC ─── */
const shadowDisc = new THREE.Mesh(
  new THREE.CircleGeometry(2.0, 48),
  new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 })
);
shadowDisc.rotation.x = -Math.PI / 2;
shadowDisc.position.y = -2.26;
G.add(shadowDisc);

/* ─── INTERACTIVITY ─── */
let isDragging = false, prevX = 0, prevY = 0, velX = 0, velY = 0;
let rotX = 0.05, rotY = 0.3;

container.addEventListener('mousedown', e => {
  isDragging = true; prevX = e.clientX; prevY = e.clientY; velX = 0; velY = 0;
});
window.addEventListener('mouseup', () => { isDragging = false; });
window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  velX = (e.clientX - prevX) * 0.007;
  velY = (e.clientY - prevY) * 0.004;
  rotY += velX; rotX += velY;
  prevX = e.clientX; prevY = e.clientY;
});
container.addEventListener('touchstart', e => {
  isDragging = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; velX = 0; velY = 0;
  e.preventDefault();
}, { passive: false });
container.addEventListener('touchend', () => { isDragging = false; });
container.addEventListener('touchmove', e => {
  if (!isDragging) return;
  velX = (e.touches[0].clientX - prevX) * 0.007;
  velY = (e.touches[0].clientY - prevY) * 0.004;
  rotY += velX; rotX += velY;
  prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
  e.preventDefault();
}, { passive: false });

/* ─── ANIMATION ─── */
let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.016;

  if (!isDragging) {
    velX *= 0.92; velY *= 0.92;
    rotY += velX; rotX += velY;
    rotY += 0.004;
  }
  rotX = Math.max(-0.65, Math.min(0.65, rotX));

  G.rotation.y = rotY;
  G.rotation.x = rotX;

  // Hover bob
  G.position.y = Math.sin(t * 1.1) * 0.18;

  // Halo pulse
  const pulse = 1.4 + Math.sin(t * 2.2) * 0.6;
  M.goldBright.emissiveIntensity = pulse;
  haloGlow.intensity = 2.8 + Math.sin(t * 2.2) * 1.2;

  // Eye throb
  M.eye.emissiveIntensity = 2.0 + Math.sin(t * 3.5) * 0.8;
  eyeGlow.intensity = 1.5 + Math.sin(t * 3.5) * 0.7;

  // Wing flutter
  wingL.rotation.z =  Math.sin(t * 1.4) * 0.07;
  wingR.rotation.z = -Math.sin(t * 1.4) * 0.07;
  wingL.rotation.y =  Math.sin(t * 0.8) * 0.04;
  wingR.rotation.y = -Math.sin(t * 0.8) * 0.04;

  // Sword slight shimmer
  M.blade.emissiveIntensity = 0.3 + Math.sin(t * 4) * 0.15;

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  W = window.innerWidth; H = window.innerHeight;
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  renderer.setSize(W, H);
});
</script>
</body>
</html>
