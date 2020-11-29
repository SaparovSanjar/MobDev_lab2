const Direction = Object.freeze({
  N: "N",
  S: "S",
  W: "W",
  E: "E",
});

class CoordinateSS  {
  constructor(degrees, minutes, seconds, direction) {
    if (degrees === null && minutes === null && seconds === null) {
      this.minutes = [0, 0];
      this.seconds = [0, 0];
      this.degrees = [0, 0];
      this.direction = [Direction.N, Direction.N];
      return;
    }
    if (
      degrees[0] >= -90 &&
      degrees[0] <= 90 &&
      degrees[1] >= -180 &&
      degrees[1] <= 180
    ) {
      this.degrees = degrees;
    } else {
      this.degrees = [0, 0];
    }
    if (
      minutes[0] >= 0 &&
      minutes[0] <= 59 &&
      minutes[1] >= 0 &&
      minutes[1] <= 59
    ) {
      this.minutes = minutes;
    } else {
      this.minutes = [0, 0];
    }
    if (
      seconds[0] >= 0 &&
      minutes[0] <= 59 &&
      seconds[1] >= 0 &&
      minutes[1] <= 59
    ) {
      this.seconds = seconds;
    } else {
      this.seconds = [0, 0];
    }

    this.direction = direction;
  }

  static DefaultInstance() {
    return new CoordinateSS (null, null, null, null);
  }

  getString1 = () => {
    console.log(this.degrees);

    return `${this.degrees[0]}${String.fromCharCode(0x00b0)}${
      this.minutes[0]
    }'${this.seconds[0]}"${this.direction[0]}\n${
      this.degrees[1]
    }${String.fromCharCode(0x00b0)}${this.minutes[1]}'${this.seconds[1]}"${
      this.direction[1]
    }`;
  };

  getString2 = () => {
    let dd;
    let dd1;
    if (this.degrees[0] < 0) {
      dd = -(this.seconds[0] / 3600) - this.minutes[0] / 60 + this.degrees[0];
    } else {
      dd = this.seconds[0] / 3600 + this.minutes[0] / 60 + this.degrees[0];
    }

    if (this.degrees[1] < 0) {
      dd1 = -(this.seconds[1] / 3600) - this.minutes[1] / 60 + this.degrees[1];
    } else {
      dd1 = this.seconds[1] / 3600 + this.minutes[1] / 60 + this.degrees[1];
    }

    return `${dd}${String.fromCharCode(0x00b0)}${
      this.direction[0]
    }\n${dd1}${String.fromCharCode(0x00b0)}${this.direction[1]}`;
  };

  getMidPoint = (pointObj) => {
    if (
      this.direction[0] !== pointObj.direction[0] &&
      this.direction[1] !== pointObj.direction[1]
    )
      return null;
    const d0 = (this.degrees[0] + pointObj.degrees[0]) / 2;
    const d1 = (this.degrees[1] + pointObj.degrees[1]) / 2;
    const m0 = (this.minutes[0] + pointObj.minutes[0]) / 2;
    const m1 = (this.minutes[1] + pointObj.minutes[1]) / 2;
    const s0 = (this.seconds[0] + pointObj.seconds[0]) / 2;
    const s1 = (this.seconds[1] + pointObj.seconds[1]) / 2;

    return new CoordinateSS (
      [d0, d1],
      [m0, m1],
      [s0, s1],
      [this.direction[0], this.direction[1]]
    );
  };

  static getMidPointStatic(p0, p1) {
    if (
      p0.direction[0] !== p1.direction[0] &&
      p0.direction[1] !== p1.direction[1]
    )
      return null;
    const d0 = (p0.degrees[0] + p1.degrees[0]) / 2;
    const d1 = (p0.degrees[1] + p1.degrees[1]) / 2;
    const m0 = (p0.minutes[0] + p1.minutes[0]) / 2;
    const m1 = (p0.minutes[1] + p1.minutes[1]) / 2;
    const s0 = (p0.seconds[0] + p1.seconds[0]) / 2;
    const s1 = (p0.seconds[1] + p1.seconds[1]) / 2;

    return new CoordinateSS (
      [d0, d1],
      [m0, m1],
      [s0, s1],
      [p0.direction[0], p0.direction[1]]
    );
  }
}

const c1 = CoordinateSS .DefaultInstance();
const c2 = new CoordinateSS (
  [70, 70],
  [2, 2],
  [2, 2],
  [Direction.S, Direction.S]
);

console.log(c2.getString1());
console.log(c2.getString2());
console.log(c1.getMidPoint(c2));
console.log(CoordinateSS .getMidPointStatic(c1, c2));
