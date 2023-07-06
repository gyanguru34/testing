
import { Handle, Position } from 'reactflow';
import React, { useState } from 'react';

const CustomNode = ({data}) => {


  const [inputs, setInputs] = useState([{ name: '', value: '' }]);


  const [selectedMethod, setSelectedMethod] = useState(null);

  const methods = [
    { value: 'method1', label: 'Method 1' },
    { value: 'method2', label: 'Method 2' },
    { value: 'method3', label: 'Method 3' },
  ];

  const handleChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    const newInputs = [...inputs];
    newInputs.push({ name: '', value: '' });
    setInputs(newInputs);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      eq: event.target.elements.eq.value,
      method: selectedMethod,
      var: parseVarInputs(inputs),
    };
    alert(JSON.stringify(formData));
  };

  const parseVarInputs = (inputs) => {
    const variables = {};
    inputs.forEach((input) => {
      const [name, value] = input.value.split('=');
      if (name && value) {
        variables[name.trim()] = value.trim();
      }
    });
    return variables;
  };

  return (
      <div className='customnode'>
     
    <Handle type="target" position={Position.Top} id="a"  />
    <div className="label-wrapper">Name : {data.label}</div>

    <form onSubmit={handleSubmit}>  
      <label>
        Fx : 
        <input type="text" name="eq" />
      </label>
      

      {inputs.map((input, index) => (
        <div key={index}>
          <label>
            Var:
            <input
              type="text"
              name={`var-${index}`}
              value={input.value}
              onChange={(event) => handleChange(index, event)}
            />
          </label>
          {index > 0 && (
            <button type="button" onClick={() => handleRemoveInput(index)}>
              Del
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={handleAddInput}>
        Add Input
      </button>
      <label>
          Method:
          <select value={selectedMethod} onChange={handleMethodChange}>
            <option value="">Select Method</option>
            <option value="method1">Method 1</option>
            <option value="method2">Method 2</option>
            <option value="method3">Method 3</option>
          </select>
        </label>
      <button type="submit">Run</button>
      
    </form>
    <Handle type="source" position={Position.Bottom} id="b"  />

    </div>
  );
};

export default CustomNode;
