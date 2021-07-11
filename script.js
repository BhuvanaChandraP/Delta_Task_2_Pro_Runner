let x1 = document.getElementById("lost"); 

function playAudio() { 
   x1.play(); 
} 

let y1 = document.getElementById("click"); 

function playAudio1() { 
   y1.play(); 
} 



let userName = prompt("Enter your user name");
for(;userName == "";)
{
    userName = prompt("Enter your user name"); 
}

        let player;
        let hole = [];
        let ceiling;
        let floor;
        let playerPos = true;
        let Score;
        function scoreBoard()
        {
            let j = localStorage.length;
            let k;
            let l;
            let list = document.querySelector('#list');
            let list1 = document.querySelector('#list1');
            let aKeyName = [];
            let aValue = [];
            for(k=0;k<j;k++)
            {
                 aKeyName[k] = localStorage.key(k);
                 aValue[k] = localStorage.getItem(localStorage.key(k))
                
            }
            aValue.sort(function(a, b){return b-a});
            for(l=0;l<j;l++)
            {
                for(k=0;k<j;k++)
                {
                    if(aValue[l] == localStorage.getItem(localStorage.key(k)) )
                    {
                        
                        list.innerHTML += '<li>' + localStorage.key(k) + '&nbsp&nbsp&nbsp&nbsp'+ '&nbsp &nbsp &nbsp' + localStorage.getItem(localStorage.key(k)) + '</li>' ;
                        
                    }
                }
                
            }
            console.log(aValue);
            
        }

        function playerUp() {
            player.y = 90;
        }

        function playerDown() {
            player.y = 220;
        }

        function clearmove() {
            player.speedX = 0;
            player.speedY = 0;
        }
        

        function startGame() {
            
            
            scoreBoard();
            playerColor = ["#00e7fc","#00fc1d","#e3fc00","#fc1414","#fc14e9"]

            function shuffle(array) {
                let currentIndex = array.length,  randomIndex;
              
               
                while (0 !== currentIndex) {
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex--;
                  [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
                }
              
                return array;
              }
             
            
            shuffle(playerColor);

            

            player = new Generator(30, 30, playerColor[0], 50, 220)
            Score = new Generator("15px", "verdana", "#00e7fc", 1200, 20, "text");

            ceiling = new Generator(10, 90, "black", 0, 250);
            floor = new Generator(10, 90, "black", 0, 0);
            GameCanvas.start();
            


            
            let data = holesArray(6000, function (i) { return i * 110; });
            data.forEach((value, index) => {
                if (value > 30) {
                    if (Math.random() < 0.4) {
                        
                        hole.push(new Generator(Math.random() < 0.5 ? 50 : 70, 90, "#757678", value + 600, 0))

                    }
                    else if( Math.random() < 0.6 && Math.random() > 0.4)
                    {

                    }
                    else{

                        
                        hole.push(new Generator(Math.random() < 0.5 ? 50 : 65, 90, "#757678", value + 600, 250))


                    }

                }


            })


            function holesArray(count, content) {
                let obs = [];
                if (typeof (content) == "function") {
                    for (let i = 0; i < count; i++) {
                        obs.push(content(i));
                       
                    }
                } else {
                    for (let i = 0; i < count; i++) {
                        obs.push(content);
                    }
                }
                return obs;
            }
            

        }

        let GameCanvas = {
            canvas: document.createElement("canvas"),
            start: function () {
               
                this.canvas.width = 580;
                this.canvas.height = 340;
                this.canvas.setAttribute("id", "gameArea")
                this.context = this.canvas.getContext("2d");
                this.frameNo = 0;

              
                document.getElementById("list").appendChild(this.canvas);

                this.interval = setInterval(updateGameArea, 10);
                

                this.canvas.addEventListener('click', function (event) {
                    playAudio1();
                    if (playerPos) {
                        playerUp();
                        playerPos = !playerPos
                    }
                    else {
                        playerDown();
                        playerPos = !playerPos

                    }
                });
                document.addEventListener('keydown', function (event) {
                    playAudio1();
                    let key = event.which || event.keyCode;
        
                    if (key === 32) { 
                        
                        if (playerPos) {
                        playerUp();
                        playerPos = !playerPos
                        }
                        else {
                            playerDown();
                            playerPos = !playerPos
        
                        }
                    
                    
                    }
        
                });

 },
            clearCanvas: function () {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },
            stop: function () {
                clearInterval(this.interval);
            }
        }

        function Generator(width, height, color, x, y, type) {
            this.width = width;
            this.type = type;
            this.height = height;
            this.speedX = 0;
            this.speedY = 0;
            this.x = x;
            this.y = y;
            this.update = function () {
                ctx = GameCanvas.context;
                if (this.type == "text") {
                    ctx.font = this.width + " " + this.height;
                    ctx.fillStyle = color;
                    ctx.fillText(this.text, this.x, this.y);
                } else {
                    ctx.fillStyle = color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            }
            this.newPos = function () {
                this.x += this.speedX;
                this.y += this.speedY;
            }
            this.crashWith = function (holePosition) {
                let left = this.x;
                let right = this.x + (this.width);
                let top = this.y;
                let bottom = this.y + (this.height);
                let holeLeft = holePosition.x;
                let holeRight = holePosition.x + (holePosition.width);
                let holeTop = holePosition.y;
                let holeBottom = holePosition.y + (holePosition.height);
                let crash = true;
                if ((bottom < holeTop) || (top > holeBottom) || (right < holeLeft+25) || (left > holeRight-25)) {      //(bottom < holeTop) || (top > holeBottom) ||
                    crash = false;
                }
                return crash;
            }
        }

        function updateGameArea() {

            GameCanvas.clearCanvas();
            GameCanvas.frameNo += 1;
            ceiling.width += 100;
            ceiling.update();
            floor.width += 100;
            floor.update()
            
            for (let i = 0; i < hole.length; i++) {

                hole[i].x += -1;
                hole[i].update();
            }
            let highScore = localStorage.getItem("highScore") !== null ? localStorage.getItem("highScore") : 0;
            score = document.querySelector('.score');
            
            score.innerHTML = ` Live Score : ${GameCanvas.frameNo}`
           
            Score.update();
            player.newPos();
            player.update();

            for (i = 0; i < hole.length; i += 1) {
                if (player.crashWith(hole[i])) {
                    GameCanvas.stop();
                    playAudio();
                    let btn = document.createElement("BUTTON");
                    btn.setAttribute("id", "restart");

                    btn.addEventListener('click', function (event) {

                        location.reload();
                    });
                   
                    btn.innerHTML = "RESTART";
                    
                    highScore = parseInt(localStorage.getItem(userName,GameCanvas.frameNo));
                    
                    if(Number.isNaN(highScore))
                    {
                        highScore = 0;
                        localStorage.setItem(userName,"0");
                    }
                    
                    
                    console.log(GameCanvas.frameNo);
                    console.log(highScore);
                    if (highScore < GameCanvas.frameNo) {
                        console.log("1");
                        localStorage.setItem(userName,GameCanvas.frameNo);
                     
                    }
                    document.getElementById(list) = " ";
                    scoreBoard();
                    

                    
                    return;
                }
            }

        }
        
        
        
        