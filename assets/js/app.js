$(function(){
    // Set the scene size
    var WIDTH = 400,
        HEIGHT = 300;

    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    // Get the DOM element to attach to
    var $container = $("#container");

    // Create a WebGL renderer, camera and a scene
    var renderer = new THREE.WebGLRenderer(),
        camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        ),
        scene = new THREE.Scene();

    // Add the camera to the scene
    scene.add(camera);

    // The camera starts at 0,0,0
    // so pull it back
    camera.position.z = 300;

    // Start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // Attach the render-supplied DOM element
    $container.append(renderer.domElement);

    // Set up the sphere vars
    var radius = 50,
        segments = 16,
        rings = 16;

    // Create the sphere's material
    var sphereMaterial = new THREE.MeshLambertMaterial({
            color: 0xCC000
        });

    // Create a new mesh with
    // sphere geometry 
    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(
                radius,
                segments,
                rings
            ),
            sphereMaterial
        );

    sphere.geometry.dynamic = true;
    sphere.geometry.verticesNeedUpdate = true;
    sphere.geometry.normalsNeedUpdate = true;

    scene.add(sphere);

    // Create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.set(10, 50, 150);

    scene.add(pointLight);

    // Draw
    renderer.render(scene, camera);

});








