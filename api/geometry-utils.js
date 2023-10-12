const EARTH_RADIUS_APPROX = 6371e3; // meters


// Returns the great-circle distance between two points on a sphere (in meters)
// using the Haversine formula: https://en.wikipedia.org/wiki/Haversine_formula
//
//      a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
//      c = 2 ⋅ atan2(√a, √(1−a))
//      d = R ⋅ c
//  WHERE
//      φ is latitude
//      λ is longitude
//      R is the radius of the sphere
//
const distanceBetweenCoord = (p1, p2) => {
  const lat1Rad = p1.lat * Math.PI/180; // φ, λ in radians
  const lat2Rad = p2.lat * Math.PI/180;
  const deltaLat = (p2.lat-p1.lat) * Math.PI/180;
  const deltaLon = (p2.lon-p1.lon) * Math.PI/180;

  const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) *
    Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  return EARTH_RADIUS_APPROX * c;
} 


module.exports.distanceBetweenCoord = distanceBetweenCoord;