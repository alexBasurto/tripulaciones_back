import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { apiCharts } from "../utils/apiCharts.js";
import { useSession } from "../SessionAdminContext.jsx";

class Chart extends React.Component {
    render() {
        return (
            <Plot
                data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
                ]}
                layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
            />
        );
    }
}

const Chart1 = () => {
const [loading, setLoading] = useState(true);
const { session } = useSession();

useEffect(() => {
    apiCharts(session.idCompany, 1).then((result) => {
        setLoading(false);
        console.log(result);
    }
    ).catch((error) => {
        console.log(error);
    });
}
, []);




    return (
        <div>
            <h1>Chart1</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Chart />
                </div>
            )}
        </div>
    );
};

export default Chart1;
