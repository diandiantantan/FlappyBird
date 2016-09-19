(function(){
	window.Bird = function(){
		//图片序列
		this.imageArr = [game.Robj["bird0"],game.Robj["bird1"],game.Robj["bird2"]];
		//翅膀状态，0、1、2
		this.wing = 0;
		//位置
		this.x = game.canvas.width / 3;
		this.y = 100;
		//内部计数器
		this.f = 0;
		//角度
		this.angle = 0;
		//有限状态机，就是信号量
		this.state = "A";  //A下落 B上升
	}
	//飞更高
	Bird.prototype.flyHigh = function(){
		this.state = "B";
		//计数器清零
		this.f = 0;
	}
	//更新，这个方法，每帧执行
	Bird.prototype.update = function(){
		if(game.sm.sceneNumber == 2){
			this.y += 20;
			if(this.y >= 370){
				this.y = 370;
			}
			return;
		}
		if(game.frameNumber % 4 == 0){
			this.wing = ++this.wing % 3;
		}

		if(this.state == "A"){
			//计数
			this.f ++;
			//天生下落，除的数字越大掉落越慢
			this.y += Math.pow(this.f , 2) / 30;
			//下落旋转，除的数字越大转的越慢
			this.angle = this.f / 18;
		}else if(this.state == "B"){
			//我们可以自己定义上飞的帧数25帧
			this.f ++;
			//上升，上升的时候第1瞬间变化量最大，到第25帧，变化为0
			//除的数字越大，跳的高度越小
			this.y -= Math.pow((25 - this.f) , 2) / 60;
			//鸟头朝向上边，除的数字越大转的越慢
			this.angle = -(25 - this.f) / 18;
			if(this.f > 25){
				this.state = "A";
				this.f = 0;
			}
		}

		//判定坠毁
		if(this.y > 300){
			game.sm.changeSence(2);
		}
	}
	//渲染，这个方法，每帧执行
	Bird.prototype.render = function(){
		//备份
		game.ctx.save();
		//先translate，把坐标原点移动到鸟的中心
		game.ctx.translate(this.x + 24 , this.y + 24);
		game.ctx.rotate(this.angle);
		game.ctx.drawImage(this.imageArr[this.wing],-24, -24);

		//恢复
		game.ctx.restore();
 	}
})();