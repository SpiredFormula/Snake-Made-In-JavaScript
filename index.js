class Canvas {
    constructor(row, collum, height, width){
        // canvas size
        this.collum = collum;
        this.row = row;
        this.height = height;
        this.width = width;

        // important variables

        this.canvas = document.querySelector('canvas')
        this.xypos = [];
        this.fruitpos = '32 1'
        this.fruitx = null
        this.fruity = null
    }
    drawCanvas = (NumCollums,NumRows,Width, Height ) => {
        this.canvas.width = Width;
        this.canvas.height = Height;
        let c = this.canvas.getContext('2d')
        c.fillStyle = "lightgreen";
        let rows = 0;
        let collums = 0;
        let x = 1;
        let y = 1;
        while(collums != NumCollums){
            while(rows != NumRows){
                this.xypos.push(`${x.toString()} ${y.toString()}`);
                
                c.fillRect(x,y,30,30)
                x = x + 31
                rows++
            }
            y = y+31
            x = 1
            rows = 0
            collums++
        }
    console.log("Canvas Drawn!!!")
    }
    spawnFruit(){
        const range = this.xypos.length;
        let randomNum = Math.floor((Math.random() * range) + 1);
        let spawnpos = this.xypos[randomNum]
        let xandy = spawnpos.split(' ')
        this.fruitx = Number(xandy[0])
        this.fruity = Number(xandy[1])
        let c = this.canvas.getContext('2d')
        c.fillStyle = "red";
        c.fillRect(this.fruitx,this.fruity,30,30)
        this.fruitpos = spawnpos
        console.log(this.fruitpos)
    
    }
    
}



class Snake{
    constructor(){
        this.currentPositions = []
        this.snakeX = 1;
        this.snakeY = 1;
        this.movement = "right"
        this.score = 0
        this.lengthOfSnake = 2
        this.snakehead = null
        this.checkforhit = []
        this.scoredisplay = document.getElementById('Score')
    }

    spawn() {
        const range = canvas.xypos.length;
        let randomNum = Math.floor((Math.random() * range) + 1);
        let spawnpos = canvas.xypos[randomNum]
        let xandy = spawnpos.split(' ')
        this.snakeX = Number(xandy[0])
        this.snakeY = Number(xandy[1])
        let c = canvas.canvas.getContext('2d')
        c.fillStyle = "white";
        c.fillRect(this.snakeX,this.snakeY,30,30)


    }

    move() {
        
        let c = canvas.canvas.getContext('2d')
        
        const delay = ms => new Promise(res => setTimeout(res, ms));
        var gameStarted = true
        this.currentPositions.push(`${this.snakeX} ${this.snakeY}`)
        this.checkforhit.push(`${this.snakeX} ${this.snakeY}`)
        let update = async () => {
            while(gameStarted != false){
                await delay(200);
                if(canvas.xypos.includes(this.currentPositions[this.currentPositions.length -1])){
                    

                    
                    if (this.movement === 'right') {
                        this.snakeX = this.snakeX+31
                        this.currentPositions.push(`${this.snakeX} ${this.snakeY}`)
                        this.snakehead = `${this.snakeX.toString()} ${this.snakeY.toString()}`

                    }
                    else if (this.movement === 'left') {
                        this.snakeX = this.snakeX-31
                        this.currentPositions.push(`${this.snakeX.toString()} ${this.snakeY.toString()}`)
                        this.snakehead = `${this.snakeX.toString()} ${this.snakeY.toString()}`
                        
                        
                    }
                    else if (this.movement === 'up') {
                        this.snakeY = this.snakeY+31
                        this.currentPositions.push(`${this.snakeX.toString()} ${this.snakeY.toString()}`)
                        this.snakehead = `${this.snakeX.toString()} ${this.snakeY.toString()}`

                       
                    }
                    else if (this.movement === 'down') {
                        this.snakeY = this.snakeY-31
                        this.currentPositions.push(`${this.snakeX.toString()} ${this.snakeY.toString()}`)
                        this.snakehead = `${this.snakeX.toString()} ${this.snakeY.toString()}`

                        
                        
                    }
                    
                    if (this.currentPositions.length > this.lengthOfSnake ){
                        let end = this.currentPositions[0];
                        let endcords = end.split(' ')
                        let endX = endcords[0]
                        let endY = endcords[1]
                        c.fillStyle = "lightgreen"
                        c.fillRect(endX, endY,30, 30)
                        this.currentPositions.shift()
                        this.checkforhit.shift()
                    }
                    
                    let check = -1
                    let poslen = this.currentPositions.length 
                    while(check < poslen-1){
                        check++

                        let pos = this.currentPositions[check]
                        
                        let XY = pos.split(' ')
                        let x = Number(XY[0])
                        let y = Number(XY[1])
                       
                        c.fillStyle = "white"
                        c.fillRect(x, y, 30,30)
                    }
                    
                    if(this.currentPositions.includes(canvas.fruitpos)) {
                        canvas.spawnFruit();
                        this.lengthOfSnake++
                        this.score++
                        this.scoredisplay.innerHTML = `Score: ${this.score}`
                        
                    }
                   
                    var z = -1
                    var headcheck = []
                    while(z != this.currentPositions.length -2) {
                        z++
                        headcheck.push(this.currentPositions[z])
                        
                    }

                    if (headcheck.includes(this.snakehead) && this.currentPositions.length != 2){
                            console.log("ded")
                            gameStarted = false;
                         }
                }
                else{
                    gameStarted = false;
                    console.log("ded")
                }
                
            }
            var button = document.createElement('button')
            button.id = 'StartButton' 
            button.innerHTML = "Start"
           
                
            
            let body = document.getElementById('mainBody')
            body.appendChild(button)
            var element = document.getElementById('StartButton')
            element.onclick = Start
          };
        update();
        
    }
}
var gameStarted = false
const canvas = new Canvas(20, 20, 621, 621)
canvas.drawCanvas(canvas.collum, canvas.row, canvas.width, canvas.height);



let Start = () => {
    canvas.drawCanvas(canvas.collum, canvas.row, canvas.width, canvas.height);
    document.getElementById('StartButton').remove();
    canvas.spawnFruit()
    const snake = new Snake();
    snake.spawn()
    snake.move()
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37 && snake.movement != 'right') {
            snake.movement = "left"
        }
        else if(event.keyCode == 39 && snake.movement != 'left') {
            snake.movement = "right"
        }
        else if(event.keyCode == 40 && snake.movement != 'down') {
            snake.movement = "up"
        }
        else if(event.keyCode == 38 && snake.movement != 'up') {
            snake.movement = "down"
        }
    });
    
}



