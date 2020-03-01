import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Three from "three"
import RandExp from 'randexp'

class Cube extends Component {
    static propTypes = {
        prop: PropTypes
    }
    constructor(props){
        super(props)
        this.state = {
            cube: [],
            positions: [],
        }
    }
    initialise = () =>{
        let positions = []
        const {cubeConfig} = this.props
        const {x,y,z} = cubeConfig
        for(let i = 0; i<x; i++){
            for(let j = 0; j<y; j++){
                for(let k = 0; k<z; k++){
                    positions.push([i,j,k])
                }
            }
        }
        this.setState({
            cube: new Array(positions.length).fill(0),
            positions
        },this.render3D)
    }
    render3D = async()=>{
        let { cubeDimension:dim, offset, zoom } = this.props
        let {positions} = this.state
        this.scene = new Three.Scene()
        this.camera = new Three.PerspectiveCamera( 90, (window.innerWidth/2)/window.innerHeight, 0.1, 1000)
        this.renderer = new Three.WebGLRenderer( {antialias: true})
        this.renderer.setSize(window.innerWidth/2, window.innerHeight)
        if(this.elem.childElementCount)
            this.elem.firstChild.remove()
        this.elem.appendChild(this.renderer.domElement)
        this.cubes = new Three.Group()
        for(let i=0; i<positions.length; i++){
            let geometry = new Three.BoxGeometry(dim-offset,dim-offset,dim-offset)
            let material = new Three.MeshBasicMaterial( {color: Number(new RandExp(/^0x[0-8a-f]{6}$/).gen())})
            let cube = new Three.Mesh(geometry,material)
            cube.position.set( ...this.state.positions[i].map(a=>(a*dim)) );
            this.cubes.add(cube)
        }
        
        this.scene.add(this.cubes)
        this.camera.position.x = zoom;
        this.camera.position.y = zoom;
        this.camera.position.z = zoom;
        this.camera.lookAt(this.scene.position)
        this.renderer.render(this.scene, this.camera);
    }
    componentDidMount(){
        this.initialise()
    }
    componentDidUpdate(prevProps){
        let hasDimensionChanged = prevProps.cubeDimension!==this.props.cubeDimension
        let hasXChanged = prevProps.cubeConfig.x !== this.props.cubeConfig.x
        let hasYChanged = prevProps.cubeConfig.y !== this.props.cubeConfig.y
        let hasZChanged = prevProps.cubeConfig.z !== this.props.cubeConfig.z
        let hasZoomChanged = prevProps.zoom !== this.props.zoom
        let hasOffsetChanged = prevProps.offset !== this.props.offset
        if(hasDimensionChanged || hasXChanged || hasYChanged || hasZChanged || hasZoomChanged || hasOffsetChanged)
            this.initialise()
    }
    render() {
        return (
            <div ref={ele=>{this.elem = ele}}>
            </div>
        )
    }
}

Cube.propTypes = {
    cubeConfig: PropTypes.object,
    cubeDimension: PropTypes.number,
    offset: PropTypes.number,
    zoom: PropTypes.number
}

Cube.defaultProps = {
    cubeConfig: {x:3, y:3, z:3},
    cubeDimension: 1,
    offset: 0,
    zoom: 10
}

export default Cube
