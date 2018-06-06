import * as React from "react";
import { CommonUtil } from "../../common/util/CommonUtil";
import { connect } from 'react-redux';
import "./GameContainer.css";
import { setCell } from "../../actions";
import { CellState } from "../../common/util/Enum";

interface Props {
  setCell: (x, y, value) => any;
}

class GameContainer extends React.Component<Props, {}> {
  public canvas: HTMLCanvasElement;
  public canvasWrappingDiv: HTMLDivElement;
  public parentDiv: HTMLDivElement;
  public width: number;
  public height: number;

  public constructor(props) {
    super(props);
  }

  public componentDidMount() {
    this.width = this.parentDiv.clientWidth;
    this.height = this.parentDiv.clientHeight;
    this.updateCanvasDimensions();
    window.addEventListener("resize", this.updateCanvasDimensions);
    this.canvas.addEventListener("click", this.handleClick);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.updateCanvasDimensions);
    this.canvas.removeEventListener("click", this.handleClick);
  }

  private updateCanvasDimensions = () => {
    this.width = this.parentDiv.clientWidth;
    this.height = this.parentDiv.clientHeight;
    const canvasWidth = CommonUtil.calculateCanvasDimension(this.width);
    const canvasHeight = CommonUtil.calculateCanvasDimension(this.height);
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.canvasWrappingDiv.style.width = canvasWidth + "px";
    this.canvasWrappingDiv.style.height = canvasHeight + "px";
    this.drawLines();
    console.log(
      "updateCanvasDimensions",
      canvasWidth,
      canvasHeight,
      this.width,
      this.height
    );
  };

  private handleClick = (event: MouseEvent) => {
    // const ctx = this.canvas.getContext('2d');
    const boundingRect = this.canvasWrappingDiv.getBoundingClientRect();
    const mouseX = event.clientX - boundingRect.left;
    const mouseY = event.clientY - boundingRect.top;
    const destX = Math.floor(mouseX / 20);
    const destY = Math.floor(mouseY / 20);
    this.props.setCell(destX, destY, CellState.X);
  };

  private drawLines() {
    const ctx = this.canvas.getContext("2d");
    // Drawing vertical lines
    let height = this.canvas.height - 20;
    while (height > 0) {
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(this.canvas.width, height);
      ctx.stroke();
      height -= 20;
    }
    // drawing horizontal lines
    let width = this.canvas.width - 20;
    while (width > 0) {
      ctx.beginPath();
      ctx.moveTo(width, 0);
      ctx.lineTo(width, this.canvas.height);
      ctx.stroke();
      width -= 20;
    }
  }

  public render() {
    return (
      <div ref={ref => (this.parentDiv = ref)} className="GameContainer">
        <div ref={ref => (this.canvasWrappingDiv = ref)}>
          <canvas ref={ref => (this.canvas = ref)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch => {
  return {
    setCell: (x, y, value) => dispatch(setCell(x, y, value))
  }
}

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);
export default Game;