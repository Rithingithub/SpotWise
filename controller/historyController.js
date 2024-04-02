const { History } = require('../database/database');

const createHistory = async (req, res) => {
    try {
        const history = await History.create(req.body);
        res.status(201).json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHistory = async (req, res) => {
    try {
        const histories = await History.findAll();
        res.json(histories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHistoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await History.findOne({
            where: { id: id }
        });
        if (history) {
            res.json(history);
        } else {
            res.status(404).json({ error: 'History not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await History.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedHistory = await History.findOne({ where: { id: id } });
            return res.status(200).json({ history: updatedHistory });
        }
        throw new Error('History not found');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await History.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("History deleted");
        }
        throw new Error("History not found");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createHistory,
    getHistory,
    getHistoryById,
    updateHistory,
    deleteHistory
};
