var utils = {
  _pointInTriangle(P, A, B, C) { //P is the point, A, B, C are the points of the triangle
    // Compute vectors        
    function vec(from, to) {  return [to[0] - from[0], to[1] - from[1]];  }
    var v0 = vec(A, C);
    var v1 = vec(A, B);
    var v2 = vec(A, P);
    // Compute dot products
    function dot(u, v) {  return u[0] * v[0] + u[1] * v[1];  }
    var dot00 = dot(v0, v0);
    var dot01 = dot(v0, v1);
    var dot02 = dot(v0, v2);
    var dot11 = dot(v1, v1);
    var dot12 = dot(v1, v2);
    // Compute barycentric coordinates
    var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    // Check if point is in triangle
    return (u >= 0) && (v >= 0) && (u + v < 1);
  },

  _pointInRectangle(P, A, D) { //P is the point, A is top left corner of rectangle, D is bottom right corner of rectangle
    x1 = Math.min(A[0], D[0]);
    x2 = Math.max(A[0], D[0]);
    y1 = Math.min(A[1], D[1]);
    y2 = Math.max(A[1], D[1]);
    if ((x1 <= P[0]) && ( P[0]<= x2) && (y1 <= P[1]) && (P[1] <= y2)) {
      return true;
    } else {
      return false;
    };
  },

  rotatePoint(width, height, topLeft, point, angle) {
    var pivot = [width/2 + topLeft[0], height/2 + topLeft[1]];
    // Rotate clockwise, angle in radians
    var x = Math.round((Math.cos(angle) * (point[0] - pivot[0])) -
                       (Math.sin(angle) * (point[1] - pivot[1])) +
                       pivot[0]),
        y = Math.round((Math.sin(angle) * (point[0] - pivot[0])) +
                       (Math.cos(angle) * (point[1] - pivot[1])) +
                       pivot[1]);
    return [x, y];
  }

};

module.exports = utils;