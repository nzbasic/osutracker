import Graph, { CanvasJS, CanvasJSChart } from "./Graph";

const height = {
  height: "calc((100vh - 100px - 3.5rem) / 2)",
  backgroundColor: '#393e46'
};

export default class AccGraph extends Graph {
  render() {
    const options = {
      theme: 'dark2',
      colorSet: 'colorSet3',
      backgroundColor: '#393e46',
      animationEnabled: true,
      title: {
        text: "acc Graph",
      },
      axisY: {
        title: "Accuracy",
        titleFontSize: 24,
        includeZero: false,
      },
      data: [
        {
          type: "line",
          lineColor: '#00ff5e',
          lineThickness: '3',
          yValueFormatString: "## ##%",
          dataPoints: this.props.points,
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart containerProps={height} options={options} />
      </div>
    );
  }
}
