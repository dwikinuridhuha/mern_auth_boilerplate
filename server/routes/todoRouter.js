const router = require("express").Router();
const auth = require("../middleware/auth");
const Todo = require("../models/todoModel");

router.post("/", auth, async (req, res) => {
    try {
        const {title} = req.body;
        if (!title) {
            return status(400).json({
                msg: "not all fields have been entered"
            })
        }

        const newTodo = new Todo({
            title,
            userId: req.user
        });

        const saveTod0 = await newTodo.save();
        res.json(saveTod0)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
});

router.patch('/:id', auth, async (req, res) => {
    const todo = await Todo.updateOne({
        _id: req.params.id,
        userId: req.user
    }, {
        $set: {
            title: req.body.title
        }
    });
    if (!todo) {
        return res.status(400).json({
            msg: "No todo found with this ID that belongs to the current user"
        });
    }
    res.json(todo);
});

router.get('/all', auth, async (req, res) => {
    const todo = await Todo.find({userId: req.user});
    res.json(todo);
});

router.delete('/:id', auth, async (req, res) => {
    const todo = await Todo.findOne({userId: req.user, _id: req.params.id});
    if (!todo) {
        return res.status(400).json({
            msg: "No todo found with this ID that belongs to the current user"
        });
    }
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deleteTodo);
});

module.exports = router;