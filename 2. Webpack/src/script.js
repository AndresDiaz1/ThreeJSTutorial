import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'


const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = ()=> {

}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const ambientocclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const matcapTexture = textureLoader.load('textures/matcaps/1.png');
const gradientTexture = textureLoader.load('textures/gradients/3.jpg');



window.addEventListener('resize',(e)=>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerWidth;

    camera.aspect = sizes.width/sizes.height

    //Update Camera
    camera.updateProjectionMatrix();
    
    //Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

});

window.addEventListener('dblclick', ()=>{
     if (!document.fullscreenElement) {
        canvas.requestFullscreen()
     }else  {
        document.exitFullscreen()
     }
})

const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    //color: 0xf50000,
    map: colorTexture 
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 2;
scene.add(mesh);

// Axes helper
const axesHelper = new THREE.AxesHelper(10 );
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
    new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
    new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: true
    })
);
cube3.position.x = -2;

cube1.position.y = -3

group.add(cube1);
group.add(cube2);
group.add(cube3);

group.rotation.y = Math.PI / 6;

// Camera
const sizes = {
    width: window.innerWidth,                                                                                                      
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);


// Custom geometry

// const positionsArray = new Float32Array(9)

// // First vertice
// positionsArray[0] = 0
// positionsArray[1] = 0
// positionsArray[2] = 0

// // Second vertice
// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0

// // Third vertice
// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0

//          ∆
//          |
//       same as:
const positionsArray = new Float32Array([
    0, 0 ,0,
    0, 1, 0,
    1, 0, 0
]);

const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)
const customGeometry = new THREE.BufferGeometry();
customGeometry.setAttribute('position', positionAttribute)
const customGeometryMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

const meshCustomGeometry = new THREE.Mesh(customGeometry, customGeometryMaterial);
scene.add(meshCustomGeometry);


const count = 50
const customGeometryRandom = new THREE.BufferGeometry();
const positionsArrayRandom = new Float32Array(count * 3 * 3)

for (let i=0; i< count *3 *3; i++) {
    positionsArrayRandom[i] = Math.random() -0.5
}

const positionsAttributeRandom = new THREE.BufferAttribute(positionsArrayRandom, 3)
customGeometryRandom.setAttribute('position', positionsAttributeRandom)

const meshCustomRandomGeometry = new THREE.Mesh(customGeometryRandom, customGeometryMaterial);
meshCustomRandomGeometry.position.x =2
scene.add(meshCustomRandomGeometry);

// Renderer
const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Green Socket animation
gsap.to(cube3.position, {
    x: 2,
    duration: 1,
    delay: 1
})

gsap.to(cube3.position, {
    x: -2,
    duration: 1,
    delay: 2
})







//Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const clock = new THREE.Clock()
//Animations
const tick = ()=> {

    //Time
    const elapsedTime = clock.getElapsedTime()
    //Update Objects
    cube1.rotation.y = elapsedTime
    cube2.position.y = Math.sin(elapsedTime)


    sphere.rotation.y = elapsedTime * 0.1
    plane.rotation.y = elapsedTime * 0.1
    torus.rotation.y = elapsedTime * 0.1

    sphere.rotation.x = elapsedTime * 0.15
    plane.rotation.x = elapsedTime * 0.15
    torus.rotation.x = elapsedTime * 0.15



    //Update controls
    controls.update()


    //Render
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick)
}

// debug

//Press H to hide it
const gui = new dat.GUI();
const parameters = {
    color: 0xff0000,
    spin: ()=> {
        gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + Math.PI *2})
    }
}

gui.add(mesh.position, 'y', -3, 3, 0.01)
gui.add(mesh.position, 'z').min(-3).max(3).step(0.02).name('Z axiiis')

gui.add(meshCustomGeometry, 'visible')
gui.add(material, 'wireframe')


gui.addColor(parameters, 'color').onChange(()=> {
    material.color.set(parameters.color)
})

gui.add(parameters, 'spin')


//Materials

// const material2 = new THREE.MeshBasicMaterial()
// material2.opacity = 0.5;
// material2.transparent = true

// const material2 = new THREE.MeshNormalMaterial()

const material2 = new THREE.MeshMatcapMaterial()
material2.matcap = matcapTexture

// const material2 = new THREE.MeshDepthMaterial()


const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    material2
)

sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1,1),
    material2
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
    material2
)

torus.position.x = 1.5

scene.add(sphere, plane, torus)


tick()