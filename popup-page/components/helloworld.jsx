import React from 'react'
import Button from '@material-ui/core/Button';

export default class HelloWorld extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        return (
            <Button variant="contained" color="primary">
                Hello World
            </Button>
        );
    }

}
