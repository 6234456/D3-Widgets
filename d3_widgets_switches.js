(function(){
				d3.svg.switches = function(){
					var d3_switch = function(){
						this.h = 50;
						this.w = 100;
						this.fill_ = "#ff7f50";
						this.click = function(){};
						this.state_ = true;
						this.disabled = false;
					};
					
					d3_switch.prototype.width = function(w){
						this.w = w;
						return this;
					}	
					
					d3_switch.prototype.disable = function(){
					
						this.container.select("g.switch").on("click",null);
						this.disabled = true;
						
					}	
						
					d3_switch.prototype.enable = function(){
						if(!this.state_)
							this.on();
						
						var self = this;
						
						this.container.select("g.switch").on("click",function(){
							self.toggle();
							self.click();
						});
						
								
						this.disabled = false;
						
					}	
					
					d3_switch.prototype.toggle = function(){
						this.state(!this.state_);
						
						return this;
					}
					
					d3_switch.prototype.state = function(state){
						if(arguments.length > 0){
							if(state === this.state_)
								return;
							
							if(state)
								this.on();
							else
								this.off();
								
							this.state_ = state;
						}else{
							return this.state_;
						}
					}
					
					d3_switch.prototype.off = function(){
						var h = this.h;
						var w = this.w;
						var r = this.r;
					
						this.container.select("circle.switch-scroll")
								.transition()
								.duration(100)
								.ease("quad-in-out")
								.attr("cx", w-(h -2*r)/2 -r);
						
						this.container.select("rect.switch-body")
								.transition()
								.duration(100)
								.style("fill", "#ccc");
								
						return this;
					}
					
					d3_switch.prototype.on = function(){
						var h = this.h;
						var w = this.w;
						var r = this.r;
						this.container.select("circle.switch-scroll")
								.transition()
								.duration(100)
								.ease("quad-in-out")
								.attr("cx", r + (h -2*r)/2);
						
						this.container.select("rect.switch-body")
								.transition()
								.duration(100)
								.style("fill", this.fill_);
						return this;
					}
					
					d3_switch.prototype.fill = function(fill){
						this.fill_ = fill;
						return this;
					}
					d3_switch.prototype.height = function(h){
						this.h= h;
						return this;
					}
					d3_switch.prototype.onclick = function(click){
						this.click= click;
						return this;
					}
					
					d3_switch.prototype.draw = function(container){
						var r,h,w,fill, orient, g, self;
						h = this.h ;
						w = this.w ;
						fill = this.fill_ ;
						orient = this.orient;
						this.container = container;
						
						self = this;
						
						
						r = h*0.95/2;
						this.r = r;
						g = container.append("g").classed("switch", true);
						

						g.style("cursor","pointer")
						.on("click",function(){
							self.toggle();
							self.click();
						});
				
						g.append("rect")
						.classed("switch-body", true)
							.attr("rx", h/2)
							.attr("ry", h/2)
							.attr("height",h)
							.attr("width",w)
							.style("fill", fill)
							.style("stroke-width",0);
						
						g.append("circle")
						 .classed("switch-scroll", true)
							.attr("cx", r + (h -2*r)/2)
							.attr("cy", r + (h -2*r)/2)
							.attr("r",r)
							.style("fill", "#fff")
							.style("stroke-width",0);
							
					
						
						return this;
					}
					
					
					return new d3_switch();
				}
				
			})();
