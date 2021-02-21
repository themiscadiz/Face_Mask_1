const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const bubblesGroup = new THREE.Group();


function init() {
	var scene = new THREE.Scene();
	var gui = new dat.GUI();

	// LIGHT
	var pointLight = getPointLight(1);
	var ambientLight = getAmbientLight();
	var sphere = getSphere(0.05);

	// point Light Position
	pointLight.position.z = 4;
	pointLight.position.y = 5;
	pointLight.intensity = 1;

	// GUI
	gui.add(pointLight, 'intensity', 0, 10);
	gui.add(pointLight.position, 'y', 0, 5);
	gui.add(pointLight.position, 'z', 0, 5);

	// GEOMETRY
	var theOriginalColor = new THREE.Color(0xff77ff);
	var bubble = getSphere(.10, theOriginalColor);
	bubble.name = 'bubble-1';
	bubble.position.set(0, 0, -1);

	var plane = getPlane(10);
	plane.name = 'plane-1';
	// plane.rotation.x = Math.PI/2;
	plane.rotation.x = Math.PI;
	plane.position.z = -2;

	// // change color with click
	// window.addEventListener("click", function () {
	// 	theColor = new THREE.Color(0xffffff * Math.random());
	// });


	window.addEventListener("click", function () {
		theColor = new THREE.Color(0xffffff);
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
		let diam = Math.random() * (0 - 0.500) + 0.500;

		// // Raycase draw point.
		// const x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1
		// const y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1

		var bubbleTest = getSphere(diam, theColor);
		bubbleTest.position.set(mouse.x, mouse.y, -1);

		console.log(diam);

		bubblesGroup.add(bubbleTest);
				
	});

	bubblesGroup.name = 'bubblesGroup';
	scene.add(bubblesGroup);
	

	// ADDING TO SCENE
	// Light
	pointLight.add(sphere);
	ambientLight.add(pointLight);
	scene.add(ambientLight);

	// Objects
	scene.add(bubble);
	// scene.add(plane);


	// CAMERA SETTINGS
	var camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);

	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 5;

	camera.lookAt(new THREE.Vector3(0, 0, 0));

	// **********************************

	// **********************************

	// RENDERING SCENE

	var renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	// renderer.setClearColor('rgb(120, 120, 120)');
	renderer.setClearColor(0x000000, 0); // the default
	document.getElementById('webgl').appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	update(renderer, scene, camera, controls);

	return scene;
}


// LIGHTS
function getPointLight(intensity) {
	var light = new THREE.PointLight(0xffffff, intensity);
	light.castShadow = true;

	return light;
}

function getAmbientLight() {
	var lightAmbient = new THREE.AmbientLight(0x404040);
	return lightAmbient;
}

//////////////////////////////////////////////////////////////////////

function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)',
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	mesh.receiveShadow = true;

	return mesh;
}



// SPHERE 
function getSphere(size, theColor) {
	// let ranColor = new THREE.Color(0xffffff * Math.random())
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = new THREE.MeshPhongMaterial({
		color: theColor
	});

	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	// mesh.castShadow = true;

	return mesh;
}

// // ************** NESTED FOR LOOP

// function getBoxGrid(amount, separationMultiplier) {
// 	var group = new THREE.Group();
// 	for (var i = 0; i < amount; i++) {
// 		var obj = getBox(1, 1, 1);
// 		obj.position.x = i * separationMultiplier;
// 		obj.position.y = obj.geometry.parameters.height / 2;
// 		group.add(obj);
// 		for (var j = 1; j < amount; j++) {
// 			var obj = getBox(1, 1, 1);
// 			obj.position.x = i * separationMultiplier;
// 			obj.position.y = obj.geometry.parameters.height / 2;
// 			obj.position.z = j * separationMultiplier;
// 			group.add(obj);
// 		}
// 	}
// 	group.position.x = -(separationMultiplier * (amount - 1)) / 2;
// 	group.position.z = -(separationMultiplier * (amount - 1)) / 2;

// 	return group;
// }
// ************** END NESTED FOR LOOP


// ANIMATION FUNCTIONS
function update(renderer, scene, camera, controls) {
	renderer.render(
		scene,
		camera
	);

	controls.update();
	var bubble = scene.getObjectByName('bubble-1');
	bubble.position.x = globals.a;

	// bubbles
	var bubbles = scene.getObjectByName('bubblesGroup');
	bubbles.position.x = globals.d;
	bubbles.position.y = globals.e;
	bubbles.position.z = -1;
	

	requestAnimationFrame(function () {
		update(renderer, scene, camera, controls);
	})
}

var scene = init();