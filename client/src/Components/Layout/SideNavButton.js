import React from 'react';
import { Button, Text } from 'grommet';


const SideNavButton = ({ onClick, children }) => {
    return (
        <Button onClick={onClick}>
            <Text>BruVue</Text>
        </Button>
    );
}

export default SideNavButton;