import Graph, { CanvasJS, CanvasJSChart } from "./Graph";
const height = {
  height: "calc(((100vh - 100px - 3.5rem) / 2))",
};
export default class RankGraph extends Graph {
  render() {
    const options = {
      zoomEnabled: true,
      exportEnabled: true,
      theme: 'dark2',
      colorSet: 'colorSet3',
      backgroundColor: '#222831',
      animationEnabled: true,
      title: {
        text: "Rank Graph",
      },
      axisY: {
        title: "Rank",
        titleFontSize: 24,
        includeZero: false,
      },
      data: [
        {
          type: "line",
          lineColor: '#00ff5e',
          lineThickness: '3',
          yValueFormatString: "####",
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
