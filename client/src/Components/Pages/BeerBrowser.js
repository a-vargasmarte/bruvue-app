import React, { Component } from 'react';
import { Grommet, Box, DataTable, FormField, TextInput, Button, Text, Grid, Select } from 'grommet';
import { grommet } from 'grommet/themes';
import { Add, FormSubtract } from 'grommet-icons';
import axios from 'axios';

class BeerBrowser extends Component {
    state = {
        beers: [],
        servedBeers: [],
        otherBeerData: [],
        box: {
            align: 'center',
            pad: 'large'
        },
        dataTable:

            [
                {
                    property: "Beer Name",
                    header: "Beer Name",
                    primary: true,
                    sortable: true
                },
                {
                    property: "Brewery Name",
                    header: "Brewery Name",
                    align: 'start'
                },
                {
                    property: "Beer Style",
                    header: "Beer Style",
                },
                {
                    property: "ABV",
                    header: "ABV",
                    align: "end"
                }
            ],
        formValues: {
            "Beer Name": '',
            "Brewery Name": '',
            "Beer Style": '',
            "ABV": '',
        },
        toggleDataTable: true,
        toggleButtons: [
            { color: "dark-1", label: "Browse Beers" },
            { color: 'status-disabled', label: "Add or Remove a Beer" }
        ],
        removeBeerValue: ""



    }

    componentDidMount() {
        axios.get(`/api/BruVue/beers`)
            .then(res => {
                let { beers } = this.state;
                beers = res.data.map(beer => {
                    return beer
                })

                this.setState({ beers: beers, servedBeers: beers, otherBeerData: beers })
                // console.log(this.state)

            })
    }

    onSearch = search => {
        let nextData;
        let { otherBeerData } = this.state;
        if (search) {
            const expressions = Object.keys(search).map(property => ({
                property,
                exp: new RegExp(search[property], "i")
            }));

            // console.log(expressions)
            nextData = otherBeerData.filter(
                d => !expressions.some(e => !e.exp.test(d[e.property]))
            );
            // console.log(nextData)
        } else {
            nextData = otherBeerData;
            // console.log(nextData);
        }
        this.setState({ beers: nextData });
    }

    onChange = event => {
        // const { target: { value } } = event;
        let { formValues } = this.state;

        switch (event.target.placeholder) {
            case "Beer Name":
                formValues["Beer Name"] = event.target.value;
                this.setState(
                    {
                        formValues: formValues
                    })
                break;
            case "Brewery Name":
                formValues["Brewery Name"] = event.target.value;
                this.setState(
                    {
                        formValues: formValues
                    })
                break;
            case "Beer Style":
                formValues["Beer Style"] = event.target.value;
                this.setState(
                    {
                        formValues: formValues
                    })
                break;
            case "ABV":
                formValues["ABV"] = event.target.value;
                this.setState(
                    {
                        formValues: formValues
                    })
                break;
        }



        // const exp = new RegExp(value, "i");
        // console.log(event.target.name)
        // const suggestions = allSuggestions.filter(s => exp.test(s));
        // this.setState({ [event.target.placeholder]: value });
    };

    handleAddBeer = (e) => {
        e.preventDefault()
        let { formValues } = this.state

        formValues.ABV = Number(formValues.ABV)

        axios.post(`/api/BruVue/beers`, formValues)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))

        axios.get(`/api/BruVue/beers`)
            .then(res => {
                let beers = res.data;
                console.log(res);
                this.setState({ beers });
                console.log(this.state)
            })
            .catch(err => console.log(err))
    }

    handleRemoveBeer = (e) => {
        e.preventDefault()
        let { formValues, beers } = this.state
        console.log(beers);
        formValues.ABV = Number(formValues.ABV)
        let beerNameIndex;
        let beerMap = beers.map((beer, i) => {
            if (beer["Beer Name"] === formValues["Beer Name"]) {
                beerNameIndex = i
            }
            return beerNameIndex
        })

        // console.log(beerNameIndex)
        let beerRemoveId = beers[beerNameIndex]._id


        axios.delete(`/api/BruVue/beers/${beerRemoveId}`)
            .then(res => {
                let beers = res.data;
                this.setState({ beers })
            })
            .catch(err => console.log(err))

    }

    toggleButton = (e) => {
        e.preventDefault()
        axios.get(`/api/BruVue/beers`)
        .then(res=>{
            let beers = res.data;
            this.setState({beers})
        })
        let { toggleButtons, toggleDataTable } = this.state;
        console.log(e.target)
        console.log(e.target.innerHTML)
        switch (e.target.innerHTML) {
            case "Browse Beers":
                toggleButtons[0].color = "dark-1"
                toggleButtons[1].color = "status-disabled"

                this.setState({ toggleButtons: toggleButtons, toggleDataTable: !toggleDataTable })

                break;
            case "Add or Remove a Beer":
                toggleButtons[0].color = "status-disabled"
                toggleButtons[1].color = "dark-1"

                this.setState({ toggleButtons, toggleDataTable: !toggleDataTable })
                break;
        }

    }

    render() {
        let { beers: servedBeers } = this.state


        return (
            <React.Fragment>
                <Grommet theme={grommet}>
                    <Box align="center" pad="small">
                        <Box direction="row" align="center" gap="small" pad="xsmall">
                            {this.state.toggleButtons.map(button => (
                                <Button key={button.label} primary className={button.label} color={button.color} label={button.label} onClick={this.toggleButton}></Button>
                            ))}
                        </Box>
                    </Box>
                    {this.state.toggleDataTable ? (
                        <Grommet theme={grommet}>
                            <Box align={this.state.box.align} pad={this.state.box.pad} animation={[{ type: "slideUp", duration: 2500 }]}>
                                <DataTable
                                    columns={this.state.dataTable.map(column => ({
                                        ...column,
                                        search:
                                            column.property === "Beer Name" || column.property === "Brewery Name" || column.property === "Beer Style"
                                    }))}
                                    data={servedBeers}
                                    size="small"
                                    sortable
                                    onSearch={this.onSearch}
                                />
                            </Box>

                        </Grommet>) : (
                            <Grommet theme={grommet}>
                                <Box align="start" pad="large" gap="medium" animation={[{ type: "slideLeft", duration: 1000 }]}>
                                    {/* <Select
                                        size="medium"
                                        placeholder="Remove a Beer"
                                        multiple
                                        options={beerName}
                                        value={this.state.removeBeerValue}
                                        onChange={({ option }) => this.setState({ removeBeerValue: option })}
                                        onClose={() => this.setState({ options: beerName })}
                                        onSearch={text => {
                                            const exp = new RegExp(text, "i");
                                            this.setState({
                                                beers: beerName.filter(o => exp.test(o))
                                            })
                                        }} /> */}

                                    {this.state.dataTable.map((input, i) => (
                                        <TextInput
                                            id={input.property}
                                            key={input.property}
                                            type={input.property === "ABV" ? ("number") : ("text")}
                                            placeholder={input.header}
                                            value={this.state.formValues[input.header]}
                                            onChange={this.onChange}
                                            gap="small"
                                        />
                                    ))}
                                    <Box direction="row" align="center" gap="small" pad="xsmall">
                                        <Button hoverIndicator="status-ok" onClick={this.handleAddBeer}>
                                            <Box pad="small" direction="row" align="start" gap="small">
                                                <Add />
                                                <Text>Add</Text>
                                            </Box>
                                        </Button>
                                        <Button hoverIndicator="status-critical" onClick={this.handleRemoveBeer}>
                                            <Box pad="small" direction="row" align="start" gap="small">
                                                <FormSubtract />
                                                <Text>Remove</Text>
                                            </Box>
                                        </Button>
                                    </Box>

                                </Box>

                            </Grommet>
                        )
                    }

                </Grommet>






            </React.Fragment>
        );
    }
}

export default BeerBrowser;