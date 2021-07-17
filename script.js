let x1 = document.getElementById("lost"); 

function playAudio() { 
   x1.play(); 
} 

let y1 = document.getElementById("click"); 

function playAudio1() { 
   y1.play(); 
} 

let z1 = document.getElementById("powerUp"); 

function playAudio2() { 
   z1.play(); 
}


//localStorage.clear();


let userName = prompt("Enter your user name");
for(;userName == "" || userName == "null"; )
{
    userName = prompt("Enter your user name"); 
}

        let player;
        let hole = [];
        let ob = [];
        let ceiling;
        let floor;
        let playerPos = true;
        let Score;
        let some;
        let img = document.getElementById("tri");
        let powerUp = document.getElementById("power");
        let powerUp1 = [];
        let obstacles = document.getElementById("obs");
        let verticalObs = [];
        let powerUp2;
        let win =0 ;        
        let event, ScoreRand = -501;       
        let names = [];
        let i=0;
        let flg = 0;
        let pause1 = document.getElementById("pause");
        let play1 = document.getElementById("play");  
        //let checker = false;
        play1.style.display = "none";
        let collect = [];
        function scoreBoard(userName,highScore)
        {
            //checker = true;
            localStorage.setItem("array", JSON.stringify(names));            
            names = JSON.parse(localStorage.getItem("array"));
            //names = collect;
            console.log(names);
            for(i=0;i<names.length;i++)
            {
                if(userName == names[i][0])
                {
                    names[i][0] = userName;
                    if(names[i][1]<highScore)
                    {
                        names[i][1] = highScore;
                    }
                    
                    flg = 1;
                }
            }
           
            //console.log(names.length);
            if((flg == 0) || (names.length == 0))
            {
                //names.push([userName,highScore]);
                names.push([userName,highScore]);
                //names[names.length] = [userName,highScore];
                // localStorage.setItem('__array', JSON.stringify(names));
                // console.log(names);
                // console.log("pushed");
            }

            //flg = 0;

            localStorage.setItem("array", JSON.stringify(names));
            
            collect = JSON.parse(localStorage.getItem("array"));
            //console.log(names);

            collect.sort(function(a, b){return b[1]-a[1]});
            // for(i=0;i<names.length;i++)
            // {
            //     list.innerHTML  += '<li>' + names[i][0] + names[i][1] +'</li>'; 
            // }


            
        }

        function scoreBoard1 ()
        {
            // if(checker == true)
            // {
               
            // }
             //localStorage.setItem('__array', JSON.stringify(names));
             collect = JSON.parse(localStorage.getItem("array"));
             //console.log(names);
 
             collect.sort(function(a, b){return b[1]-a[1]});
             for(i=0;i<collect.length;i++)
             {
                 list.innerHTML  += '<li>' + collect[i][0] +  '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + collect[i][1] +'</li>'; 
                
             }
           

        }

        function playerUp() {
            player.y = 90;
            player.angle = 180;
        }

        function playerDown() {
            player.y = 220;
            player.angle = 0;
        }

        function clearmove() {
            player.speedX = 0;
            player.speedY = 0;
        }
        
        function pause ()
        {
            clearInterval(GameCanvas.interval);
            pause1.style.display = "none";
            play1.style.display = "block";
        }
        function play()
        {
            GameCanvas.intervalFunction();
            play1.style.display = "none";
            pause1.style.display = "block";
        }

        function startGame() {
            
            
            scoreBoard1();
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

            
            
            Score = new Generator("15px", "verdana", "#00e7fc", 1200, 20, "text");

            ceiling = new Generator(10, 90, "black", 0, 250);
            floor = new Generator(10, 90, "black", 0, 0);
            if(Math.random() < 0.7)
            {
                player = new Generator(30, 30, playerColor[0], 50, 220,"image")
  
            }
            else{
                player = new Generator(30, 30, playerColor[0], 50, 220)
            }
            GameCanvas.start();
            
            
            
            
            let data = holesArray(6000, function (i) { return i * 110; });
            data.forEach((value, index) => {
                if (value > 30) {
                    if (Math.random() < 0.4) {
                        
                        hole.push(new Generator(Math.random() < 0.5 ? 50 : 70, 90, "#757678", value + 600, 0))

                    }
                    else if( Math.random() < 0.6  && Math.random() > 0.4)
                    {
                        //verticalObs.push(new Generator(30, 30, playerColor[3], value + 150, 220));
                        if(Math.random()<0.45)
                        {
                            verticalObs.push(new Generator(30, 30, playerColor[3], value + 150, 220 ,"image2"));
                            //powerUp1.push(new Generator(30, 30,"#757678" , value + 360, 220,"powerUp"));
                        }
                        else if(Math.random()>0.58)
                        {
                            powerUp1.push(new Generator(30, 30,"#757678" , value + 360, 90,"powerUp"));
                        }
                        else
                        {
                            //verticalObs.push(new Generator(30, 30, playerColor[3], value + 150, 220));
                            powerUp1.push(new Generator(30, 30,"#757678" , value + 360, 220,"powerUp"));
                        }
                        
                        //console.log("po");
                       
                        
                    }
                    
                    else{

                        //console.log("i got 1");
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


                intervalFunction: function(){
                    this.interval = setInterval(updateGameArea, 10);
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
            this.angle = 0;
            this.dy = 2;
           
            this.update = function () {
                ctx = GameCanvas.context;
                if (this.type == "text") {
                    ctx.font = this.width + " " + this.height;
                    ctx.fillStyle = color;
                    ctx.fillText(this.text, this.x, this.y);
                } 
                else if (this.type == "image")
                {
                    
                    
                    ctx.save();
                    ctx.translate(this.x,this.y+15)
                    ctx.rotate(this.angle * Math.PI / 180)                  
                    //img = document.getElementById("tri");                   
                    ctx.drawImage(img,this.width / -2, this.height / -2, this.width, this.height );
                    ctx.restore();
                }
                else if (this.type == "powerUp")
                {
                    //ctx.drawImage(powerUp,this.width / -2, this.height / -2, this.width, this.height );
                    ctx.drawImage(powerUp,this.x, this.y, this.width, this.height );
                }
                else if(this.type == "image2")
                {
                    ctx.drawImage(obstacles,this.x, this.y, this.width, this.height ); 
                }
                else{
                    ctx.fillStyle = color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            }
            
            this.newPos = function () {
                this.x += this.speedX;
                this.y += this.speedY;
            }
            //speedControl(events);
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

            // function pause()
            // {
            //     GameCanvas.stop();
            // }


            for (let i = 0; i < powerUp1.length; i++) {
                powerUp1[i].x += -1;
                powerUp1[i].update();
            }

            
            for(let i=0;i<verticalObs.length;i++)
            {
                verticalObs[i].x += -0.8;
                verticalObs[i].y += verticalObs[i].dy;
                if(verticalObs[i].y>220 || verticalObs[i].y<90)
                {
                    verticalObs[i].dy *= -1;

                }
                verticalObs[i].update();
               

            }
            for(i=0;i<verticalObs.length;i += 1)
            {
                if(player.crashWith(verticalObs[i]))
                {

                    GameCanvas.stop();
                    playAudio();
                    console.log(userName);
                    console.log(GameCanvas.frameNo);
                    scoreBoard(userName,GameCanvas.frameNo);

                    //console.log("I got powerUp");
                    //ScoreRand = GameCanvas.frameNo;
                }
            }



           //let highScore = localStorage.getItem("highScore") !== null ? localStorage.getItem("highScore") : 0;
            score = document.querySelector('.score');
            
            score.innerHTML = ` Live Score : ${GameCanvas.frameNo}`
           
            Score.update();
            player.newPos();
            player.update();

           




            for(i=0;i<powerUp1.length;i += 1)
            {
                if(player.crashWith(powerUp1[i]))
                {
                    //console.log("I got powerUp");
                    ScoreRand = GameCanvas.frameNo;
                    playAudio2();
                }
            }
            if(GameCanvas.frameNo < ScoreRand+500)
            {
                events = 0;
            }
            else
            {
                events = 1;
            }
            speedControl(events);




            
            function speedControl(e){
                if(e===1)
                {
                    if(GameCanvas.frameNo>5000 && GameCanvas.frameNo <=10000 ){
                        for (let i = 0; i < hole.length; i++) {
                            hole[i].x += -1.5;
                            hole[i].update();
                        }
                    }
                    else if(GameCanvas.frameNo>10000 ){                    
                        for (let i = 0; i < hole.length; i++) {
                            hole[i].x += -2;
                            hole[i].update();                   
                        }
                    }
                    else{
                        for (let i = 0; i < hole.length; i++) {
                            hole[i].x += -1;
                            hole[i].update();                   
                        }
                    }
                    for (let i = 0; i < powerUp1.length; i++) {
                        powerUp1[i].x += -1;
                        powerUp1[i].update();
                    }
                    
                }
                else
                {
                    for (let i = 0; i < hole.length; i++) {
                        hole[i].x += -0.5;
                        hole[i].update();                   
                    }
                    for (let i = 0; i < powerUp1.length; i++) {
                        powerUp1[i].x += -0.5;
                        powerUp1[i].update();
                       
                    }

                }
            }


                    
            for (i = 0; i < hole.length; i += 1) {
                if (player.crashWith(hole[i])) {
                    GameCanvas.stop();
                    playAudio();
                    scoreBoard(userName,GameCanvas.frameNo);
                    let btn = document.createElement("BUTTON");
                    btn.setAttribute("id", "restart");

                    btn.addEventListener('click', function (event) {

                        location.reload();
                    });
                   
                    btn.innerHTML = "RESTART";
                    console.log(userName);
                    console.log(GameCanvas.frameNo);
                    
                    
                    

                    
                    return;
                }
            }


            

        }
        
        
        
  