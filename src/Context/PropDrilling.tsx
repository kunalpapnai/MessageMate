import React from 'react'

function PropDrilling() {
    const value = 10;
    return (
        <>
            <div>Prop Drilling Example</div>
            <GrandParent gpValue={value}></GrandParent>
        </>
    )
}

function GrandParent(props){
    const {gpValue} = props;
    return(
        <>
            <h2>Grand Parent</h2>
            <Parent pValue={gpValue}></Parent>
        </>
    )
}

function Parent(props){
    const {pValue} = props;
    return(
        <>
            <h2>Parent</h2>
            <Child cValue={pValue}></Child>
        </>
    )
}

function Child(props){
    const {cValue} = props;
    return(
        <>
            <h2>Child Parent</h2>
            <div>value : {cValue}</div>
        </>
    )
}

export default PropDrilling