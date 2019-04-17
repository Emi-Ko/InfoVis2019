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

    // if you use MeshLambertMaterial, use those code
    //var light2 = new THREE.AmbientLight( 0x383c3c );
    //light2.position.set( 1, 1, 1 );
    //scene.add(light2)

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
      [0,2,1],      // f0 : v0-v1-v2
      [0,3,2],
      [2,7,6],
      [2,3,7],
      [0,7,3],
      [0,4,7],
      [6,4,5],
      [6,7,4],
      [5,0,1],
      [5,4,0],
      [5,2,6],
      [5,1,2],
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
        document.addEventListener( 'mousedown', mouse_down_event );
    }

    function mouse_down_event(event){
      //Mouse picking
      var x_win = event.clientX;
      var y_win = event.clientY;

      var vx = renderer.domElement.offsetLeft;
      var vy = renderer.domElement.offsetTop;
      var vw = renderer.domElement.width;
      var vh = renderer.domElement.height;

      var x_NDC = 2 * ( x_win - vx ) / vw - 1;
      var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );

      var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
      var p_wld = p_NDC.unproject( camera );

      var origin = camera.position;
      var direction = p_NDC.sub(camera.position).normalize();

      var raycaster = new THREE.Raycaster( origin, direction );
      var intersects = raycaster.intersectObject(cube);
      if ( intersects.length > 0 ){
        intersects[0].face.color.set("rgb(185,208,139)");
        intersects[0].object.geometry.colorsNeedUpdate = true;
      }
    }
}
