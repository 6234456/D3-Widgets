(function(){
				d3.svg.range = function(){
					var d3_range = function(){
						this.h = 50;
						this.w = 300;
						this.fill_ = "#ff7f50";
						this.onchange_ = function(){};
						this.state_ = true;
						this.disabled = false;
						this.cursorSize_ = 12;
						this.min_ = 0;
						this.max_ = 100;
						this.scale = d3.scale.linear().range([this.min_, this.max_]).domain([0, this.w]);
						
					};
					
					d3_range.prototype.onchange = function(callback){
						this.onchange_ = callback;
						
						return this;
					}
					
					
					d3_range.prototype.min = function(min){
						this.min_ = min;
						return this;
					}
					
					d3_range.prototype.max = function(max){
						this.max_ = max;
						return this;
					}
					
					d3_range.prototype.width = function(w){
						this.w = w;
						return this;
					}
					
					d3_range.prototype.cursorSize = function(s){
						this.cursorSize_ = s;
						return this;
					}	

					d3_range.prototype.getValue = function(){
						var scale = this.scale;
						return [scale(this.pos_low),scale(this.pos_high)];
					}	

					
					
					d3_range.prototype.fill = function(fill){
						this.fill_ = fill;
						return this;
					}
					d3_range.prototype.height = function(h){
						this.h= h;
						return this;
					}
				
					
					d3_range.prototype.draw = function(container){
						var r,h,w,fill, orient, g, self, cursorSize, max, min;
						h = this.h ;
						w = this.w ;
						fill = this.fill_ ;
						this.container = container;
						min = this.min_;
						max = this.max_;
						
						self = this;
						
						cursorSize = this.cursorSize_;
						
						var cursorGenerator = function(){
							var p2 = [0, cursorSize/2* Math.sqrt(3)];
							var p4 = [cursorSize/2*-1, 0];
							var p3 = [cursorSize/2, 0];
							var p5 = p2;
							var p1 = [0, cursorSize*0.5 + cursorSize/2* Math.sqrt(3) + h];
							
							return "M"+ p1 + " L"+ p2+ " L"+ p3+ " L"+ p4+ " L"+ p5 + "Z";
						}
						
					
						g = container.append("g").classed("range", true);
						
						var scale = this.scale;
						this.pos_low = 0;
						this.pos_high = w;
	
						g.append("rect")
						.classed("range-body", true)
							.attr("height",h)
							.attr("width",w)
							.attr("transform","translate("+[0, cursorSize]+")")
							.style("fill", fill)
							.style("stroke-width",0);
							
						var minor = g.append("path")
						 .classed("range-cursor", true)
						 .classed("minor", true)
							.style("cursor","pointer")
							.attr("d", cursorGenerator())
							.style("fill", "#ccc")
							.style("stroke", "#ccc")
							.style("stroke-width",1)
							;
						
						var minorText = g.append("text")
						  .style("display", "none")
						  .style("text-anchor","middle")
						  ;
						
						var format = d3.format(".2f");
					
						var majorText = g.append("text")
						  .style("display", "none")
						  .style("text-anchor","middle")
						  ;
					
						var major = g.append("path")
						 .classed("range-cursor", true)
						 .classed("major", true)
							.style("cursor","pointer")
							.attr("d", cursorGenerator())
							.attr("transform","translate("+[w,0]+")")
							.style("fill", "#ccc")
							.style("stroke", "#ccc")
							.style("stroke-width",1);
						
						var myDrag = function(isMajor, e){
						
							var x = d3.event.x;
							
							if(isMajor){
								d3.select(e).attr("transform","translate("+[Math.min(Math.max(x,self.pos_low),w), 0]+")");
								self.pos_high = Math.min(Math.max(x,self.pos_low),w);
								
								majorText.style("display",null)
										.attr("transform","translate("+[self.pos_high, cursorSize*1.1 + cursorSize/2* Math.sqrt(3) + h ]+")")
										.text(format(scale(self.pos_high)))
										;
							}else{
								d3.select(e).attr("transform","translate("+[Math.min(Math.max(x,0),self.pos_high), 0]+")");
								self.pos_low = Math.min(Math.max(x,0),self.pos_high);
								
								minorText.style("display",null)
										.attr("transform","translate("+[self.pos_low, cursorSize*1.1 + cursorSize/2* Math.sqrt(3) + h ]+")")
										.text(format(scale(self.pos_low)))
										;
							}
							
							self.onchange_();
						
						};
						
						var myDragEnd = function(){
							majorText.style("display","none");
							minorText.style("display","none");
						}
						
					
							
						var dragMajor = d3.behavior.drag().on("drag", function(){ myDrag(1, this);}).on("dragend", myDragEnd);
						var dragMinor = d3.behavior.drag().on("drag", function(){myDrag(0, this);}).on("dragend", myDragEnd);
						
						major.call(dragMajor);
						minor.call(dragMinor);
						
						return this;
					}
					
					
					return new d3_range();
				}
				
			})();
