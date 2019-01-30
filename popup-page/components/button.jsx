import React  from 'react'
import ParticleEffectButton from 'react-particle-effect-button'

class buttonApp extends React.Component {
    render () {
        return (
            <ParticleEffectButton
                color={this.props.color}
                hidden={this.props.hidden}
            >
                {this.props.label}
            </ParticleEffectButton>
        )
    }
}
export default buttonApp;