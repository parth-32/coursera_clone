import React from "react";
import "./certificate.scss";

const Certificate = (props) => {
	return (
		<section id={props.id} className="imageProvider">
			<span className="courseraHeading">coursera</span>
			<div className="imageBody">
				<span className="certify">This is certify that</span>
				<span className="receiver">{props.user}</span>
				<span className="certify">
					has successfully completed course of
				</span>
				<span className="certificateCourseName">{props.course}</span>
				<span className="courseOfferBy">
					offered by <b>{props.offerBy}</b>
				</span>
			</div>
			<div className="imageFooter">
				<span className="issueDate">{props.updatedAt}</span>
				<span className="refId">Ref ID: {props.enrollId}</span>
				<div className="university">{props.offerBy}</div>
			</div>
		</section>
	);
};

export default Certificate;
