import React from 'react'
import { Component } from 'react';

export default class SchedulePt extends Component {
    render(){
        return(
            <div>
                <iframe src="https://app.acuityscheduling.com/schedule.php?owner=20933683&amp;appointmentType=17580486" title="Schedule Appointment" width="100%" height="800" frameborder="0"></iframe><script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>
            </div>
        )
    }
}