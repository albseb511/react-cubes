import React, {useState} from 'react';
import Cube from "./components/Cube";
import "./App.css";

function App() {
  const [cube, setCube] = useState({x:3, y:3, z:3})
  const [size, setSize] = useState(1)
  const [zoom, setZoom] = useState(10)
  const [offset, setOffset] = useState(0)
  const handleOffsetChange = (e) => {
    let val = e.target.value
    if(val>0 && val<size*10){
      setOffset(Number(val))
    }
  }
  return (
    <div className="d-flex">
      <Cube cubeConfig={cube} cubeDimension={size} zoom={zoom} offset={offset/10}/>
      <div className="container">
        <div>X Y AND Z REPRESENTS THE NUMBER OF CUBES IN EACH DIRECTION</div>
        <div>THE CUBE CHANGES COLOR ON EVERY TIME CHANGES OCCUR</div>
        <div>
          NUMBER OF CUBES ON EACH AXIS
          <div>
            <label>X: 
              <input value={cube.x} onChange={(e)=>setCube({...cube, x:Number(e.target.value)})} type="number"/>
            </label>
          </div>
          <div>
            <label>Y: 
              <input value={cube.y}  onChange={(e)=>setCube({...cube, y:Number(e.target.value)})} type="number"/>
            </label>
          </div>
          <div>
            <label>Z: 
              <input value={cube.z}  onChange={(e)=>setCube({...cube, z:Number(e.target.value)})} type="number"/>
            </label>
          </div>
        </div>
        <div>
          <label>
            CUBE SIZE
            <input value={size} onChange={e=>setSize(Number(e.target.value))} type="number"/>
          </label>
        </div>
        <div>
          <label>
            ZOOM RATIO (DEFAULT 10)
            <input value={zoom} onChange={e=>setZoom(Number(e.target.value))} type="number"/>
          </label>
        </div>
        <div>
          <label>
            OFFSET (INTERNAL TO BODY)
            <input value={offset} onChange={handleOffsetChange} type="number"/>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
