import React from 'react';
import { Grid } from 'grommet';

const GrommetGrid = ({ rows, columns, areas, children }) => {
    return (
        <Grid
            fill
            rows={rows}
            columns={columns}
            areas={areas}
        >
            {children}
        </Grid>
    );
}

export default GrommetGrid;