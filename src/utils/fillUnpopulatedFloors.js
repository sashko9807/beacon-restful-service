/**
* Fill the unpopulated floors with an empty array, so they could still be visible in the app
*
* @param totalFloors - The total amount of floors of the building
* @param beaconArray - MongoDB query result which groups beacons by floors
  @returns  Array of objects sorted by floor value in ascending order containing all beacons added to specific floor
*/

module.exports = (totalFloors, beaconArray) => {
    let floorCount = [];
    for (let i = 0; i < totalFloors; i++) {
        floorCount.push({
            floor: i + 1,
            beacons: (() => {
                for (let currentBeacon of beaconArray) {
                    if (currentBeacon._id.floor === i + 1) {
                        return currentBeacon.data.map(beaconData => beaconData)
                    }
                }
            })() ?? []
        });
    }

    return floorCount
}