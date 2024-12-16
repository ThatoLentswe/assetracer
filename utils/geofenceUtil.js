// utils/geofenceUtil.js
// Example function to check if asset is within a geofence
const isWithinGeofence = (assetLocation, geofence) => {
    // Check if asset is inside geofence area (geofence is a defined area with lat/long boundaries)
    return assetLocation.latitude >= geofence.minLat && assetLocation.latitude <= geofence.maxLat
      && assetLocation.longitude >= geofence.minLon && assetLocation.longitude <= geofence.maxLon;
  };
  
  module.exports = { isWithinGeofence };
  