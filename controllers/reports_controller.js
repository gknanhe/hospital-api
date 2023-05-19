const Report = require('../models/report');

// Function to list all the reports of all the patients filtered by a specific status
//Input: status

module.exports.status = async function(req, res){
    try {
        let reports = await Report.find({status: req.params.status});

        if(reports){
            return res.status(200).send({
                reports: reports,
                message: "Reports of all patients by status"
            })
        }

    } catch (error) {
        console.log('Internal server error', error);
        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
}