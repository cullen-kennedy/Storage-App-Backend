import Location from '../database/models/location.model'

const LocationsController = {

    /**
     * @api {get} locations Request Locations
     * @apiName GetLocations
     * @apiGroup Location
     *
     * @apiSuccess {Object[]} - List of locations, "-" is only a placeholder.
     * @apiSuccess {int} -.id Unique id of selected location
     * @apiSuccess {String} -.name Name of the location
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *          {
     *              "id": 1,
     *              "name": "Garage"
     *          },...
     *     ]
     */
    async getAllLocations(req, res) {
        try {
            const [status, result] = await Location.getLocations()
            //Just return a data model for now
            res.status(status).json(result)
        } 
        catch (err) {
            console.error(err.message)
            res.status(500).json({Message: "Exception in LocationsController"})
        }
    }
}

export default LocationsController