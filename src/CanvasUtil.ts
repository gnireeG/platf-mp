class CanvasUtil {
    private canvasHTML: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public mouse: {x: number, y: number} = {x: 0, y: 0};
    public keydown: boolean = false;
    private pressedKeysCount: number = 0;
    public keysPressed: {[key: string]: boolean} = {};
    public deltaTime: number = 0;
    private lastTime: number = 0;

    constructor(canvasId: string){
        this.canvasHTML = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!this.canvasHTML) {
            throw new Error("Canvas element not found");
        }
        this.ctx = this.canvasHTML.getContext('2d') as CanvasRenderingContext2D;
        this.bindMouse();
        this.bindKeysboard();
        this.lastTime = performance.now();
    }

    private bindMouse(){
        this.canvasHTML.addEventListener('mousemove', (event) => {
            this.mouse = {x: event.offsetX, y: event.offsetY};
        });
    }

    private bindKeysboard(){
        document.addEventListener('keydown', (event) => {
            if (!this.keysPressed[event.key]) {
                this.keysPressed[event.key] = true;
                this.pressedKeysCount++;
            }
            this.keydown = this.pressedKeysCount > 0;
        });
    
        document.addEventListener('keyup', (event) => {
            if (this.keysPressed[event.key]) {
                this.keysPressed[event.key] = false;
                this.pressedKeysCount--;
            }
            this.keydown = this.pressedKeysCount > 0;
        });
    }

    public updateDeltaTime(currentTime: number) {
        this.deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
    }

    public color(color: string){
        this.ctx.fillStyle = color;
    }

    public background(color: string){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvasHTML.width, this.canvasHTML.height);
    }

    public circle(x: number,y: number,r: number){
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.fill();
    }

    public square(x: number, y: number, w: number){
        this.ctx.fillRect(x, y, w, w);
    }

    public rectangle(x: number, y: number, w: number, h: number){
        this.ctx.fillRect(x, y, w, h);
    }
}

export default CanvasUtil;
