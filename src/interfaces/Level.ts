interface Actor {
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
}

interface Level extends Array<Actor> {}

export default Level;