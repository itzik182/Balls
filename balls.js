(function() {
    let self = this;
    let canvas     = document.getElementById('myCanvas');
    let ctx        = canvas.getContext("2d");
    let ballRadius = 10;
    const maxBalls = Math.floor(canvas.height / (ballRadius * Math.PI));
    const balls    = [];
    const minSpeed = 0.1;
    const maxSpeed = 0.8;
    self.run = run;

    function drawBall (ball) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#f5f542';
        const mostLeftBall = balls.find(ball => ball.x === Math.max.apply(Math, balls.map(ball => ball.x)));
        const mostRightBall = balls.find(ball => ball.x === Math.min.apply(Math, balls.map(ball => ball.x)));
        
        if (mostLeftBall.id === ball.id) {
            ctx.fillStyle = '#f54e42';
        } else if (mostRightBall.id === ball.id) {
            ctx.fillStyle = '#42f57b';
        }

        ctx.fill();
        ctx.closePath();
    }

    function clearRect (ball) {
        ctx.clearRect(ball.x - ballRadius - 1, ball.y - ballRadius - 1,
            ballRadius * 2 + 2, ballRadius * 2 + 2);
    }

    function draw (ball) {
        ctx.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI, false);
        clearRect(ball);
        drawBall(ball);

        if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
            ball.dx = -ball.dx;
        }

        ball.x += ball.dx;
    }

    function removeBall () {
        const lastBall = balls[balls.length - 1];
        clearRect(lastBall);
        clearInterval(lastBall.intervalId);
        balls.pop();
    }

    function createBall (index) {
        const ball = {
            id        : index,
            x         : canvas.width / 2,
            y         : canvas.height - (index * ballRadius * Math.PI),
            dx        : (Math.random() * (maxSpeed - minSpeed) + minSpeed).toFixed(1),
            intervalId: setInterval(() => {
                draw(ball)
            }, 10)
        };
        balls.push(ball);
    }

    function run () {
        let numberOfBalls     = parseInt(document.getElementById('numberOfBalls').value, 10);
        const isOutFromCanvas = canvas.height < (numberOfBalls * (ballRadius * Math.PI));

        if (!numberOfBalls || isNaN(numberOfBalls) || 0 > numberOfBalls) {
            return;
        }

        if (isOutFromCanvas) {
            numberOfBalls = maxBalls;

        }

        let index = 1;

        if (0 < balls.length && balls.length > numberOfBalls) {
            numberOfBalls = balls.length - numberOfBalls;
            for (let i = 0; i < numberOfBalls; i++) {
                removeBall();
            }
            return;
        } else {
            index = balls.length + 1;
        }

        for (let i = index; i <= numberOfBalls; i++) {
            setTimeout(()=>{createBall(i);}, 100)
        }
    }
})();