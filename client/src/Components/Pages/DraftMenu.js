import React, { Component } from 'react';
import { Box, Text, Table, TableBody, TableCell, TableHeader, TableRow } from 'grommet';
import axios from 'axios';

class DraftMenu extends Component {
    state = {
        pad: 'large',
        align: 'stretch',
        tableColumns: [
            {
                property: "Beer Name",
                label: "Beer Name",
                dataScope: "row"
            },
            {
                property: "Brewery Name",
                label: "Brewery Name",
            },
            {
                property: "Beer Style",
                label: "Beer Style",
            },
            {
                property: "ABV",
                label: "ABV",
                align: "end"
            }
        ],
        beersOnTap: []
    }

    componentDidMount() {
        axios.get('/api/BruVue/beers')
            .then(res => {
                console.log(res.data)
                let { beersOnTap } = this.state
                res.data.map(beer => {
                    if (beer.onTap) {
                        beersOnTap.push(beer);
                    }
                })
                this.setState({ beersOnTap: beersOnTap })
                console.log(this.state)
            })
            .catch(err => console.log(err))
    }


    render() {


        return (
            <Box align={this.state.align} pad={this.state.pad}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {this.state.tableColumns.map(column => (
                                <TableCell key={column.property} scope={column.dataScope} align={column.align}>
                                    <Text align={this.state.align} weight="bold">{column.label}</Text>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.state.beersOnTap.map(beer => (
                            <TableRow key={beer._id}>
                                {this.state.tableColumns.map(column => (
                                    <TableCell key={column.property} scope={column.dataScope} align={column.align}>
                                        <Text size="xsmall" alignSelf="start" weight="bold">{beer[column.property]}</Text>
                                    </TableCell>
                                ))}

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

        );
    }
}

export default DraftMenu;
