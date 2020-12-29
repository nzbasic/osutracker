import Graph, { CanvasJS, CanvasJSChart } from "./Graph";
const height = {
  height: "calc((100vh - 100px - 3.5rem) / 2)",
};
export default class PpGraph extends Graph {
  render() {
    const options = {
      theme: "light2",
      animationEnabled: true,
      title: {
        text: "pp Graph",
      },
      axisY: {
        title: "pp",
        titleFontSize: 24,
        includeZero: false,
      },
      data: [
        {
          type: "line",
          yValueFormatString: "#### pp",
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
