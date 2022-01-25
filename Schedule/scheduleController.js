import Service from './scheduleService.js';

class Controller {
    async getAll(req, res) {
        try {
            const city = req.query.city;
            const cinema = req.query.cinema;
            const date = req.query.date;
            const timezone = req.query.timeZone;
            const schedule = await Service.getAll(city, cinema, date, timezone);
            return res.json(schedule);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getOne(req, res) {
        try {
            const city = req.query.city;
            const cinema = req.query.cinema;
            const date = req.query.date;
            const timezone = req.query.timeZone;
            const movieSchedule = await Service.getOne(req.params.id, city, cinema, date, timezone);
            return res.json(movieSchedule);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}
export default new Controller();
