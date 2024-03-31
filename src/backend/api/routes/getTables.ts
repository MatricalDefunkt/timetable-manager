import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import {
    AcademicYear,
    Batch,
    Classroom,
    Department,
    Division,
    Subdivision,
    Subject,
    Teacher,
} from "../../database";
import {
    getSubjectTeachers,
} from "../../controllers";

const app = new Elysia();
app.use(cors({ methods: ["GET", "POST"] }));

app.get("/academicYears", async () => {
    return { academicYears: await AcademicYear.findAll() }; // TODO: add userId function
});

app.get("/subjects", async (req) => {
    const { departmentId } = req.query;
    if (!departmentId) {
        req.set.status = 400;
        return { error: { message: "departmentId is required." } };
    }
    return {
        subjects: await Subject.findAll({
            where: {
                DepartmentId: departmentId, // TODO: add multi disc sub
            },
        }),
    };
});

app.get("/classrooms", async (req) => {
    const { academicYearId } = req.query;
    if (!academicYearId) {
        req.set.status = 400;
        return { error: { message: "academicYearId is required." } };
    }
    return {
        classrooms: await Classroom.findAll({ where: { AcademicYearId: academicYearId } }),
    };
});

app.get("/teachers", async (req) => {
    const { academicYearId } = req.query;
    if (!academicYearId) {
        req.set.status = 400;
        return { error: { message: "academicYearId is required." } };
    }
    return {
        teachers: await Teacher.findAll({
            where: {
                AcademicYearId: academicYearId,
            },
        }),
    };
});

app.get("/subjectTeachers", async (req) => {
    const { subjectId } = req.query;
    if (!subjectId) {
        req.set.status = 400;
        return { error: { message: "subjectId is required." } };
    }
    return { teachers: await getSubjectTeachers(subjectId) };
});

app.get("/batches", async (req) => {
    const { academicYearId } = req.query;
    if (!academicYearId) {
        req.set.status = 400;
        return { error: { message: "academicYearId is required." } };
    }
    return {
        batches: await Batch.findAll({
            where: {
                AcademicYearId: academicYearId,
            },
        }),
    };
});

app.get("/divisions", async (req) => {
    const { departmentId } = req.query;
    if (!departmentId) {
        req.set.status = 400;
        return { error: { message: "departmentId is required." } };
    }
    return {
        divisions: await Division.findAll({
            where: {
                DepartmentId: departmentId,
            },
        }),
    };
});

app.get("/subdivisions", async (req) => {
    const { divisionId } = req.query;
    if (!divisionId) {
        req.set.status = 400;
        return { error: { message: "divisionId is required." } };
    }
    return {
        subdivisions: await Subdivision.findAll({
            where: {
                DivisionId: divisionId,
            },
        }),
    };
});

app.get("/departments", async (req) => {
    const { batchId } = req.query;
    if (!batchId) {
        req.set.status = 400;
        return { error: { message: "batchId is required." } };
    }
    return {
        departments: await Department.findAll({
            where: {
                BatchId: batchId,
            },
        }),
    };
});

export default app;
