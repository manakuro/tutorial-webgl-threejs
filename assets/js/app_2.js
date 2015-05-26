var scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer = new THREE.WebGLRenderer();

camera.position.set(50, -50, 100);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(0, 7, 10);
scene.add(directionalLight);

var geometry = new THREE.BoxGeometry(12, 12, 12),
    material = new THREE.MeshPhongMaterial({ color: "white" });

var cube = [],
    position = [
        [15,0,0],
        [15,15,0],
        [15,30,0],
        [15,45,0],
        [15,60,0],
        [0,0,0],
        [15,0,0],
        [30,0,0],
        [60,0,0],
        [60,15,0],
        [60,30,0],
        [60,45,0],
        [60,60,0],
        [90,60,0],
        [90,45,0],
        [90,30,0],
        [90,15,0],
        [90,0,0],
        [105,0,0],
        [120,0,0],
        [135,0,0],
        [105,60,0],
        [120,60,0],
        [135,45,0],
        [135,15,0]
    ];

for (var i = 0; i < position.length; i++) {
    cube[i] = new THREE.Mesh(geometry, material);
    cube[i].position.set(position[i][0]-60, position[i][1]-30, position[i][2]);
    scene.add(cube[i]);
};

var controls = new THREE.OrbitControls(camera, renderer.domElement);

render();

function render () {
    requestAnimationFrame(render);
    for (var i = 0; i < cube.length; i++) {
        cube[i].rotation.x += 0.01;
        cube[i].rotation.y += 0.01;
    };
    controls.update();
    renderer.render(scene, camera);
}

