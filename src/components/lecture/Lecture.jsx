import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import LectureWeek from "./LectureWeek";
import "./lecture.scss";
import {
	api_getCourseById,
	api_getEnrolledCourseStatus,
	api_updatedCourseWeekStatus,
} from "../../helper/api_call.helper";
import Spinner from "../loader/Loader";

const Lecture = () => {
	const params = useParams();

	const [weekData, setWeekData] = useState({});
	const [weekStatus, setWeekStatus] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		//Get Course Info
		api_getCourseById(params.courseId).then((res) => {
			setWeekData(res.data.data);
		});

		//Get Course Finished Status
		api_getEnrolledCourseStatus(params.courseId).then((res) => {
			setWeekStatus(res.data.data.week_status);
			setIsLoading(false);
		});
	}, [params]);

	

	const onWeekFinishHandler = (weekId) => {
		api_updatedCourseWeekStatus({ courseId: params.courseId, weekId }).then(
			(res) => {
				setWeekStatus(res.data.data.week_status);
			}
		);
	};

	return (
		<React.Fragment>
			{isLoading && <Spinner open={isLoading} />}
			{!isLoading && (
				<section className="lectureWrapper">
					<div className="sidebar">
						<ul className="menu">
							{weekData.weeks.map((week, index) => {
								return (
									<li key={Math.random()}>
										<NavLink
											to={`/lecture/${params.courseId}/week/${week._id}`}
											activeClassName="activeLink"
										>
											Week {index + 1}
										</NavLink>
									</li>
								);
							})}
						</ul>
					</div>

					<LectureWeek
						weeks={weekData.weeks}
						offer_by={weekData.offer_by}
						title={weekData.title}
						status={weekStatus}
						onWeekFinish={onWeekFinishHandler}
					/>
				</section>
			)}
		</React.Fragment>
	);
};

export default Lecture;
