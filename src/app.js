import './scss/app.scss';
import 'bootstrap';
import bb from 'billboard.js'

var chart = bb.generate({
    data: {
        columns: [
            ["data1", 30],
            ["data2", 120]
        ],
        type: "donut"
    },
    donut: {
        title: "Iris Petal Width"
    },
    bindto: "#donut-chart"
});