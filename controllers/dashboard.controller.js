class DashboardController {
  dashboard(req, res) {
    res.setHeader("Content-Type", "text/html")
    res.send(
      `
      <center>
        <div>This is api Marvel Cinematic Universe</div>
        <div>/categories</div>
        <div>/movies</div>
        <div>/characters</div>
        <div>/abilities</div>
        <div>/stories</div>
      </center>
    `
    );
  }
}

module.exports = new DashboardController();
