import React, { useState, useEffect } from 'react';
import Get from '../../util/api/Get';
import Put from '../../util/api/Put';
import Delete from '../../util/api/Delete';
import EmployeesList from './EmployeesList';
import Tables from './Tables';
import TablesActionPanel from './TablesActionPanel';
import NavBar from '../navBar/NavBar';
import Utilities from '../../util/util';
import { useUser } from '../../context/userContext';
import { genericWarning, noEmployeeWarning } from '../../WinBox/winboxMessages';
import './Schedules.css';

export default function Schedule() {
	const [currentlyDragged, setCurrentlyDragged] = useState('');
	const [dateSelected, setDateSelected] = useState(
		Utilities.formatDateString(new Date())
	);

	const [currentSchedule, setCurrentSchedule] = useState({
		schedules: null,
		homeRehabilitations: [],
	});

	const [homeRehabilitationsEdited, setHomeRehabilitationsEdited] = useState(
		[]
	);

	const removeHomeRehabilitation = async (homeRehabilitationId) => {
		if (await Delete.homeRehabilitation(homeRehabilitationId)) {
			setHomeRehabilitationsEdited((prev) =>
				prev.filter((id) => id !== homeRehabilitationId)
			);
			setCurrentSchedule((prev) => ({
				...prev,
				homeRehabilitations: prev.homeRehabilitations.filter(
					(hR) => hR.id !== homeRehabilitationId
				),
			}));
		} else genericWarning();
	};

	useEffect(() => {
		setAreChangesSaved(true);
		(async function () {
			const schedules = await Get.schedulesByDate(dateSelected);
			const homeRehabilitations = await Get.homeRehabilitationsByDate(
				dateSelected
			);
			setCurrentSchedule({ schedules, homeRehabilitations });
			setHomeRehabilitationsEdited([]);
		})();
	}, [dateSelected]);

	const [workStageSpans, setworkStageSpans] = useState([]);
	useEffect(() => {
		Get.workStageSpans().then((stages) => setworkStageSpans(stages));
	}, []);

	const [areChangesSaved, setAreChangesSaved] = useState(true);

	const editSchedule = (cellNumber, stationName, newCellValue) => {
		setCurrentSchedule((prev) => {
			const updatedSchedule = { ...prev };
			if (stationName === 'homeRehabilitations') {
				updatedSchedule.homeRehabilitations[Number(cellNumber)].employee =
					newCellValue;
				setHomeRehabilitationsEdited((prev) => [
					...prev,
					currentSchedule.homeRehabilitations[Number(cellNumber)].id,
				]);
			} else {
				if (areChangesSaved) setAreChangesSaved(false);
				updatedSchedule.schedules[stationName][Number(cellNumber)] =
					newCellValue;
			}
			return updatedSchedule;
		});
	};

	const saveScheudle = async () => {
		setAreChangesSaved(true);
		await Put.schedule(dateSelected, currentSchedule.schedules);
	};

	const autoGenerateSchedule = async () => {
		Get.generateSchedule().then((schedules) => {
			setAreChangesSaved(false);
			setCurrentSchedule((prev) => (schedules ? { ...prev, schedules } : prev));
		});
	};

	const saveChangedHomeRehabilitation = async (homeRehabilitation) => {
		if (!homeRehabilitation.employee) return noEmployeeWarning();
		if (await Put.homeRehabilitation(homeRehabilitation))
			setHomeRehabilitationsEdited((prev) =>
				prev.filter((id) => id !== homeRehabilitation.id)
			);
	};

	const handleHomeRehabilitationEdit = ({ target }, index) => {
		setHomeRehabilitationsEdited((prev) => [
			...prev,
			currentSchedule.homeRehabilitations[index].id,
		]);
		setCurrentSchedule((prev) => {
			const homeRehabilitations = prev.homeRehabilitations;
			homeRehabilitations[index][target.name] =
				target.name === 'startTime' ? `${target.value}:00` : target.value;
			return { ...prev, homeRehabilitations };
		});
	};

	const clearSchedule = () => {
		setAreChangesSaved(false);
		setCurrentSchedule((prev) => ({
			...prev,
			schedules: Utilities.returnEmptyDailyShiftObject(),
		}));
	};

	const isUserAdmin = Utilities.checkIfUserIsAdmin(useUser());

	return (
		<div>
			<NavBar />
			<div className="schedule">
				{isUserAdmin && <EmployeesList />}
				<Tables
					currentlyDragged={currentlyDragged}
					setCurrentlyDragged={setCurrentlyDragged}
					dateSelected={dateSelected}
					setDateSelected={setDateSelected}
					currentSchedule={currentSchedule}
					editSchedule={editSchedule}
					workStageSpans={workStageSpans}
					homeRehabilitationsEdited={homeRehabilitationsEdited}
					handleHomeRehabilitationEdit={handleHomeRehabilitationEdit}
					removeHomeRehabilitation={removeHomeRehabilitation}
					saveChangedHomeRehabilitation={saveChangedHomeRehabilitation}
				/>
				{isUserAdmin && (
					<TablesActionPanel
						areChangesSaved={areChangesSaved}
						saveScheudle={saveScheudle}
						autoGenerateSchedule={autoGenerateSchedule}
						clearSchedule={clearSchedule}
					/>
				)}
			</div>
		</div>
	);
}
