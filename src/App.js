import './App.css';
import React from 'react';
import Menu from './Menu'
import Connect from './Connect'
import DefaultItems from "./DefaultItems";

import * as THREE from 'three';
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import MetaMaskOnboarding from '@metamask/onboarding'

const currentUrl = new URL(window.location.href)
const forwarderOrigin = currentUrl.hostname === 'localhost'
    ? 'http://localhost:9010'
    : undefined

const isMetaMaskInstalled = () => {
  const { ethereum } = window
  return Boolean(ethereum && ethereum.isMetaMask)
}

class App extends React.Component {

  camera;
  scene;
  renderer;
  controls;

  objects = [];
  targets = { table: [], sphere: [], helix: [], grid: [], starfield: [] };

  constructor(props) {
    super(props);
    this.state = {
      canConnect: false
    };
  }

  componentDidMount() {

    this.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 3000;

    this.scene = new THREE.Scene();

    this.renderer = new CSS3DRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.mount.appendChild( this.renderer.domElement );

    this.controls = new TrackballControls( this.camera, this.renderer.domElement );
    this.controls.minDistance = 500;
    this.controls.maxDistance = 6000;
    this.controls.addEventListener( 'change', this.renderCanvas.bind(this) );

    this.buildCanvasElements(DefaultItems);

    this.transform( this.targets.starfield, 2000, () =>{
      this.setState({
        canConnect:true,
        isConnected:false,
        account: ""
      });
    });

    window.addEventListener( 'resize', this.onWindowResize );

    this.animate();
  }

  buildCanvasElements(table){

    // table
    for ( let i = 0; i < table.length; i ++ ) {

      let item = table[i];

      const element = document.createElement( 'div' );
      element.className = 'element';
      element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

      if (item.id === undefined) {
        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = i + 1;
        element.appendChild(number);
      }

      const symbol = document.createElement( 'div' );
      symbol.className = 'symbol';
      symbol.textContent = item.title;
      element.appendChild( symbol );

      const details = document.createElement( 'div' );
      details.className = 'details';
      details.innerHTML = item.desc + (item.num ? '<br>' + item.num : "");
      element.appendChild( details );

      // image
      if (!item.imageUrl){
        item.imageUrl = "assets/ph-images/cat-" + (i + 1) + ".png";
      }

      const imgCon = document.createElement('div');
      imgCon.className = "image-ctn";

      const img = document.createElement( 'img' );
      img.className = "image";
      img.setAttribute("src", item.imageUrl);
      img.addEventListener("dragstart", (e) => { e.preventDefault(); });
      imgCon.appendChild(img);

      element.appendChild(imgCon);

      // click handling
      const delta = 20;
      let startX;
      let startY;

      element.addEventListener('mousedown', function (e) {
        e.preventDefault();
        startX = e.pageX;
        startY = e.pageY;
        console.log(e);
      });

      element.addEventListener("click", (e)=>{
        const diffX = Math.abs(e.pageX - startX);
        const diffY = Math.abs(e.pageY - startY);

        if (diffX < delta && diffY < delta) {
          window.open((item.url ?? 'https://google.com.au/'));
        }
      });

      const objectCSS = new CSS3DObject( element );
      objectCSS.position.x = Math.random() * 4000 - 2000;
      objectCSS.position.y = Math.random() * 4000 - 2000;
      //objectCSS.position.z = Math.random() * 4000 - 2000;
      objectCSS.position.z = 11000;

      this.scene.add( objectCSS );
      this.objects.push( objectCSS );

      const object = new THREE.Object3D();
      object.position.x = ( item.x * 140 ) - 1330;
      object.position.y = - ( item.y * 180 ) + 990;

      this.targets.table.push( object );

    }

    // sphere
    const vector = new THREE.Vector3();

    for ( let i = 0, l = this.objects.length; i < l; i ++ ) {

      const phi = Math.acos( - 1 + ( 2 * i ) / l );
      const theta = Math.sqrt( l * Math.PI ) * phi;

      const object = new THREE.Object3D();

      object.position.setFromSphericalCoords( 800, phi, theta );

      vector.copy( object.position ).multiplyScalar( 2 );

      object.lookAt( vector );

      this.targets.sphere.push( object );

    }

    // helix
    for ( let i = 0, l = this.objects.length; i < l; i ++ ) {

      const theta = i * 0.175 + Math.PI;
      const y = - ( i * 8 ) + 450;

      const object = new THREE.Object3D();

      object.position.setFromCylindricalCoords( 900, theta, y );

      vector.x = object.position.x * 2;
      vector.y = object.position.y;
      vector.z = object.position.z * 2;

      object.lookAt( vector );

      this.targets.helix.push( object );

    }

    // grid
    for ( let i = 0; i < this.objects.length; i ++ ) {

      const object = new THREE.Object3D();

      object.position.x = ( ( i % 5 ) * 400 ) - 800;
      object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
      object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

      this.targets.grid.push( object );

    }

    // starfield
    for (let i = 0; i < this.objects.length; i++){

      const object = new THREE.Object3D();

      object.position.x = Math.floor(Math.random() * 4000) - 2000;
      object.position.y = Math.floor(Math.random() * 4000) - 2000;
      object.position.z = randomInteger(-3000, 3000);

      this.targets.starfield.push(object);
    }

    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  transform(targets, duration, callback) {

    TWEEN.removeAll();

    for ( let i = 0; i < this.objects.length; i ++ ) {

      const object = this.objects[ i ];
      const target = targets[ i ];

      new TWEEN.Tween( object.position )
          .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
          .easing( TWEEN.Easing.Exponential.InOut )
          .start();

      new TWEEN.Tween( object.rotation )
          .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
          .easing( TWEEN.Easing.Exponential.InOut )
          .start();

    }

    let tween = new TWEEN.Tween( this )
        .to( {}, duration * 2 )
        .onUpdate( this.renderCanvas.bind(this) )

    if (callback)
      tween.onComplete(callback);

    tween.start();
  }

  onWindowResize() {

    if (!this.camera || !this.renderer)
      return;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.renderCanvas();

  }

  animate() {

    requestAnimationFrame( this.animate.bind(this) );

    TWEEN.update();

    this.controls.update();
  }

  renderCanvas(){
    this.renderer.render( this.scene, this.camera );
  }

  changeFormation(name){
    this.transform(this.targets[name], 2000);
  }

  async connect(){
    this.transform(this.targets.sphere, 2000, ()=>{
      this.connectToWallet();
    });
  }

  async connectToWallet(){
    if (isMetaMaskInstalled()){
      try {
        const newAccounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        console.log(newAccounts);

        let tokens = await this.getTokensForAccount(newAccounts[0]);

        console.log(tokens);
        if (tokens.length > 0){
          this.populateNfts(newAccounts[0], tokens);
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      if (window.confirm("This app requires an Ethereum compatible browser wallet. Would you like to install Metamask?")){
        let onboarding
        try {
          onboarding = new MetaMaskOnboarding({ forwarderOrigin });
          onboarding.startOnboarding();
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  async getTokensForAccount(account){

    const options = {method: 'GET'};

    /*try {
      var res = await fetch('https://testnets-api.opensea.io/api/v1/assets?owner=' + account + '&order_direction=desc&offset=0&limit=50', options)
          .then(response => response.json())
          .catch(err => err);
    } catch (err){
      console.error(err);
      return [];
    }

    console.log(res);*/

    // TODO: Remove once account endpoint returns all NFTs
    //if (res.assets.length === 0){

      //await new Promise(resolve => setTimeout(resolve, 500)); // Prevent rate limiting

      //let contractAddr = res.assets[0].asset_contract.address;

      try {
        var res = await fetch('https://testnets-api.opensea.io/api/v1/assets?collection=happy-frog-prince-v4&order_direction=desc&offset=0&limit=50', options)
            .then(response => response.json())
            .catch(err => err);
      } catch (err){
        console.error(err);
        return [];
      }
    //}

    if (!res.assets){
      window.alert("Error retrieving tokens: " + res.detail);
      return [];
    }

    return this.transformTokenSchema(res.assets);
  }

  transformTokenSchema(nfts){
    let res = [];
    for (let i=0; i<nfts.length; i++){
      // Use coords of elements to maintain periodic table structure
      let coords = DefaultItems[i] ?? {x:0, y:0};
      let nft = nfts[i];

      res.push({
        id: "",
        title: nft.id,
        desc: nft.name,
        imageUrl: nft.image_preview_url,
        url: nft.permalink,
        x: coords.x,
        y: coords.y
      });
    }
    return res;
  }

  populateNfts(account, tokens){

    TWEEN.removeAll();

    for ( let i = 0; i < this.objects.length; i ++ ) {

      const object = this.objects[ i ];

      new TWEEN.Tween( object.position )
          .to( { x: 0, y: 0, z: 20000 }, Math.random() * 2000 + 2000 )
          .easing( TWEEN.Easing.Exponential.InOut )
          .start();
    }

    new TWEEN.Tween( this )
        .to( {}, 2000 * 2 )
        .onUpdate( this.renderCanvas.bind(this) )
        .onComplete(()=>{
          this.setState({
            canConnect:false,
            isConnected:true,
            account:account
          });
          this.removeSceneObjects();
          this.addNewObjectsToScene(tokens);
        })
        .start();
  }

  removeSceneObjects(){
    for ( let i = 0; i < this.objects.length; i ++ ) {
      this.scene.remove(this.objects[i]);
    }
    this.objects = [];
    this.targets = { table: [], sphere: [], helix: [], grid: [], starfield: [] };
  }

  addNewObjectsToScene(tokens){
    this.buildCanvasElements(tokens);
    this.transform( this.targets.sphere, 2000);
  }

  render() {
    return (
        <div className="App">
          <div id="container" ref={ref => (this.mount = ref)}></div>
          <Connect onClick={()=>{ this.connect(); }} visible={this.state.canConnect} isConnected={this.state.isConnected} account={this.state.account}/>
          <Menu items={Object.keys(this.targets)} onClick={(name)=>{this.changeFormation(name)}} />
        </div>
    );
  }
}

export default App;
