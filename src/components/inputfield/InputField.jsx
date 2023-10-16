import React from "react";

function InputField({label, type, value, setState}) {
    return (
    <div className='InputField'>
        <label className="InputField label">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => setState(e.target.value)}
        />
    </div>
    )
}

export default InputField;