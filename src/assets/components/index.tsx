import { useState } from 'react';

function Body() {
function Greeting({name} : {name: string}){
    return <span>Hello, {name}</span>;
}

    return (
        <>
            <div>
                <h1>
                    <Greeting name="Icaro " />
                </h1>
            </div>
        </>
    );
}

export default Body;