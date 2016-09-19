(function(){
	window.Background = function(){
		//自己的图片
		this.image = game.Robj["beijing1"];
		//自己的x值
		this.x = 0;
	}
	//更新，这个方法，每帧执行
	Background.prototype.update = function(){
		//根据自己的场景来
		this.x-= 1;
		if(this.x < -game.canvas.width){
			this.x = 0;
		}
	}
	//渲染，这个方法，每帧执行
	Background.prototype.render = function(){
		//渲染图片，再渲染一张猫腻图片
		game.ctx.drawImage(this.image,this.x,0,game.canvas.width , game.canvas.height);
		game.ctx.drawImage(this.image,game.canvas.width + this.x,0,game.canvas.width , game.canvas.height);
	}
})();