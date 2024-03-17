import React, { ChangeEvent, useState } from 'react';

export const AddressList = () => {
  const [address , setAddress] = useState('')
  const [addresses, setAddresses] = useState<string[]>([]);

  function handleAddressChange(event: ChangeEvent<HTMLInputElement>): void {
    setAddress(event.target.value);
  }

  function addAddress() {
    setAddresses([... addresses, address])
  }

//   const handleAddressChange = (event) => {
//     setAddress(event.target.value);
//   };
// const addresses = [
//     "0x1234567890123456789012345678901234567890",
//     "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
//     "0x3333333333333333333333333333333333333333",
//     "0x4444444444444444444444444444444444444444"
//   ];
  return (
    <div className="form-group">
      <label>Add Address:</label>
      
      {/* <div className="container">
      <div className="row">
        <div className="col">
          <input
            className="form-control"
            type="text"
            placeholder="Enter blocked address"
          />
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-outline-danger">Add</button>
        </div>
      </div>
    </div> */}
        <br />
      <div>
      {/* <button type="button" className="btn btn-outline-danger">Danger</button> */}
      </div>
      
      <div className="container">
      <div className="row">
        <div className="col">
          <input
            className="form-control custom-form-control"
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter blocked address"
          />
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-outline-danger" onClick={addAddress}>Add</button>
        </div>
        
      </div>
      <br />
      <div className="form-check form-switch">
      <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">White List / Black List</label>
    </div>
      <div className="list-group mt-3">
        {addresses.map((address, index) => (
          <div key={index} className="list-group-item text-light bg-dark" style={{ opacity: '0.5' }}>
            <span className="bg-danger p-1">{index + 1}</span> {address}
          </div>
        ))}
      </div>    
    </div>
    </div>
  );
};
