import CanvasUtil from './CanvasUtil';
import Player from './Player';
import Level from './interfaces/Level';
import scene from '../level/.ghostlight/scenes/scene.json';
class Game {
    public c: CanvasUtil;

    private level: Level
    private player: Player

    constructor(canvasName: string){
        this.c = new CanvasUtil(canvasName);
        this.level = scene.actors;
        this.player = new Player(this.c, this.level);
        this.draw();
    }

    private draw(){
        this.c.updateDeltaTime(performance.now());

        this.c.background('black');
        this.renderLevel();

        this.player.draw();

        window.requestAnimationFrame(this.draw.bind(this));
    }

    private renderLevel(){
        this.level.forEach((actor) => {
            switch(actor.type){
                case 'Block':
                    this.c.color('brown');
                    break;
                case 'Spike':
                    this.c.color('red');
                    break;
                case 'Start':
                    this.c.color('blue');
                    break;
                case 'End':
                    this.c.color('yellow');
                    break;
                default:
                    break;
            }
            this.c.rectangle(actor.x, actor.y, actor.width, actor.height);
        });
    }
    
}

export default Game;
