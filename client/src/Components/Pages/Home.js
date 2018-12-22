import React, { Component } from 'react';
import { Box, Heading, Text, Button } from 'grommet';

class Home extends Component {
    state = {
        gridArea: 'main',
        justify: 'center',
        align: 'center'
    }

    render() {

        return (
            <Box gridArea={this.state.gridArea} justify={this.state.justify} align={this.state.align}>
                <Heading level={1}>Welcome to BruVue</Heading>
                <Text size={"large"}>Please login to browse through our beers</Text>
                <Text align='center'>or go check out our beers on tap</Text>
                <Button primary label='Login' color='neutral-3' margin="large"></Button>
            </Box>

        );
    }
}

export default Home;
