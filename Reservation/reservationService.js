import Reservation from './reservationModel.js';
import Ticket from './ticketModel.js';
import mongoose from 'mongoose';
import { reservationSample } from './helpers/ReservationsAggregationHelper.js';

class ReservationService {

    async createReservation(reservationInfo) {
        const { userId, sessionId, seatsArray } = reservationInfo;
        const ticketList = [];
        for (let i = 0; i < seatsArray.length; i++) {
            const createdTicket = await Ticket.create(seatsArray[i]);
            ticketList.push(createdTicket._id)
        }
        const reservation = {
            session_id: sessionId,
            user_id: userId,
            ticketsList: ticketList
        }
        const createdReservation = await Reservation.create(reservation);
        return createdReservation;
    }
    async getReservations(userId) {
        let userObjectId = mongoose.Types.ObjectId(userId)
        const foundReservations = await Reservation.aggregate(reservationSample(userObjectId))
        return foundReservations;
    }

}

export default new ReservationService();
