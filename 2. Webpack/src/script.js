import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xf50000 
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 2;
scene.add(mesh);

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//Group
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
);
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
);
cube2.position.x = 2;
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
);
cube3.position.x = -2;

group.add(cube1);
group.add(cube2);
group.add(cube3);

group.rotation.y = Math.PI / 6;

// Camera
const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);