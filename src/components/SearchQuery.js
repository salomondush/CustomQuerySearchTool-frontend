
import 'semantic-ui-css/semantic.min.css'
import { Grid, Container, Segment, Form, Dropdown, Button } from 'semantic-ui-react'
// import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";
import TimePicker from 'react-time-picker';
import React, { useState, useEffect } from 'react'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
  } from 'semantic-ui-calendar-react';


export default function SearchQuery(props){

    const [ restuarantIds, setRestuarantIds ] = React.useState([]);
    const [ dateRange, setDateRange ] = React.useState("");
    const [ timeRange, setTimeRange ] = React.useState({
        start: "",
        end: ""
    });
    const [ open, setOpen ] = React.useState(true);
    const [ metric, setMetric ] = React.useState("");
    const [ measure, setMeasure ] = React.useState("");
    const [ numericValue, setNumericValue ] = React.useState("");

    const restaurantIdOptions = [
        { key: '1', text: '1', value: '1' },
        { key: '2', text: '2', value: '2' },
        { key: '3', text: '3', value: '3' },
        { key: '4', text: '4', value: '4' },
        { key: '5', text: '5', value: '5' },
        { key: '6', text: '6', value: '6' },
        { key: '7', text: '7', value: '7' },
        { key: '8', text: '8', value: '8' },

    ]

    console.log("date range", dateRange);

    function handleSubmit(){
        const query = {
            "restuarantIds": restuarantIds,
            "fromDate": "",
            "toDate": "",
            "fromHour": "",
            "toHour": "",
            "metricCriteria": [
                {
                    "metricCode": "string",
                    "compareType": "Equal",
                    "value": 0
                }
            ]
        }

        // todo: send query to server
    }

    return (
        <div className="SearchQuery">
            <Grid className="Grid">
                <Grid.Row>
                    <Grid.Column>
                        <Container>
                            <Segment>
                                <Form onSubmit={handleSubmit}>
                                <div class="ui grid">
                                   <div class="two column row">
                                        <div class="column">
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
                                        {/* <Form.Field onClick={()=>setOpen(!open)}>
                                            <label>Date Range</label>
                                            <div class="ui fluid icon input">
                                                <input type="text" placeholder="Select Date Range" value={`${dateRange.startDate} to ${dateRange.endDate}`}/>
                                                { open? <i class="sort up icon"></i>: <i class="sort down icon"></i>}
                                            </div>
                                        </Form.Field>
                                        
                                        <Form.Field>
                                            <DateRangePicker
                                                open={open}
                                                onChange={ range => setDateRange(range) }
                                            />
                                        </Form.Field> */}
                                        <div class="column">
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
                                        <div class="ui grid">
                                            <div class="two column row">
                                                <div class="column">
                                                    <TimeInput
                                                        name="startTime"
                                                        placeholder="Start"
                                                        value={timeRange.start}
                                                        iconPosition="left"
                                                        onChange={(e, { value }) => setTimeRange({start: value, end: timeRange.end})}
                                                    />
                                                </div>
                                                <div class="column">
                                                    <TimeInput
                                                        name="endTime"
                                                        placeholder="End"
                                                        value={timeRange.end}
                                                        iconPosition="left"
                                                        onChange={(e, { value }) => setTimeRange({start: timeRange.start, end: value})}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Metric Selector</label>
                                        <div class="ui grid">
                                            <div class="three column row">
                                                <div class="column">
                                                    <Dropdown
                                                        options={[
                                                            { key: 'Metric1', text: 'Metric1', value: 'Metric1' },
                                                            { key: 'Metric2', text: 'Metric2', value: 'Metric2' },
                                                        ]}
                                                        selection
                                                        placeholder='Select Metric'
                                                        value={metric}
                                                        onChange={(e, { value }) => setMetric(value)}
                                                    />
                                                </div>
                                                <div class="column">
                                                    <Dropdown
                                                        options={[
                                                            { key: '=', text: '=', value: '=' },
                                                            { key: '>', text: '>', value: '>' },
                                                            { key: '<', text: '<', value: '<' },
                                                            { key: '>=', text: '>=', value: '>=' },
                                                            { key: '<=', text: '<=', value: '<=' },
                                                        ]}
                                                        selection
                                                        placeholder='Select a measure'
                                                        value={measure}
                                                        onChange={(e, { value }) => setMeasure(value)}
                                                    />
                                                </div>
                                                <div class="column">
                                                    <div class="ui input">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Numeric Value" 
                                                            value={numericValue} 
                                                            onChange={(e) => setNumericValue(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Form.Field>
                                    <div class="ui centered grid">
                                        <Button type="submit" positive>Submit</Button>
                                    </div>
                                    
                                </Form>
                            </Segment>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}