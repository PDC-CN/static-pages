import '../_lib/webgl.min';

const { WEBGL, THREE } = window;

function STLViewer(elem, model) {
  if (!WEBGL.isWebGLAvailable()) {
    elem.appendChild(WEBGL.getWebGLErrorMessage());
    return;
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const camera = new THREE.PerspectiveCamera(50, elem.clientWidth / elem.clientHeight, 1, 1000);

  renderer.setSize(elem.clientWidth, elem.clientHeight);
  elem.appendChild(renderer.domElement);

  window.addEventListener('resize', () => {
    renderer.setSize(elem.clientWidth, elem.clientHeight);
    camera.aspect = elem.clientWidth / elem.clientHeight;
    camera.updateProjectionMatrix();
  }, false);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.05;
  controls.dampingFactor = 0.1;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.75;

  const scene = new THREE.Scene();

  scene.add(new THREE.HemisphereLight(0xffffff, 0x080820, 1.5));

  (new THREE.STLLoader()).load(model, (geometry) => {
    // Determine the color
    const colorString = elem.getAttribute('data-color');
    let color;
    if (colorString != null) {
      color = new THREE.Color(colorString);
    } else {
      color = 0xff5533;
    }

    // Set up the material
    const material = new THREE.MeshPhongMaterial({ color, specular: 100, shininess: 100 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Compute the middle
    const middle = new THREE.Vector3();
    geometry.computeBoundingBox();
    geometry.boundingBox.getCenter(middle);

    // Center it
    mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-middle.x, -middle.y, -middle.z));

    // Rotate, if desired
    if (elem.getAttribute('data-rotate') === 'x') mesh.rotation.x = -Math.PI / 2;

    // Pull the camera away as needed
    const largestDimension = Math.max(geometry.boundingBox.max.x,
      geometry.boundingBox.max.y, geometry.boundingBox.max.z);
    camera.position.z = largestDimension * elem.getAttribute('data-zdistance');


    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  });
}

function STLViewerEnable(selector) {
  const models = document.querySelectorAll(selector);
  for (let i = 0; i < models.length; i += 1) {
    STLViewer(models[i], models[i].getAttribute('data-src'));
  }
}

export default STLViewerEnable;
