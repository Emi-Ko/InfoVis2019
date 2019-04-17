function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );


    var light = new THREE.PointLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    var vertices = [
      [-1, 1, -1],  // v0
      [-1,-1, -1],  // v1
      [ 1,-1, -1],  // v2
      [ 1, 1, -1],  // v3
      [-1, 1,  1],  // v4
      [-1,-1,  1],  // v5
      [ 1,-1,  1],  // v6
      [ 1, 1,  1],  // v7
    ];

    var faces = [
      [0,1,2],      // f0 : v0-v1-v2
      [0,2,3],
      [2,7,3],
      [2,6,7],
      [0,7,4],
      [0,3,7],
      [6,4,7],
      [6,5,4],
      [5,0,4],
      [5,1,0],
      [5,2,1],
      [5,6,2],
    ];

    var geometry = new THREE.Geometry();
    for(i=0;i<8;i++){
      geometry.vertices.push(new THREE.Vector3().fromArray(vertices[i]));
    }
    for(i=0;i<12;i++){
      geometry.faces.push(new THREE.Face3(faces[i][0], faces[i][1], faces[i][2]));
    }
    for(i=0;i<12;i++){
      geometry.faces[i].color = new THREE.Color("rgb(238,187,203)");
    }
    geometry.computeFaceNormals();
    //material.side = THREE.DoubleSide;

    //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;

    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );



    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
