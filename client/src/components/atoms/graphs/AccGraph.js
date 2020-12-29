import Graph, { CanvasJS, CanvasJSChart } from "./Graph";

const height = {
  height: "calc((100vh - 100px - 3.5rem) / 2)",
};

export default class AccGraph extends Graph {
  render() {
    const options = {
      theme: "light2",
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
