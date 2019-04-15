//Constructor
Vec3 = function(x,y,z){
  this.x = x;
  this.y = y;
  this.z = z;
}

// Add method
Vec3.prototype.add = function(v){
  this.x += v.x;
  this.y += v.y;
  this.z += v.z;
  return this;
}

// Sum method
Vec3.prototype.sum = function(){
  return this.x + this.y + this.z;
}

// Get min method
Vec3.prototype.min = function(){
  if(this.x < this.y){
    var min = this.x;
  }
  else{
    var min = this.y;
  }
  if(this.z < min){
    min = this.z;
  }
  return min;
}

// Get mid method
Vec3.prototype.mid = function(){
  var min = this.min();
  var max = this.max();
  if(this.x != min){
    if(this.x != max){
      return this.x;
    }
  }
  if(this.y != min){
    if(this.y != max){
      return this.y;
    }
  }
  if(this.z != min){
    if(this.z != max){
      return this.z;
    }
  }
}

// Get max method
Vec3.prototype.max = function(){
  if(this.x < this.y){
    var max = this.y;
  }
  else{
    var max = this.x;
  }
  if (max < this.z){
    max = this.z;
  }
  return max;
}

// Get area of triangle method
Vec3.prototype.AreaOfTriangle = function(v1, v2){
  var va = new Vec3(v1.x-this.x, v1.y-this.y, v1.z-this.z);
  var vb = new Vec3(v2.x-this.x, v2.y-this.y, v2.z-this.z);
  var s = Math.sqrt((va.x*va.x+va.y*va.y+va.z*va.z)*(vb.x*vb.x+vb.y*vb.y+vb.z*vb.z)-(va.x*vb.x+va.y*vb.y+va.z*vb.z)*(va.x*vb.x+va.y*vb.y+va.z*vb.z));
  return s/2;
}
