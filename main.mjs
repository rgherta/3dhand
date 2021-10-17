//load assets
import * as THREE from '../build/three.module.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';

let container;

let camera, scene, renderer;

let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let object;

init();
animate();


function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 250;

    // scene

    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );

    const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );
    scene.add( camera );

    // manager

    function loadModel() {


        object.position.y = 0
        object.position.x = 0
        object.position.z = 0

        //change initial model coortinates
        object.rotation.x = 2;
        object.rotation.y = 0.2;
        object.rotation.z = 3.8    ;

        


        scene.add( object );

    }

    const manager = new THREE.LoadingManager( loadModel );


    // model

    function onProgress( xhr ) {

        if ( xhr.lengthComputable ) {

            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

        }

    }

    function onError() {}

    const loader = new OBJLoader( manager );
    loader.load( 'models/hand/Hand.obj', function ( obj ) {

        object = obj;

    }, onProgress, onError );

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove );

    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

    // mouseX = ( event.clientX - windowHalfX ) / 2;
    // mouseY = ( event.clientY - windowHalfY ) / 2;

}

//

function animate() {

    requestAnimationFrame( animate );
    render();

}

function render() {

    // camera.position.x += ( mouseX - camera.position.x ) ;
    // camera.position.y += ( - mouseY - camera.position.y ) ;

    //camera coordinates
    camera.position.x = ( 0 ) ;
    camera.position.y = ( 0) ;
    camera.position.z = ( 500) ;

    camera.lookAt( scene.position );

    renderer.render( scene, camera );

}

			
