
import 'semantic-ui-css/semantic.min.css'
import { Grid, Container, Segment, Form, Dropdown, Button } from 'semantic-ui-react'
import { BiXCircle } from 'react-icons/bi'
import { IconContext } from 'react-icons'
// import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";
import React, { useEffect } from 'react'
import {
    TimeInput,
    DatesRangeInput
  } from 'semantic-ui-calendar-react';

import SearchResults from './SearchResults'


function convertDDMMYYYYtoYYYYMMDD(date){
    var dateArray = date.split("-");
    return dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
} 


export default function SearchQuery(props){

    const [ restuarantIds, setRestuarantIds ] = React.useState([]);
    const [ dateRange, setDateRange ] = React.useState("");
    const [ timeRange, setTimeRange ] = React.useState({
        start: 0,
        end: 0
    });
    const [ metricDefinitions, setMetricDefinitions ] = React.useState([]);

    const metricCriteriaDefualt = {
        "metricCode": "string",
        "compareType": "string",
        "value": 0
    }
    const [ metricCriteria, setMetricCriteria ] = React.useState([metricCriteriaDefualt]);
    const [ results, setResults ] = React.useState([]);

    const restaurantIdOptions = [
        { key: '1', text: '1', value: 1 },
        { key: '2', text: '2', value: 2 },
        { key: '3', text: '3', value: 3 },
        { key: '4', text: '4', value: 4 },
        { key: '5', text: '5', value: 5 },
        { key: '6', text: '6', value: 6 },
        { key: '7', text: '7', value: 7 },
        { key: '8', text: '8', value: 8 },

    ]
   

    async function getMetricDefinitions(url = ""){

        const response = await fetch(url, {
            method: "GET",
            cache: "no-cache",  
        })

        return await response.json();
    }

    useEffect(() => {
        getMetricDefinitions("https://customsearchquerytoolapi.azurewebsites.net/Search/MetricDefinitions")
        .then(data => {
            setMetricDefinitions(data);
        }).catch(err => {
            console.log("Error: ", err);
        });
    }, []);


    async function handleSubmit(){
        var dateRanges = dateRange.split(" - ");

        // const query = {
        //     "restuarantIds": [...restuarantIds],
        //     "fromDate": dateRanges[0] && (new Date(convertDDMMYYYYtoYYYYMMDD(dateRanges[0]))).toISOString(),
        //     "toDate": dateRanges[1] && (new Date(convertDDMMYYYYtoYYYYMMDD(dateRanges[1]))).toISOString(),
        //     "fromHour": timeRange.start,
        //     "toHour": timeRange.end,
        //     "metricCriteria": [...metricCriteria]
        // }

        const query = 
            {
                "restaurantIds": [
                  1
                ],
                "fromDate": "2021-10-01T00:00:00.000Z",
                "toDate": "2021-10-26T00:00:00.000Z",
                "fromHour": 6,
                "toHour": 17,
                "metricCriteria": [
                  {
                    "metricCode": "NetAmount",
                    "compareType": "GreaterThan",
                    "value": 35
                  }
                ]
              }
        

        // console.log("Query: ", query1);

        const response = await fetch("https://customsearchquerytoolapi.azurewebsites.net/Search/Query", {
            method: "POST",
            cache: "no-cache",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(query)
        })

        const data = await response.json();
        console.log(data);
        setResults(data);
    }

    

    /**
     * Updates the metricCriteria state depending on changed values of specific properties
     * @param {*} index 
     * @param {*} value 
     * @param {*} property 
     */
    function updateMetricCriteria(index, value, property){
        var newMetricCriteria = metricCriteria;
        newMetricCriteria[index][property] = value;
        setMetricCriteria([...newMetricCriteria]);
    }
    

    return (
        <div className="SearchQuery">
            <Grid className="Grid">
                <Grid.Row>
                    <Grid.Column>
                        <Container>
                            <Segment>
                                <Form onSubmit={handleSubmit}>
                                <div className="ui grid">
                                   <div className="two column row">
                                        <div className="column">
                                            <Form.Field>
                                                <label>Restaurant Id</label>
                                                <Dropdown
                                                    options={restaurantIdOptions}
                                                    multiple
                                                    selection
                                                    placeholder='Select Restuarant Id'
                                                    value={restuarantIds}
                                                    onChange={(e, { value }) => setRestuarantIds(value)}
                                                >
                                                </Dropdown>
                                            </Form.Field>
                                        </div>
                                        <div className="column">
                                            <Form.Field>  
                                                <label>Date Range</label>
                                                <DatesRangeInput
                                                    name="datesRange"
                                                    placeholder="From - To"
                                                    value={dateRange}
                                                    iconPosition="left"
                                                    onChange={(e, { value }) => setDateRange(value)}
                                                />
                                            </Form.Field>
                                        </div>
                                    </div>
                                </div>
                                    <Form.Field>
                                        <label>Time Range</label>
                                        <div className="ui grid">
                                            <div className="two column row">
                                                <div className="column">
                                                    <TimeInput
                                                        name="startTime"
                                                        placeholder="Start"
                                                        value={`${timeRange.start}`}
                                                        iconPosition="left"
                                                        onChange={(e, { value }) => setTimeRange({start: parseInt(value.split(":")[0]), end: timeRange.end})}
                                                    />
                                                </div>
                                                <div className="column">
                                                    <TimeInput
                                                        name="endTime"
                                                        placeholder="End"
                                                        value={`${timeRange.end}`}
                                                        iconPosition="left"
                                                        onChange={(e, { value }) => setTimeRange({start: timeRange.start, end: parseInt(value.split(":")[0])})}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Form.Field>
                                    <Form.Field>
                                        <div>
                                        {metricCriteria.map((c, i) => {
                                            return (
                                                <Form.Field>
                                                    <label>Metric Selector</label>
                                                    <div className="ui grid">
                                                        <div className="four column row">
                                                            {metricCriteria.length > 1 ?  
                                                            <IconContext.Provider value={{ color: "red", className: "global-class-name" }} 
                                                            >
                                                                <div>
                                                                    <BiXCircle  
                                                                        onClick={() => {
                                                                            var newMetricCriteria = [...metricCriteria];
                                                                            newMetricCriteria.splice(i, 1);
                                                                            setMetricCriteria(newMetricCriteria);
                                                                        }}
                                                                        size="1.8em"
                                                                        
                                                                    />
                                                                </div>
                                                            </IconContext.Provider>: <div></div>}
                                                            <div className="column">
                                                                <Dropdown
                                                                    options={metricDefinitions.map((m, index) => {
                                                                        return {
                                                                            key: index,
                                                                            text: m.alias,
                                                                            value: m.metricCode
                                                                        }
                                                                    })}
                                                                    selection
                                                                    // placeholder='Select Metric'
                                                                    // value={metricCriteria[i]["metricCode"]}
                                                                    defaultValue={c["metricCode"]}
                                                                    onChange={(e, { value }) => {
                                                                        updateMetricCriteria(i, value, "metricCode");
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="column">
                                                                <Dropdown
                                                                    options={[
                                                                        { key: 'Equal', text: 'Equal', value: 'Equal' },
                                                                        { key: 'GreaterThan', text: 'GreaterThan', value: 'GreaterThan' },
                                                                        { key: 'LessThan', text: 'LessThan', value: 'LessThan' },
                                                                        { key: 'GreaterThanOrEqual', text: 'GreaterThanOrEqual', value: 'GreaterThanOrEqual' },
                                                                        { key: 'LessThanOrEqual', text: 'LessThanOrEqual', value: 'LessThanOrEqual' },
                                                                    ]}
                                                                    selection
                                                                    placeholder='Select a measure'
                                                                    defaultValue={c["compareType"]}
                                                                    onChange={(e, { value }) => {
                                                                        updateMetricCriteria(i, value, "compareType");
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="column">
                                                                <div className="ui input">
                                                                    <input 
                                                                        type="number" 
                                                                        placeholder="Numeric Value" 
                                                                        defaultValue={c["value"]}
                                                                        onChange={(e) => {
                                                                            updateMetricCriteria(i, parseInt(e.nativeEvent.target.value), "value");
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form.Field>
                                            )
                                        })}
                                        </div>
                                    </Form.Field>
                                    <Form.Field>
                                        <Button type="button" onClick={(event, data) =>  {
                                            setMetricCriteria([...metricCriteria, metricCriteriaDefualt])
                                        }}>Add Criteria</Button>
                                    </Form.Field>
                                    <div className="ui centered grid">
                                        <Button type="submit" positive>Submit</Button>
                                    </div>

                                </Form>
                            </Segment>
                        
                        </Container>
                    </Grid.Column>
                </Grid.Row>
                {/* <Grid.Row> */}
                    
                {/* </Grid.Row> */}
            </Grid>
            <SearchResults results={results}/>
        </div>
    )
}