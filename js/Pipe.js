(function(){
	window.Pipe = function(){
		//自己的图片
		this.image1 = game.Robj["pipe_up"];
		this.image2 = game.Robj["pipe_down"];

		this.kaikou = 130;
		//管子的高度，height2是开口向下的管子，height1是开口向上的管子
		this.height2 = _.random(10,200);
		this.height1 = 400 - this.kaikou - this.height2;
		//x坐标
		this.x = 300;  
		//已经安全通过了
		this.alreadyPass = false;
	}
	//更新，这个方法，每帧执行
	Pipe.prototype.update = function(){
		this.x-= 3;
		//如果自己出屏幕了，自杀
		if(this.x < -52){
			game.sm.pipes = _.without(game.sm.pipes ,this);
		}

		//碰撞检测，4个数字就能验证是否小鸟撞到了上管子
		if((this.x < game.bird.x + 7 + 28) && (this.height2 > game.bird.y + 9) && (this.x > game.bird.x - 42) ){
			game.sm.changeSence(2);
		}else if((this.x < game.bird.x + 7 + 28) && (400 - this.height1 < game.bird.y + 7 + 28) && (this.x > game.bird.x - 42) ){
			game.sm.changeSence(2);
		}

		//加分检测
		if(!this.alreadyPass && (this.x + 52 < game.bird.x)){
			this.alreadyPass = true;
			game.score ++;
		}
	}
	//渲染，这个方法，每帧执行
	Pipe.prototype.render = function(){
		//渲染图片
		game.ctx.drawImage(this.image2,0,320-this.height2,52,this.height2,this.x,0,52,this.height2);
		game.ctx.drawImage(this.image1,0,0,52,this.height1,this.x,400 - this.height1,52,this.height1);
	}
})();