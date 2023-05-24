const testController = (req, res) => {
  res.json({
    msg: "test route and controller working",
  });
};

module.exports = testController;
