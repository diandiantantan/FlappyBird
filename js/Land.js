(function(){
	window.Land = function(){
		this.image = game.Robj["land"];
		//大地的位置
		this.x = 0;
		this.y = game.canvas.height - 112;
	}
	//更新，这个方法，每帧执行
	Land.prototype.update = function(){
		this.x -= 2;
		if(this.x < -336){
			this.x = 0;
		}
	}
	//渲染，这个方法，每帧执行
	Land.prototype.render = function(){
		//无缝连续滚动，所以克隆一张，一起移动。
 		game.ctx.drawImage(this.image,this.x,this.y);
 		game.ctx.drawImage(this.image,this.x + 336,this.y);
 	}
})();