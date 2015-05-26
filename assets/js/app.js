$(function(){
    // set the scene size
    var WIDTH = 400,
        HEIGHT = 300;

    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    // get the DOM element to attach to
    var $container = $("#container");

    // create a WebGL renderer, camera and a scene
    var renderer = new THREE.WebGLRenderer(),
        camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        ),
        scene = new THREE.Scene();

    // add the camera to the scene
    scene.add(camera);

    // the camera starts at 0,0,0
    // so pull it back
    camera.position.z = 300;

    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);

    // create the particle variables
    var particleCount = 1800,
        particles = new THREE.Geometry(),
        pMaterial = new THREE.ParticleBasicMaterial({
            color: 0xFFFFFF,
            size: 20,
            map: THREE.ImageUtils.loadTexture(
                "assets/img/particle.png"
            ),
            blending: THREE.AdditiveBlending,
            transparent: true
        });

    // now create the individual particles
    for (var i = 0; i < particleCount; i++) {

        // create a particle with random
        // position values, -250 -> 250
        var pX = Math.random() * 500 - 250,
            pY = Math.random() * 500 - 250,
            pZ = Math.random() * 500 - 250,
            // particle = new THREE.Vertex(
            //     new THREE.Vector3(pX, pY, pZ)
            // );
            particle = new THREE.Vector3(pX, pY, pZ);

        // create a velocity vector
        particle.velocity = new THREE.Vector3(
            0,              // x
            -Math.random(), // y
            0);             // z

        // add it to the geomery
        particles.vertices.push(particle);
    };

    // create the particle system
    var particleSystem = new THREE.ParticleSystem(
            particles,
            pMaterial
        );

    // also update the particle system to
    // sort the particles which enables 
    // the behaviour we want
    particleSystem.sortParticles = true;

    // add it to the scene
    scene.add(particleSystem);

    // draw
    // renderer.render(scene, camera);

    requestAnimFrame(update);

    /*-------------------------
        function
    -------------------------*/
    function update() {
        
        // add some rotation to the system
        particleSystem.rotation.y += 0.01;

        var pCount = particleCount;
        while(pCount--) {

            // get the particle
            var particle = particles.vertices[pCount];

            // check if we need to reset
            if (particle.position.y < -200) {
                particle.position.y = 200;
                particle.velocity.y = 0;
            }

            // update the velocity with
            // a splat of randomiz
            particle.velocity.y -= Math.random() * .1;

            // and the position
            particle.position.addSelf(particle.velocity);
        }

        // flag to the particle system
        // that we've changed its vertices.
        particleSystem.geomery.__dirtyVertices = true;

        // draw
        renderer.render(scene, camera);

        // set up the next call
        requestAnimFrame(update);
    }

});








