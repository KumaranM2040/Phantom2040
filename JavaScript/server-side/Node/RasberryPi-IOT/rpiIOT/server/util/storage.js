require("date-format-lite"); // add date format
const db = require('../db-connector');
var xssFilters = require('xss-filters');

class Storage {
    constructor(connection, table) {
        this._db = db;
        this.table = "iotDb.events";
    }

    // get events from the table, use dynamic loading if parameters sent
    async getAll(params) {
        let query = "SELECT * FROM ??";
        let queryParams = [
            this.table
        ];

        let result = await this._db.ExecuteQuery(query, queryParams);

        result.forEach((entry) => {
            // format date and time

            entry.id = xssFilters.inHTMLData(entry.id);
            entry.text = xssFilters.inHTMLData(entry.text);

            entry.start_date = entry.start_date.format("YYYY-MM-DD hh:mm");
            entry.end_date = entry.end_date.format("YYYY-MM-DD hh:mm");
        });
        return result;
    }

    // create new event
    async insert(data) {
        let events = [];
        if (Array.isArray(data.ids)) {
            data.ids.forEach(element => {
                events.push({
                    start_date: data[`${element}_start_date`],
                    end_date: data[`${element}_end_date`],
                    text: data[`${element}_text`]
                })
            });
            console.log(events);
        } else {
            let element = data.ids;
            events.push({
                id: data[`${element}_id`],
                start_date: data[`${element}_start_date`],
                end_date: data[`${element}_end_date`],
                text: data[`${element}_text`],
                method: data[`${element}_!nativeeditor_status`]
            })
        }

        if (events[0].method === 'deleted') {
            return this.delete(events[0].id);
        }
        let result = await this._db.ExecuteQuery(
            "INSERT INTO ?? (`start_date`, `end_date`, `text`) VALUES (?,?,?)", [this.table, events[0].start_date, events[0].end_date, events[0].text]);

        return {
            action: "inserted",
            tid: result.insertId
        }
    }

    // update event
    async update(id, data) {
        await this._db.ExecuteQuery(
            "UPDATE ?? SET `start_date` = ?, `end_date` = ?, `text` = ? WHERE id = ?", [this.table, data.start_date, data.end_date, data.text, id]);

        return {
            action: "updated"
        }
    }

    // delete event
    async delete(id) {
        await this._db.ExecuteQuery(
            "DELETE FROM ?? WHERE `id`=? ;", [this.table, id]);

        return {
            action: "deleted"
        }
    }
}

module.exports = Storage;