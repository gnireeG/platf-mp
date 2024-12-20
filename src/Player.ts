import CanvasUtil from './CanvasUtil';
import Level from './interfaces/Level';
class Player{
    private c: CanvasUtil;
    private level: Level;
    private x: number = 0;
    private y: number = 0;
    private r: number = 10;
    private show: boolean = false;
    constructor(c: CanvasUtil, level: Level){
        this.c = c;
        this.level = level;
        this.spawn();
    }

    public draw(){
        if(!this.show){
            return;
        }
        if(this.c.keysPressed['ArrowRight']){
            this.x += 100 * this.c.deltaTime;
        }
        if(this.c.keysPressed['ArrowLeft']){
            this.x -= 100 * this.c.deltaTime;
        }
        if(this.c.keysPressed['ArrowUp']){
            this.y -= 100 * this.c.deltaTime;
        }
        if(this.c.keysPressed['ArrowDown']){
            this.y += 100 * this.c.deltaTime;
        }
        let onPlatform = this.isOnPlatform();
        if(onPlatform !== 0){
            this.y = onPlatform - this.r;
        }
        let belowPlatform = this.isBelowPlatform();
        if(belowPlatform !== 0){
            this.y = belowPlatform + this.r;
        }
        let onRightSide = this.isOnRightSide();
        if(onRightSide !== 0){
            this.x = onRightSide - this.r;
        }
        let onLeftSide = this.isOnLeftSide();
        if(onLeftSide !== 0){
            this.x = onLeftSide + this.r;
        }
        this.c.color('white');
        this.c.circle(this.x, this.y, this.r);
    }

    private isOnPlatform(): number{
        let onPlatform = 0;
        this.level.forEach((actor) => {
            if(actor.type === 'Block'){
                if(this.x > actor.x && this.x < actor.x + actor.width && this.y + this.r > actor.y && this.y + this.r < actor.y + actor.height){
                    onPlatform = actor.y;
                }
            }
        });
        return onPlatform;
    }

    private isBelowPlatform(): number{
        let belowPlatform = 0;
        this.level.forEach((actor) => {
            if(actor.type === 'Block'){
                if(this.x > actor.x && this.x < actor.x + actor.width && this.y - this.r > actor.y && this.y - this.r < actor.y + actor.height){
                    belowPlatform = actor.y + actor.height;
                }
            }
        });
        return belowPlatform;
    }

    private isOnRightSide(): number{
        let onRightSide = 0;
        this.level.forEach((actor) => {
            if(actor.type === 'Block'){
                if(this.y > actor.y && this.y < actor.y + actor.height && this.x + this.r*2 > actor.x && this.x + this.r*2 < actor.x + actor.width){
                    onRightSide = actor.x;
                }
            }
        });
        return onRightSide;
    }

    private isOnLeftSide(): number{
        let onLeftSide = 0;
        this.level.forEach((actor) => {
            if(actor.type === 'Block'){
                if(this.y > actor.y && this.y < actor.y + actor.height && this.x - this.r*2 > actor.x && this.x - this.r*2 < actor.x + actor.width){
                    onLeftSide = actor.x + actor.width;
                }
            }
        });
        return onLeftSide;
    }

    private spawn(){
        this.level.forEach((actor) => {
            if(actor.type === 'Start'){
                this.x = actor.x;
                this.y = actor.y;
            }
        });

        this.show = true;
    }
}

export default Player;