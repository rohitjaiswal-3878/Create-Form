const router = require("express").Router();
const Form = require("../model/form.model");

router.post("/create", async (req, res, next) => {
  try {
    const { title, formData } = req.body;
    const form = await Form.create({
      title,
      formData,
    });

    res.status(201).json({ msg: "Form created successfully!" });
  } catch (error) {
    next(error);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const forms = await Form.find({}).select("title");
    res.status(200).json(forms);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const form = await Form.findById(id);

    res.status(200).json(form);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Form.findByIdAndDelete(id);
    res.status(200).json({ msg: "Form deleted successfully!" });
  } catch (error) {
    next(error);
  }
});

router.patch("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, formData } = req.body;
    await Form.findByIdAndUpdate(id, { title, formData });
    res.status(200).json({ msg: "Form updated successfully!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
