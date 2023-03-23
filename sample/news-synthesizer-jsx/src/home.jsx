import DatePicker, { DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import { useState, useMemo } from 'react';
import Select from 'react-select'
//import countryList from 'react-select-country-list'
import { createConfig } from "./config-creator";
import APIService from "./component/APIService";
import './css-styling/home.css'

const Home = ({ changePage }) => {
    
    //sending dates, location, and category to flask
    const insertFilters = () =>{
        APIService.insertFilters(dateValue,locationValue,categoryValue)
        .catch(error => console.log('error', error))
    }
    
    const today = new DateObject()
    const tmrw = new DateObject()

    tmrw.add(1, "days");

    const [dateValue, dateSetValue] = useState([today, tmrw]);
    const [locationValue, locationSetValue] = useState('');
    const [categoryValue, categorySetValue] = useState('');
    const userValue = { dateValue, locationValue, categoryValue };

    const options = require('./data-s/countries.json')
    const cat = require('./data-s/news_category.json')

    const config = () => {
        changePage();
        createConfig(userValue);
        insertFilters();
        
    }
    console.log(typeof dateValue)
    console.log(typeof locationValue)
    console.log(typeof categoryValue)

    return (
        <div className="home">
            <h1>News Syntesizer</h1>
            <div className="news_preferences">
                <div className='news_timeframe'>
                    Choose dates: <br />
                    <DatePicker
                        multiple
                        plugins={[<DatePanel />]}
                        value={dateValue}
                        onChange={dateSetValue}
                    />
                </div>
                <div className='news_location'>
                    Select locations <br />
                    <Select
                        isMulti
                        options={options}
                        onChange={locationSetValue}
                        placeholder='Choose news country' />
                </div>
                <div className='news_category'>
                    Select categories <br />
                    <Select
                        isMulti
                        options={cat}
                        onChange={categorySetValue}
                        placeholder='Choose news categories' />
                </div>
                <div className="generate_button">
                    <button onClick={config}>Generate</button>
                </div>
            </div>


        </div >
    );
}
export default Home;