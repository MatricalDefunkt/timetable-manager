import { Teacher } from "../database";
import getAllTeachers from "./getAllTeachers";

async function getAvailableTeachers(slotId: string | number, subjectId: string | number) {
    const subjectTeachers = await getAllTeachers(subjectId);

    const teachers = await Teacher.findAll({
        include: [
            {
                association: "SlotData",
                where: { slotId: slotId },
            },
        ],
    });

    const availableTeachers = subjectTeachers.filter(
        (subjectTeacher) => !teachers.some((teacher) => teacher.id === subjectTeacher.id)
    );
    return availableTeachers;
}

export default getAvailableTeachers;