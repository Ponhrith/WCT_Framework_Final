import React from "react";
import Nav from "../component/Navigation";
import "../Css/About.css";


const AboutPage = () => {
    return (
       <>
       <Nav />
       <section className="tittle">ABOUT</section>
        <section className="head1">
            <div className="info">
                <h1><span className="hightlight">Why </span> we <span className="hightlight">do</span> this?</h1>
            <p> The Royal University of Phnom Penh, one of Cambodia's largest universities, faces challenges 
                in monitoring and managing maintenance activities due to a lack of a centralized reporting system. 
                To address this, a University Report Management System (URMS) is proposed. The URMS offers a 
                user-friendly interface for students, instructors, and staff to submit reports, track progress, 
                and communicate with the administration. The primary objective is to optimize resource allocation, 
                improve maintenance procedures, minimize delays, and foster a more favorable educational and 
                professional atmosphere on the university's expansive campus<span className="hightlight">.</span></p>
                <h1><span className="hightlight">What </span> we <span className="hightlight"> see </span>?</h1>
            <p>The Royal University of Phnom Penh encounters difficulties in effectively monitoring and 
                handling maintenance and facility-related matters as a result of the lack of a centralized
                reporting system. In order to tackle this issue, we suggest the use of a University Report 
                Management System (URMS). The URMS will offer a user-friendly interface for students, 
                instructors, and staff to submit reports, monitor their progress, and enable open contact 
                with the administration. The primary objective of the URMS is to optimize the allocation of
                 resources in order to improve maintenance procedures, minimize delays, and foster a more 
                 favorable educational and professional atmosphere throughout the university's expansive 
                 campus<span className="hightlight">.</span></p>
                 <h1>Our <span className="hightlight">Vision</span></h1>
                 <p id="lastP">The University Report Management System (URMS) is proposed to address the Royal University 
                    of Phnom Penh's difficulties in managing maintenance and facility-related issues. The URMS 
                    platform provides a user-friendly interface that benefits students, instructors, and staff 
                    by facilitating the reporting of issues, tracking the progress of their resolution, and enabling 
                    open communication with the administration. This ultimately leads to enhanced efficiency in 
                    resolving issues and increased transparency in the process. The optimization of resource allocation 
                    is vital in eliminating maintenance delays, so cultivating a safer and more conducive learning and 
                    working environment across the expansive campus of the university<span className="hightlight">.</span></p>
            </div>
        </section>
       </>
    );
}

export default AboutPage;
