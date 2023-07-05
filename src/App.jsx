import React, { useCallback,useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from 'reactflow';

import './App.css'

import 'reactflow/dist/style.css';

import CustomNode from './component/trial';
import Sidebar from './component/sidebar';

const initialNodes = [
  { id: '1',  type: 'customNode' ,position: { x: 50, y: 50 }, data: { label: 'start' } ,animated: true }, 
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = { customNode: CustomNode }

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [name, setName] = useState("")

  const addNode = () => {
    setNodes(e => e.concat({
        id: (e.length+1).toString(),
        type:'customNode',
        data: {label: `${name}`},
        position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
    }))
    
   
};

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <ReactFlowProvider> 
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <div className='add-node'>
          <input type="text" onChange={e => setName(e.target.value)} name="title"/>
          <button type="button" onClick={addNode} >Add Node</button>
      </div>
    </div>
    <Sidebar nodes={nodes} setNodes={setNodes} />
    </ReactFlowProvider>
  );
}
