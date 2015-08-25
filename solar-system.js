/*
Álvaro Peris

Solar system.

All data is real:
	- Orbits
	- Rotation periods
	- Translation periods
	- Planet's sizes
	(by default, in order to have a good visualization of the planets, they are scaled x1000)

*/


// Global vars

var renderer,scene,camera;
var cameraControls;
var far=10000;
var near = 0.001;
var cam, bgScene, bgCam	;
var text2;


var sprite;

var geoSol,geoMerc,geoVen,geoTierra,geoLuna,geoMar,geoJup,geoSat,geoSatRings,geoUra,geoUraRings,geoNep;

var keyboard = new THREEx.KeyboardState();
var axisHelper;
var i;
var dias = 0;
var anyos = 0;
var theta = 0;
var tamScale = 1;
var posScale = 1;
var timeScale = 1;
var positions;

var orbitas = new THREE.Object3D();

var scale_factor = 0.1; // Avoids Z-buffer precision problems

var scaled = false;

// Planet vars

var sol = new THREE.Object3D();
var mercurio;
var venus;
var tierra;
var marte;
var jupiter;
var saturno;
var saturnoRings;
var urano;
var neptuno;



// Planets data

// Radious: Thousands of km 

var 	 sol_rad 	 = scale_factor*1392/100;
var mercurio_rad	 = scale_factor*2.49;
var    venus_rad 	 = scale_factor*6;
var   tierra_rad 	 = scale_factor*6.3;
var     luna_rad 	 = scale_factor*1.7;
var    marte_rad 	 = scale_factor*3.38;
var  jupiter_rad 	 = scale_factor*69.9;
var  saturno_rad	 = scale_factor*58.2;
var satRings_rad_max = scale_factor*(58.2+120);
var satRings_rad_min = scale_factor*(58.2+6.63);
var    urano_rad 	 = scale_factor*25.3;
var uraRings_rad_max = scale_factor*(25.3+98);
var uraRings_rad_min = scale_factor*(25.3+38);
var  neptuno_rad 	 = scale_factor*24.62;

var 	 sol_tam 	 = sol_rad;
var mercurio_tam	 = mercurio_rad;
var    venus_tam 	 = venus_rad;
var   tierra_tam 	 = tierra_rad;
var     luna_tam 	 = luna_rad;
var    marte_tam 	 = marte_rad;
var  jupiter_tam 	 = jupiter_rad;
var  saturno_tam	 = saturno_rad;
var satRings_tam_max = satRings_rad_max;
var satRings_tam_min = satRings_rad_min;
var    urano_tam 	 = urano_rad;
var uraRings_tam_max = uraRings_rad_max;
var uraRings_tam_min = uraRings_rad_min;
var  neptuno_tam 	 = neptuno_rad;



// Major axis == Distance to the sun. In thousand of km.

var mercurio_ejeM =  scale_factor*57.909;
var    venus_ejeM =  scale_factor*108.208;
var   tierra_ejeM =  scale_factor*149.597;
var     luna_ejeM =  scale_factor*10.384399;
var    marte_ejeM =  scale_factor*227.936;
var  jupiter_ejeM =  scale_factor*778.412;
var  saturno_ejeM =  scale_factor*1426.725;
var    urano_ejeM =  scale_factor*2870.972;
var  neptuno_ejeM =  scale_factor*4498.252;

// Orbits obliquity. In rads.

var mercurio_obli =  1/360*2*Math.PI*7;
var    venus_obli =  1/360*2*Math.PI*3.39;
var   tierra_obli =  1/360*2*Math.PI*0;
var     luna_obli =  1/360*2*Math.PI*5.14;
var    marte_obli =  1/360*2*Math.PI*1.85;
var  jupiter_obli =  1/360*2*Math.PI*1.305;
var  saturno_obli =  1/360*2*Math.PI*2.48;
var    urano_obli =  1/360*2*Math.PI*0.769;
var  neptuno_obli =  1/360*2*Math.PI*1.769;



// Orbits data: Major axis, minor axis and excentricity.

var mercurio_a = mercurio_ejeM;
var mercurio_e =0.205;
var mercurio_b = mercurio_a*Math.sqrt(1-mercurio_e*mercurio_e);
var mercurio_theta = 0;

var venus_a = venus_ejeM;
var venus_e = 0.0067;
var venus_b = venus_a*Math.sqrt(1-venus_e*venus_e);
var venus_theta = 0;

var tierra_a = tierra_ejeM;
var tierra_e = 0.0167;
var tierra_b = tierra_a*Math.sqrt(1-tierra_e*tierra_e);
var tierra_theta = 0;


var luna_a =luna_ejeM;
var luna_e = 0.0549;
var luna_b = luna_a*Math.sqrt(1-luna_e*luna_e);
var luna_theta = 0;

var marte_a = marte_ejeM;
var marte_e = 0.093;
var marte_b = marte_a*Math.sqrt(1-marte_e*marte_e);
var marte_theta = 0;


var jupiter_a = jupiter_ejeM;
var jupiter_e = 0.0483;
var jupiter_b = jupiter_a*Math.sqrt(1-jupiter_e*jupiter_e);
var jupiter_theta = 0;


var saturno_a =saturno_ejeM;
var saturno_e = 0.0541;
var saturno_b = saturno_a*Math.sqrt(1-saturno_e*saturno_e);
var saturno_theta = 0;



var urano_a = urano_ejeM;
var urano_e = 0.0471;
var urano_b = urano_a*Math.sqrt(1-urano_e*urano_e);
var urano_theta = 0;


var neptuno_a = neptuno_ejeM;
var neptuno_e = 0.0085;
var neptuno_b = neptuno_a*Math.sqrt(1-neptuno_e*neptuno_e);
var neptuno_theta = 0;

// Rotation periods (days)
var mercurio_rot = 58.64;
var venus_rot	= -243;
var tierra_rot	= 0.99;
var luna_rot	= 0.3781;
var marte_rot	=1.025;
var jupiter_rot	=0.413;
var saturno_rot	=0.444;
var urano_rot	=-0.718;
var neptuno_rot	=0.671;


//Orbital periods (years)
var mercurio_per = 0.240  ;
var    venus_per = 0.615  ;
var   tierra_per = 1      ;
var     luna_per = 0.074  ;
var    marte_per = 1.88   ;
var  jupiter_per = 11.86  ;
var  saturno_per = 29.447 ;
var    urano_per = 84.016 ;
var  neptuno_per = 64.7913;


function init (){

	renderer = new THREE.WebGLRenderer();
	renderer.antialias = true;
	renderer.setSize(window.innerWidth,window.innerHeight);
	renderer.setClearColor(new THREE.Color(0x000000),1.0);



	dias = 0;
	i=0;
	document.getElementById('container').appendChild(renderer.domElement);

	

	text2 = document.createElement('div');
	text2.style.position = 'absolute';
	text2.style.width = 180;
	text2.style.height = 40;
	text2.style.color="#00E5E5";
	
	
	text2.style.top = 40 + 'px';
	text2.style.left = 10 + 'px';
	document.body.appendChild(text2);

	//Instancia la escena
	scene = new THREE.Scene();


	var aspectRatio = window.innerWidth/window.innerHeight;
	camera = new THREE.PerspectiveCamera(/*fovy*/60, /*razon de aspecto*/aspectRatio,/*cerca*/ near,/*lejos*/far);
	
	// Positioning the camera
	camera.position.set(scale_factor*450,scale_factor*50,scale_factor*450);
	// Setting the point of interes
	camera.lookAt(new THREE.Vector3(0,0,0));
	

	// Instanciation of the camera controls
	cameraControls = new THREE.OrbitControls(camera,renderer.domElement);
	
	// Orbitational center
	cameraControls.target.set(0,0,0);
	cameraControls.maxDistance = far/4;
	
	// Register resize callback
	window.addEventListener('resize',updateAspectRatio);

	// Lighting
	var luzAmbiente = new THREE.AmbientLight( 0x404040);  // Ambient light
	scene.add(luzAmbiente)

	var luzPuntual = new THREE.PointLight(0xFFFFFF,3); // Point light (sun)
	luzPuntual.position.set(0,0,0);
	scene.add(luzPuntual);

	// Enable shadows
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;


    // Stats
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '10px';
    stats.domElement.style.left = '10px';
    document.body.appendChild(stats.domElement);



}











// Scene description
function loadScene(){



// Load the texture cube (some fancy stars)
var urls = ["textures/backgroundcube.png", "textures/backgroundcube.png",
"textures/backgroundcube.png", "textures/backgroundcube.png",
"textures/backgroundcube.png", "textures/backgroundcube.png",];

var mapaEntorno = THREE.ImageUtils.loadTextureCube(urls);
mapaEntorno.format = THREE.RGBFormat;



// Room (our universe)

var shader = THREE.ShaderLib.cube;
shader.uniforms.tCube.value = mapaEntorno;

var wallsMaterial = new THREE.ShaderMaterial({
	fragmentShader:shader.fragmentShader,
	vertexShader: shader.vertexShader,
	uniforms: shader.uniforms,
	depthWrite: false,
	side: THREE.BackSide
});

var room = new THREE.Mesh(new THREE.BoxGeometry(far,far,far),wallsMaterial);

scene.add(room);


// Load and configure textures

	// Sun
	var texSol = new THREE.ImageUtils.loadTexture("textures/sunmap.jpg");
	texSol.repeat.set(1,1);
	texSol.magFilter = THREE.LinearFilter; 
	texSol.minFilter = THREE.LinearFilter; 


	// Mercury
	var texMerc = new THREE.ImageUtils.loadTexture("textures/mercurymap.jpg");
	texMerc.repeat.set(1,1);
	texMerc.magFilter = THREE.LinearFilter;
	texMerc.minFilter = THREE.LinearFilter;





	// Venus
	var texVen = new THREE.ImageUtils.loadTexture("textures/venusmap.jpg");
	texVen.repeat.set(1,1);
	texVen.magFilter = THREE.LinearFilter;
	texVen.minFilter = THREE.LinearFilter;



	// Earth
	var texTie = new THREE.ImageUtils.loadTexture("textures/earthmap1k.jpg");
	texTie.repeat.set(1,1);
	texTie.magFilter = THREE.LinearFilter; 
	texTie.minFilter = THREE.LinearFilter; 



	//Moon
	var texLun = new THREE.ImageUtils.loadTexture("textures/moonmap1k.jpg");
	texLun.repeat.set(1,1);
	texLun.magFilter = THREE.LinearFilter; 
	texLun.minFilter = THREE.LinearFilter; 



	// Mars
	var texMart = new THREE.ImageUtils.loadTexture("textures/marsmap1k.jpg");
	texMart.repeat.set(1,1);
	texMart.magFilter = THREE.LinearFilter;
	texMart.minFilter = THREE.LinearFilter;



	// Jupiter
	var texJup= new THREE.ImageUtils.loadTexture("textures/jupitermap.jpg");
	texJup.repeat.set(1,1);
	texJup.magFilter = THREE.LinearFilter; 
	texJup.minFilter = THREE.LinearFilter; 



	// Saturn
	var texSat = new THREE.ImageUtils.loadTexture("textures/saturnmap.jpg");
	texSat.repeat.set(1,1);
	texSat.magFilter = THREE.LinearFilter; 
	texSat.minFilter = THREE.LinearFilter; 


	// Saturn rings
	var texSatRings = new THREE.ImageUtils.loadTexture("textures/saturnringcolor.jpg");
	texSatRings.repeat.set(1,1);
	texSatRings.magFilter = THREE.LinearFilter; 
	texSatRings.minFilter = THREE.LinearFilter; 
	
	var texSatRingsAlpha = THREE.ImageUtils.loadTexture( "textures/saturnringpatternrot.gif" );
	texSatRingsAlpha.repeat.set(1,1);
	texSatRingsAlpha.magFilter = THREE.LinearFilter; //Píxel menor que texel
	texSatRingsAlpha.minFilter = THREE.LinearFilter; //Texel menor que píxel

	// Uranus
	var texUra = new THREE.ImageUtils.loadTexture("textures/uranusmap.jpg");
	texUra.repeat.set(1,1);
	texUra.magFilter = THREE.LinearFilter; 
	texUra.minFilter = THREE.LinearFilter; 


	// Uranus rings 
	var texUraRings = new THREE.ImageUtils.loadTexture("textures/uranusringcolour.jpg");
	texUraRings.repeat.set(1,1);
	texUraRings.magFilter = THREE.LinearFilter; 
	texUraRings.minFilter = THREE.LinearFilter; 


	var texUraRingsAlpha = THREE.ImageUtils.loadTexture( "textures/uranusringtrans.gif" );
	texUraRingsAlpha.repeat.set(1,1);
	texUraRingsAlpha.magFilter = THREE.LinearFilter; 
	texUraRingsAlpha.minFilter = THREE.LinearFilter; 


	// Neptune
	var texNep = new THREE.ImageUtils.loadTexture("textures/neptunemap.jpg");
	texNep.repeat.set(1,1);
	texNep.magFilter = THREE.LinearFilter; 
	texNep.minFilter = THREE.LinearFilter; 

	// Create the materials
	var materialSol		 = new THREE.MeshPhongMaterial({ ambient:0xFFF300, side: THREE.Frontside,map: texSol});
	var materialMercurio = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF, map: texMerc});
	var materialVenus 	 = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF, map: texVen});
	var materialTierra	 = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF, map: texTie});
	var materialLuna 	 = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF, map: texLun});
	var materialMarte 	 = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF, map: texMart});
	var materialJupiter	 = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF,  side: THREE.BothSides,  map: texJup});
	var materialSaturno	 = new THREE.MeshLambertMaterial({side: THREE.Frontside,ambient:0xFFFFFF, map: texSat});
	var materialSaturnoRings = new THREE.MeshLambertMaterial({ambient         : 0xFFFFFF,
		transparent     : true,
		alphaTest       : 0.05,
		shininess       : 100,
		opacity         : 1, 
		shading         : THREE.SmoothShading ,
		map 			: texSatRings,
		alphaMap        : texSatRingsAlpha,
	});
	
	var materialUrano	 = new THREE.MeshLambertMaterial({ambient:0xFFFFFF, map: texUra});
	var materialUranoRings = new THREE.MeshLambertMaterial({ambient         : 0xFFFFFF,
		transparent     : true,
		alphaTest       : 0.05,
		shininess       : 100,
		opacity         : 0.5,
		shading         : THREE.SmoothShading,
		map 			: texUraRings,
		alphaMap        : texUraRingsAlpha
	});
	materialUranoRings.side= THREE.DoubleSide;	
	var materialNeptuno	 = new THREE.MeshLambertMaterial({ambient:0xFFFFFF, map: texNep});

	// Create the sun: Trivial approach -> Shining sprite

	geoSol = new THREE.SphereGeometry(sol_tam, 32,32 );
	sol = new THREE.Mesh(geoSol,materialSol);
	
	var spriteMaterial = new THREE.SpriteMaterial( 
	{ 
		map: new THREE.ImageUtils.loadTexture( 'textures/lensflare.png' ), 
		useScreenCoordinates: true,
		color: 0xFFF300, transparent: true, blending: THREE.AdditiveBlending,
		scaleByViewport:true
	});
	sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(9*sol_tam, 9*sol_tam,9*sol_tam);
		scene.add(sprite); // this centers the glow at the mesh



	// Create the planets objects


	geoMerc = new THREE.SphereGeometry(mercurio_tam, 32,32 );
	mercurio = new THREE.Mesh(geoMerc,materialMercurio);
	mercurio.position.x = mercurio_a;


	geoVen = new THREE.SphereGeometry(venus_tam, 32,32 );
	venus = new THREE.Mesh(geoVen,materialVenus);
	venus.position.x = venus_a;


	geoTierra = new THREE.SphereGeometry(tierra_tam, 32,32 );
	tierra = new THREE.Mesh(geoTierra,materialTierra);
	tierra.position.x = tierra_a;

	geoLuna = new THREE.SphereGeometry(luna_tam, 32,32 );
	luna = new THREE.Mesh(geoLuna,materialLuna);
	luna.position.x = tierra_a +luna_a;

	geoMar = new THREE.SphereGeometry(marte_tam, 32,32 );
	marte = new THREE.Mesh(geoMar,materialMarte);
	marte.position.x = marte_a;


	geoJup = new THREE.SphereGeometry(jupiter_tam, 32,32 );
	jupiter = new THREE.Mesh(geoJup,materialJupiter);
	jupiter.position.x = jupiter_a;

	geoSat= new THREE.SphereGeometry(saturno_tam, 32,32 );
	saturno = new THREE.Mesh(geoSat,materialSaturno);
	saturno.position.x = saturno_a;
	saturno.position.z = saturno_a;

	var geoSatRings =  new THREE.TorusGeometry(satRings_tam_max , satRings_tam_min, 2, 70 );
	saturnoRings = new THREE.Mesh(geoSatRings,materialSaturnoRings);
	saturnoRings.position.x = saturno_a;
	saturnoRings.rotation.x = Math.PI/2.2;



	geoUra = new THREE.SphereGeometry(urano_tam, 32,32 );
	urano = new THREE.Mesh(geoUra,materialUrano);
	urano.position.x = urano_a;

	geoUraRings =  new THREE.TorusGeometry(uraRings_tam_max , uraRings_tam_min, 2, 70 );
	uranoRings = new THREE.Mesh(geoUraRings,materialUranoRings);
	uranoRings.position.x =urano_a;


	geoNep= new THREE.SphereGeometry(neptuno_tam, 32,32 );
	neptuno = new THREE.Mesh(geoNep,materialNeptuno);
	neptuno.position.x = neptuno_a;


	// Shadow configuration: Only between the earth and the moon (style decision)

	mercurio.receiveShadow = false;
	venus.receiveShadow = false;
	tierra.receiveShadow = true;
	luna.receiveShadow = true;
	marte.receiveShadow = false;
	jupiter.receiveShadow = false;
	saturno.receiveShadow = false;
	saturnoRings.receiveShadow = false;
	urano.receiveShadow = false;
	uranoRings.receiveShadow = false;
	neptuno.receiveShadow = false;
	mercurio.castShadow = false;
	venus.castShadow = false;
	tierra.castShadow = true;
	luna.castShadow = true;
	marte.castShadow = false;
	jupiter.castShadow = false;
	saturno.castShadow = false;
	saturnoRings.castShadow = false;
	urano.castShadow = false;
	uranoRings.castShadow = false;
	neptuno.castShadow = false;

	// Add the objects to the scene

	scene.add(mercurio);
	scene.add(venus);
	scene.add(tierra);
	scene.add(luna);
	scene.add(marte);
	scene.add(jupiter);
	scene.add(saturno);
	scene.add(saturnoRings);
	scene.add(urano);
	scene.add(uranoRings);
	scene.add(neptuno);





	// Earth / moon shadows

	var luzTie = new THREE.SpotLight(0xAA0000,1);
	luzTie.position.set(0,0,0);		
	luzTie.target = tierra;
	luzTie.angle = Math.PI/2;
	luzTie.shadowCameraNear = 0.1;
	luzTie.shadowCameraFar = 500;
	//luzTie.shadowCameraVisible = true;
	luzTie.castShadow = true;
	luzTie.shadowMapWidth = 1024;
	luzTie.shadowMapHeight = 1024 	;	
	luzTie.shadowDarkness = 0.7;

	var luzLun = new THREE.SpotLight(0xAA0000,1);
	luzLun.position.set(0,0,0);			
	luzLun.target = luna;
	luzLun.angle = Math.PI/2;
	luzLun.shadowCameraNear = 0.1;
	luzLun.shadowCameraFar = 500;
	//luzLun.shadowCameraVisible = true;
	luzLun.castShadow = true;
	luzLun.shadowMapWidth = 1024;
	luzLun.shadowMapHeight = 1024 	;	
	luzLun.shadowDarkness = 0.7;


	scene.add(luzTie);
	scene.add(luzLun);



    // Configure orbits

	// Colours
	var mercuriomat = new THREE.LineBasicMaterial({color: 0xBEBA99,}); //Gris/beige
	var    venusmat = new THREE.LineBasicMaterial({color: 0xFFF300,}); //Amarillo
	var   tierramat = new THREE.LineBasicMaterial({color: 0x15FF00,}); //Verde
	var    martemat = new THREE.LineBasicMaterial({color: 0xFF0000,}); //Rojo
	var  jupitermat = new THREE.LineBasicMaterial({color: 0xFF9A00,}); //Naranja
	var  saturnomat = new THREE.LineBasicMaterial({color: 0xF0D1A1,}); //Marron muy claro
	var    uranomat = new THREE.LineBasicMaterial({color: 0x060F69,}); //Azul oscuro
	var  neptunomat = new THREE.LineBasicMaterial({color: 0x30BBFF,}); //Azul brillante
	
	
	// Geometries
	var mercurio_orbit = new THREE.Geometry();
	var    venus_orbit = new THREE.Geometry();
	var   tierra_orbit = new THREE.Geometry();
	var     luna_orbit = new THREE.Geometry();
	var    marte_orbit = new THREE.Geometry();
	var  jupiter_orbit = new THREE.Geometry();
	var  saturno_orbit = new THREE.Geometry();
	var    urano_orbit = new THREE.Geometry();
	var  neptuno_orbit = new THREE.Geometry();
	
	
	// Compute each orbit: Polar coordinates
	
	for(var theta = 0;  theta <= 2*Math.PI;  theta+=Math.PI/365){
		mercurio_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(mercurio_a*mercurio_a)+ Math.sin(theta)*Math.sin(theta)/(mercurio_b*mercurio_b))) * Math.cos(theta),
			Math.sin(mercurio_obli+theta),		
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(mercurio_a*mercurio_a)+ Math.sin(theta)*Math.sin(theta)/(mercurio_b*mercurio_b))) * Math.sin(theta)));  
	}
	for(var theta = 0;  theta <= 2*Math.PI;  theta+=Math.PI /365){
		venus_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(venus_a*venus_a)+ Math.sin(theta)*Math.sin(theta)/(venus_b*venus_b))) * Math.cos(theta),
			Math.sin(venus_obli+theta),		
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(venus_a*venus_a)+ Math.sin(theta)*Math.sin(theta)/(venus_b*venus_b))) * Math.sin(theta)));  
	}
	for(var theta = 0;  theta < 2*Math.PI;  theta+=Math.PI /365){
		tierra_orbit.vertices.push(new THREE.Vector3( 1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(tierra_a*tierra_a)+ Math.sin(theta)*Math.sin(theta)/(tierra_b*tierra_b))) * Math.cos(theta),
			Math.sin(tierra_obli+theta),
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(tierra_a*tierra_a)+ Math.sin(theta)*Math.sin(theta)/(tierra_b*tierra_b))) * Math.sin(theta)));  
	}
	
	for(var theta = 0;  theta < 2*Math.PI;  theta+=Math.PI/365){
		marte_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(marte_a*marte_a)+ Math.sin(theta)*Math.sin(theta)/(marte_b*marte_b))) * Math.cos(theta),
			Math.sin(theta+marte_obli),
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(marte_a*marte_a)+ Math.sin(theta)*Math.sin(theta)/(marte_b*marte_b))) * Math.sin(theta)));  
	}
	for(var theta = 0;  theta < 2*Math.PI;  theta+=Math.PI/365){
		jupiter_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(jupiter_a*jupiter_a)+ Math.sin(theta)*Math.sin(theta)/(jupiter_b*jupiter_b))) * Math.cos(theta),
			Math.sin(jupiter_obli+theta), 
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(jupiter_a*jupiter_a)+ Math.sin(theta)*Math.sin(theta)/(jupiter_b*jupiter_b))) * Math.sin(theta)));  
	}
	for(var theta = 0;  theta < 2*Math.PI;  theta+=Math.PI/365){
		saturno_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(saturno_a*saturno_a)+ Math.sin(theta)*Math.sin(theta)/(saturno_b*saturno_b))) * Math.cos(theta),
			Math.sin(saturno_obli+theta),
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(saturno_a*saturno_a)+ Math.sin(theta)*Math.sin(theta)/(saturno_b*saturno_b))) * Math.sin(theta)));  
	}
	for(var theta = 0;  theta < 2*Math.PI;  theta+=Math.PI/365){
		urano_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(urano_a*urano_a)+ Math.sin(theta)*Math.sin(theta)/(urano_b*urano_b))) * Math.cos(theta),
			Math.sin(urano_obli+theta),
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(urano_a*urano_a)+ Math.sin(theta)*Math.sin(theta)/(urano_b*urano_b))) * Math.sin(theta)));  
	}
	for(var theta = 0;  theta < 2*Math.PI;  theta+=Math.PI /365){
		neptuno_orbit.vertices.push(new THREE.Vector3(1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(neptuno_a*neptuno_a)+ Math.sin(theta)*Math.sin(theta)/(neptuno_b*neptuno_b))) * Math.cos(theta),
			Math.sin(neptuno_obli+theta),
			1 /(Math.sqrt(Math.cos(theta)*Math.cos(theta)/(neptuno_a*neptuno_a)+ Math.sin(theta)*Math.sin(theta)/(neptuno_b*neptuno_b))) * Math.sin(theta)));  
	}
	
	// Add the orbits to the scene

	orbitas.add(new THREE.Line(mercurio_orbit,mercuriomat));
	orbitas.add(new THREE.Line(venus_orbit,   venusmat));
	orbitas.add(new THREE.Line(tierra_orbit,  tierramat));
	orbitas.add(new THREE.Line(marte_orbit,   martemat));
	orbitas.add(new THREE.Line(jupiter_orbit, jupitermat));
	orbitas.add(new THREE.Line(saturno_orbit, saturnomat));
	orbitas.add(new THREE.Line(urano_orbit,   uranomat));
	orbitas.add(new THREE.Line(neptuno_orbit, neptunomat));
	
	
	
	
	// Axis
	
	axisHelper = new THREE.AxisHelper(far);
	axisHelper.visible=false;
	orbitas.visible=false;
	
	scene.add(axisHelper);
	scene.add(orbitas);

}

var antes = Date.now();
var angulo = 0;

// Update function

function update(){



	// Camera update
	cameraControls.update();


	// Menu controllers

if(effectController.escalaTam == true){


	if (scaled != true){
		mercurio_tam	 = 1/1000*mercurio_rad;
		venus_tam 		 = 1/1000*venus_rad;
		tierra_tam 		 = 1/1000*tierra_rad;
		luna_tam 		 = 1/1000*luna_rad;
		marte_tam 		 = 1/1000*marte_rad;
		jupiter_tam 	 = 1/1000*jupiter_rad;
		saturno_tam		 = 1/1000*saturno_rad;
		satRings_tam_max = 1/1000*satRings_rad_max;
		satRings_tam_min = 1/1000*satRings_rad_min;
		urano_tam 		 = 1/1000*urano_rad;
		uraRings_tam_max = 1/1000*uraRings_rad_max;
		uraRings_tam_min = 1/1000*uraRings_rad_min;
		neptuno_tam 	 = 1/1000*neptuno_rad;

		mercurio.scale.set(1/1000,1/1000,1/1000);
		venus.scale.set(1/1000,1/1000,1/1000);
		tierra.scale.set(1/1000,1/1000,1/1000);
		luna.scale.set(1/1000,1/1000,1/1000);
		marte.scale.set(1/1000,1/1000,1/1000);
		jupiter.scale.set(1/1000,1/1000,1/1000);
		saturno.scale.set(1/1000,1/1000,1/1000);
		saturnoRings.scale.set(1/1000,1/1000,1/1000);
		urano.scale.set(1/1000,1/1000,1/1000);
		uranoRings.scale.set(1/1000,1/1000,1/1000);
		neptuno.scale.set(1/1000,1/1000,1/1000);

		scaled=true;
	}
}

else{ 	 

	if(scaled ==true){
		mercurio_tam	 = mercurio_rad;
		venus_tam 		 = venus_rad;
		tierra_tam 		 = tierra_rad;
		luna_tam 		 = luna_rad;
		marte_tam 		 = marte_rad;
		jupiter_tam 	 = jupiter_rad;
		saturno_tam		 = saturno_rad;
		satRings_tam_max = satRings_rad_max;
		satRings_tam_min = satRings_rad_min;
		urano_tam 		 = urano_rad;
		uraRings_tam_max = uraRings_rad_max;
		uraRings_tam_min = uraRings_rad_min;
		neptuno_tam 	 = neptuno_rad;

		mercurio.scale.set(1,1,1);
		venus.scale.set(1,1,1);
		tierra.scale.set(1,1,1);
		luna.scale.set(1,1,1);
		marte.scale.set(1,1,1);
		jupiter.scale.set(1,1,1);
		saturno.scale.set(1,1,1);
		saturnoRings.scale.set(1,1,1);
		urano.scale.set(1,1,1);
		uranoRings.scale.set(1,1,1);
		neptuno.scale.set(1,1,1);

	  scaled=false;
	}

}


	switch (effectController.seguimiento){
	
		case "Sun" : 
		if(effectController.seguir) camera.position.set(sol.position.x + 4*sol_tam,sol.position.y+sol_tam,sol.position.z+4*sol_tam);
		camera.lookAt(sol.position);
		break;
	
		case "Mercury" : 
		if(effectController.seguir) camera.position.set(mercurio.position.x + 4*mercurio_tam,mercurio.position.y+mercurio_tam,mercurio.position.z+4*mercurio_tam);
		camera.lookAt(mercurio.position);
		break;
	
	
		case "Venus" : 
		if(effectController.seguir) camera.position.set(venus.position.x + 4*venus_tam,venus.position.y+venus_tam,mercurio.position.z+4*venus_tam);
		camera.lookAt(venus.position);
		break;
	
	
		case "Earth" : 
		if(effectController.seguir) camera.position.set(tierra.position.x + 4*tierra_tam,tierra.position.y+tierra_tam,tierra.position.z+4*tierra_tam);
		camera.lookAt(tierra.position);
		break;
		case "Moon" : 
		if(effectController.seguir) camera.position.set(luna.position.x + 4*luna_tam,luna.position.y+luna_tam,luna.position.z+4*luna_tam);
		camera.lookAt(luna.position);
		break;
		case "Mars" : 
		if(effectController.seguir) camera.position.set(marte.position.x + 4*marte_tam,marte.position.y+marte_tam,marte.position.z+4*marte_tam);
		camera.lookAt(marte.position);
		break;
		case "Jupiter" : 
		if(effectController.seguir) camera.position.set(jupiter.position.x + 4*jupiter_tam,jupiter.position.y+jupiter_tam,jupiter.position.z+4*jupiter_tam);
		camera.lookAt(jupiter.position);
		break;
	
		case "Saturn" : 
		if(effectController.seguir) camera.position.set(saturno.position.x + 4*saturno_tam,saturno.position.y+saturno_tam,saturno.position.z+4*saturno_tam);
		camera.lookAt(saturno.position);
		break;
	
		case "Uranus" : 
		if(effectController.seguir) camera.position.set(urano.position.x + 20*urano_tam,urano.position.y+urano_tam,urano.position.z+20*urano_tam);
		camera.lookAt(urano.position);
		break;
	
		case "Neptune" : 
		if(effectController.seguir) camera.position.set(neptuno.position.x + 4*neptuno_tam,neptuno.position.y,neptuno.position.z+4*neptuno_tam);
		camera.lookAt(neptuno.position);
		break;
		default : 
	
		break;
	
	
	}
	
	
	// Computation of the semi-axis of the ellipses of the orbits
	
	mercurio_a  	 = mercurio_ejeM;
	venus_a     	 =    venus_ejeM;
	tierra_a 		 =   tierra_ejeM;
	luna_a 			 =     luna_ejeM;
	marte_a   		 =    marte_ejeM;
	jupiter_a 		 =  jupiter_ejeM;
	saturno_a 		 =  saturno_ejeM;
	neptuno_a 		 =  neptuno_ejeM;
	urano_a 	 	 =    urano_ejeM;
	
	
	mercurio_b = mercurio_a*Math.sqrt(1-mercurio_e*mercurio_e);
	venus_b = venus_a*Math.sqrt(1-venus_e*venus_e);
	tierra_b = tierra_a*Math.sqrt(1-tierra_e*tierra_e);
	luna_b = luna_a*Math.sqrt(1-luna_e*luna_e);
	marte_b = marte_a*Math.sqrt(1-marte_e*marte_e);
	jupiter_b = jupiter_a*Math.sqrt(1-jupiter_e*jupiter_e);
	saturno_b = saturno_a*Math.sqrt(1-saturno_e*saturno_e);
	neptuno_b = neptuno_a*Math.sqrt(1-neptuno_e*neptuno_e);
	urano_b = urano_a*Math.sqrt(1-urano_e*urano_e);
	
	
	
	// Translation movements
		
	mercurio.position.x =1 /(Math.sqrt(Math.cos(mercurio_theta)*Math.cos(mercurio_theta)/(mercurio_a*mercurio_a)+ Math.sin(mercurio_theta)*Math.sin(mercurio_theta)/(mercurio_b*mercurio_b))) * Math.cos(mercurio_theta);
	mercurio.position.z =  1 /(Math.sqrt(Math.cos(mercurio_theta)*Math.cos(mercurio_theta)/(mercurio_a*mercurio_a)+ Math.sin(mercurio_theta)*Math.sin(mercurio_theta)/(mercurio_b*mercurio_b))) * Math.sin(mercurio_theta);
    mercurio.position.y  = Math.sin(mercurio_obli+mercurio_theta);// Math.cos( vz )*c;

    venus.position.x =1 /(Math.sqrt(Math.cos(venus_theta)*Math.cos(venus_theta)/(venus_a*venus_a)+ Math.sin(venus_theta)*Math.sin(venus_theta)/(venus_b*venus_b))) * Math.cos(venus_theta);
    venus.position.z =  1 /(Math.sqrt(Math.cos(venus_theta)*Math.cos(venus_theta)/(venus_a*venus_a)+ Math.sin(venus_theta)*Math.sin(venus_theta)/(venus_b*venus_b))) * Math.sin(venus_theta);
    venus.position.y  =Math.sin(venus_obli+venus_theta);// Math.cos( vz )*c;

    tierra.position.x =1 /(Math.sqrt(Math.cos(tierra_theta)*Math.cos(tierra_theta)/(tierra_a*tierra_a)+ Math.sin(tierra_theta)*Math.sin(tierra_theta)/(tierra_b*tierra_b))) * Math.cos(tierra_theta);
    tierra.position.z =  1 /(Math.sqrt(Math.cos(tierra_theta)*Math.cos(tierra_theta)/(tierra_a*tierra_a)+ Math.sin(tierra_theta)*Math.sin(tierra_theta)/(tierra_b*tierra_b))) * Math.sin(tierra_theta);
    tierra.position.y  =Math.sin(tierra_obli+tierra_theta);// Math.cos( vz )*c;

    luna.position.x =tierra.position.x + 1 /(Math.sqrt(Math.cos(luna_theta)*Math.cos(luna_theta)/(luna_a*luna_a)+ Math.sin(luna_theta)*Math.sin(luna_theta)/(luna_b*luna_b))) * Math.cos(luna_theta);
    luna.position.z =  tierra.position.z + 1 /(Math.sqrt(Math.cos(luna_theta)*Math.cos(luna_theta)/(luna_a*luna_a)+ Math.sin(luna_theta)*Math.sin(luna_theta)/(luna_b*luna_b))) * Math.sin(luna_theta);
    luna.position.y  = tierra.position.y + Math.sin(luna_obli+luna_theta);// Math.cos( vz )*c;

    marte.position.x =1 /(Math.sqrt(Math.cos(marte_theta)*Math.cos(marte_theta)/(marte_a*marte_a)+ Math.sin(marte_theta)*Math.sin(marte_theta)/(marte_b*marte_b))) * Math.cos(marte_theta);
    marte.position.z =  1 /(Math.sqrt(Math.cos(marte_theta)*Math.cos(marte_theta)/(marte_a*marte_a)+ Math.sin(marte_theta)*Math.sin(marte_theta)/(marte_b*marte_b))) * Math.sin(marte_theta);
    marte.position.y  = Math.sin(marte_obli+marte_theta);// Math.cos( vz )*c;

    jupiter.position.x =1 /(Math.sqrt(Math.cos(jupiter_theta)*Math.cos(jupiter_theta)/(jupiter_a*jupiter_a)+ Math.sin(jupiter_theta)*Math.sin(jupiter_theta)/(jupiter_b*jupiter_b))) * Math.cos(jupiter_theta);
    jupiter.position.z =  1 /(Math.sqrt(Math.cos(jupiter_theta)*Math.cos(jupiter_theta)/(jupiter_a*jupiter_a)+ Math.sin(jupiter_theta)*Math.sin(jupiter_theta)/(jupiter_b*jupiter_b))) * Math.sin(jupiter_theta);
    jupiter.position.y  = Math.sin(jupiter_obli+jupiter_theta);// Math.cos( vz )*c;

    saturno.position.x =1 /(Math.sqrt(Math.cos(saturno_theta)*Math.cos(saturno_theta)/(saturno_a*saturno_a)+ Math.sin(saturno_theta)*Math.sin(saturno_theta)/(saturno_b*saturno_b))) * Math.cos(saturno_theta);
    saturno.position.z =  1 /(Math.sqrt(Math.cos(saturno_theta)*Math.cos(saturno_theta)/(saturno_a*saturno_a)+ Math.sin(saturno_theta)*Math.sin(saturno_theta)/(saturno_b*saturno_b))) * Math.sin(saturno_theta);
    saturno.position.y  = Math.sin(saturno_obli+saturno_theta);// Math.cos( vz )*c;

    saturnoRings.position.x =saturno.position.x;
    saturnoRings.position.y =saturno.position.y;
    saturnoRings.position.z =saturno.position.z;


    uranoRings.position.x =urano.position.x;
    uranoRings.position.y =urano.position.y;
    uranoRings.position.z =urano.position.z;
    
    urano.position.x =1 /(Math.sqrt(Math.cos(urano_theta)*Math.cos(urano_theta)/(urano_a*urano_a)+ Math.sin(urano_theta)*Math.sin(urano_theta)/(urano_b*urano_b))) * Math.cos(urano_theta);
    urano.position.z =  1 /(Math.sqrt(Math.cos(urano_theta)*Math.cos(urano_theta)/(urano_a*urano_a)+ Math.sin(urano_theta)*Math.sin(urano_theta)/(urano_b*urano_b))) * Math.sin(urano_theta);
    urano.position.y  = Math.sin(urano_obli+urano_theta);// Math.cos( vz )*c;


    neptuno.position.x =1 /(Math.sqrt(Math.cos(neptuno_theta)*Math.cos(neptuno_theta)/(neptuno_a*neptuno_a)+ Math.sin(neptuno_theta)*Math.sin(neptuno_theta)/(neptuno_b*neptuno_b))) * Math.cos(neptuno_theta);
    neptuno.position.z =  1 /(Math.sqrt(Math.cos(neptuno_theta)*Math.cos(neptuno_theta)/(neptuno_a*neptuno_a)+ Math.sin(neptuno_theta)*Math.sin(neptuno_theta)/(neptuno_b*neptuno_b))) * Math.sin(neptuno_theta);
    neptuno.position.y  = Math.sin(neptuno_obli+neptuno_theta);// Math.cos( vz )*c;





    var ahora = Date.now();

    // Take into account the time
    timeScale = effectController.timeScale;
    dias+=(ahora-antes)*timeScale;
    anyos=dias/365;



	// Rotation movements
	
	
	mercurio.rotation.y+=(2*Math.PI/mercurio_rot*(ahora-antes))* timeScale;
	venus.rotation.y   +=(2*Math.PI/venus_rot*(ahora-antes)	)* timeScale;
	tierra.rotation.y  +=(2*Math.PI/tierra_rot*(ahora-antes))* timeScale;
	luna.rotation.y    +=(2*Math.PI/luna_rot*(ahora-antes)	)* timeScale;
	marte.rotation.y   +=(2*Math.PI/marte_rot*(ahora-antes)	)* timeScale;
	jupiter.rotation.y +=(2*Math.PI/jupiter_rot*(ahora-antes))* timeScale;
	saturno.rotation.y +=(2*Math.PI/saturno_rot*(ahora-antes))* timeScale;
	urano.rotation.y   +=(2*Math.PI/urano_rot*(ahora-antes)	)* timeScale;
	neptuno.rotation.y +=(2*Math.PI/neptuno_rot*(ahora-antes))* timeScale;
	
	
	
	// Translation movements
	mercurio_theta +=Math.PI*2/mercurio_per /365*timeScale*(ahora-antes);
	venus_theta    +=Math.PI*2/   venus_per /365*timeScale*(ahora-antes);
	tierra_theta   +=Math.PI*2/  tierra_per /365*timeScale*(ahora-antes);
	luna_theta     +=  Math.PI*2/    luna_per /365*timeScale*(ahora-antes);
	marte_theta    +=Math.PI*2/   marte_per /365*timeScale*(ahora-antes);
	jupiter_theta  +=Math.PI*2/ jupiter_per /365*timeScale*(ahora-antes);
	saturno_theta  +=Math.PI*2/ saturno_per /365*timeScale*(ahora-antes);
	urano_theta  +=Math.PI*2/   urano_per /365*timeScale*(ahora-antes);
	neptuno_theta    +=Math.PI*2/ neptuno_per /365*timeScale*(ahora-antes);
	
	
	// Days and years counter
	
	text2.innerHTML = 'Days (terrestrials): '+parseFloat(dias).toFixed(1)+'<br> Years (terrestrials): ' + parseFloat(anyos).toFixed(2);
	
	// Stats
	stats.update();
	antes = ahora;
}

function render(){
	update();
	requestAnimationFrame(render);
	renderer.render(scene,camera);

}

function updateAspectRatio(){

	// Update aspect ratio when moving the window
	
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

}




function setupGui(){


	
	effectController = {
		mensaje: 'Controls',
		escalaTam: false,
		escalaPos: false,
		timeScale: 0.0001,
		seguimiento:'None',
		seguir : false,
		drawAxes : false,
		drawOrbits : false


	};

	var gui = new dat.GUI();
	var h = gui.addFolder("System controls");
	h.add(effectController, "mensaje").name("System controls");
	h.add(effectController, "escalaTam").name("Real-scaled planets");
	h.add(effectController, "seguir").name("Follow planet");
	h.add(effectController, "seguimiento", ["None","Sun","Mercury", "Venus", "Earth", "Moon", "Mars", "Jupiter","Saturn","Uranus","Neptune"]).name("Focus on planet").onChange(function(value){


		switch (effectController.seguimiento){

			case "Mercury" : 
			camera.position.set(mercurio.position.x + 4*mercurio_tam,mercurio.position.y+mercurio_tam,mercurio.position.z+4*mercurio_tam);
			camera.lookAt(mercurio.position);
			break;


			case "Venus" : 
			camera.position.set(venus.position.x + 4*venus_tam,venus.position.y+venus_tam,mercurio.position.z+4*venus_tam);
			camera.lookAt(venus.position);
			break;
			case "Earth" : 
			camera.position.set(tierra.position.x + 4*tierra_tam,tierra.position.y+tierra_tam,tierra.position.z+4*tierra_tam);
			camera.lookAt(tierra.position);
			break;
			case "Moon" : 
			camera.position.set(luna.position.x + 4*luna_tam,luna.position.y+luna_tam,luna.position.z+4*luna_tam);
			camera.lookAt(luna.position);
			break;
			case "Mars" : 
			camera.position.set(marte.position.x + 4*marte_tam,marte.position.y+marte_tam,marte.position.z+4*marte_tam);
			camera.lookAt(marte.position);
			break;
			case "Jupiter" : 
			camera.position.set(jupiter.position.x + 4*jupiter_tam,jupiter.position.y+jupiter_tam,jupiter.position.z+4*jupiter_tam);
			camera.lookAt(jupiter.position);
			break;

			case "Saturn" : 
			camera.position.set(saturno.position.x + 4*saturno_tam,saturno.position.y+saturno_tam,saturno.position.z+4*saturno_tam);
			camera.lookAt(saturno.position);
			break;

			case "Uranus" : 
			camera.position.set(urano.position.x + 20*urano_tam,urano.position.y+urano_tam,urano.position.z+20*urano_tam);
			camera.lookAt(urano.position);
			break;

			case "Neptune" : 
			camera.position.set(neptuno.position.x + 4*neptuno_tam,neptuno.position.y,neptuno.position.z+4*neptuno_tam);
			camera.lookAt(neptuno.position);
			break;

			case "Sun" : 
			camera.position.set(scale_factor*450,scale_factor*50,scale_factor*450);
			camera.lookAt(0,0,0);
			break;

		}

	});
h.add(effectController, "timeScale", 0.0000,1,0.0001).name("Time control");
h.add(effectController, "drawAxes").name("Show axis").onChange(function(value){
	if(value == true)
		axisHelper.visible=true;
	else axisHelper.visible=false;
});


h.add(effectController, "drawOrbits").name("Show orbits").onChange(function(value){
	if(effectController.drawOrbits == true)
		orbitas.visible=true;
	else 	orbitas.visible=false;
});



}

//Call all functions


init(); 
setupGui();
loadScene();
render();

