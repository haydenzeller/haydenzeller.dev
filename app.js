var background_waves_background_color = "#212121";
var background_waves_mesh_color = "#3B4246";

function wavesBackground() {
    var vertex_height = 15000,
        plane_segments_size = 100,
        plane_size = 1245000,
        background_color = background_waves_background_color,
        mesh_color = background_waves_mesh_color;
    var container = document.getElementById('wave'),
        inital_Z = [],
        count = 0;
    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 400000)
    camera.position.z = 10000;
    camera.position.y = 10000;
    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(background_color, 1, 300000);
    var geometry = new THREE.PlaneGeometry(plane_size, plane_size, plane_segments_size, plane_segments_size);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        color: mesh_color,
        wireframe: !0
    }));
    mesh.rotation.x -= Math.PI * .5;
    scene.add(mesh);
    var renderer = new THREE.WebGLRenderer({
        alpha: !1
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(background_color, 1);
    container.appendChild(renderer.domElement);

    function updateGeometry() {
        for (var i = 0; i < geometry.attributes.position.count; i++) {
            var z = Math.random() * vertex_height - vertex_height;
            geometry.attributes.position.setZ(i, z);
            inital_Z[i] = z
        }
    };
    updateGeometry();

    function render() {
        requestAnimationFrame(render);
        var x = camera.position.x;
        var z = camera.position.z;
        camera.position.x = x * Math.cos(0.001) + z * Math.sin(0.001) - 10;
        camera.position.z = z * Math.cos(0.001) - x * Math.sin(0.001) - 10;
        camera.lookAt(new THREE.Vector3(0, 9000, 0))
        for (var i = 0; i < geometry.attributes.position.count; i++) {
            var next_z = Math.sin((i + count * 0.00002)) * (inital_Z[i] - (inital_Z[i] * 0.6));
            if (next_z !== next_z) return;
            geometry.attributes.position.setZ(i, next_z);
            geometry.attributes.position.needsUpdate = !0;
            count += 0.075
        }
        renderer.render(scene, camera)
    }
    render();

    function resize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', resize, !1)
};
wavesBackground();

var i = 0;
var txt = "Hello! I'm Hayden"; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("typed").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter()

