import { useState } from "react";
import Chart from "react-apexcharts";


const TimeSeriesComponent = () => {
    const [options, setOptions] = useState()
    const [series, setSeries] = useState()

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart" >

                    < Chart options={options}
                        series={series}
                        type="bar"
                        width="500"
                    />
                </div>
            </div>
        </div>
    )
}

export default TimeSeriesComponent;