import React from 'react';
import Particles from 'react-particles-js';

export default class Demo extends React.Component{
    render(){
        return (
            <Particles
                params={{
                    particles: {
                        line_linked: {
                            shadow: {
                                enable: true,
                                color: "#3CA9D1",
                                blur: 5
                            }
                        }
                    }
                }}
                style={{
                    width: '100%',
                    height: 50
                }}
            />

        );
    }
}