# Timetable Manager

Timetable Manager is a web application designed to help educational institutions create, manage, and view timetables efficiently.

## Features

*   **Timetable Generation**: Dynamically generate timetables based on various inputs.
*   **Multiple Timetable Views**: View timetables by Division, Teacher, or Classroom.
*   **Slot Management**: Add, update, and delete individual slots in the timetable.
*   **Data Management**: Manage related data such as subjects, teachers, classrooms, batches, and subdivisions.
*   **PDF Export**: Export timetables to PDF format for easy sharing and printing.
*   **Interactive UI**: User-friendly interface for easy navigation and timetable manipulation.
*   **Responsive Design**: Adapts to different screen sizes.

## Prerequisites

*   [Bunjs](https://bun.sh/)
*   [MariaDB](https://mariadb.org/)

## Getting Started

### Cloning the Repository

```bash
git clone https://github.com/MatricalDefunkt/timetable-manager
cd timetable-manager
```

### Installation

1.  Open the project folder in your IDE.
2.  Open a terminal and run:
    ```bash
    bun install
    ```

### Running the Development Server

To start the development server, run:

```bash
bun dev
```
This will start the frontend on `http://localhost:5173` and the backend server using PM2, or attempt to install pm2 if it does not already exist.

## Project Structure

The project is organized into two main parts:

*   `src/frontend/`: Contains the React-based user interface, built with TypeScript and Vite.
    *   `Components/`: Reusable UI components.
    *   `Pages/`: Top-level page components.
    *   `context/`: React context for state management.
*    `utils/`: Utility functions and type definitions.
*   `src/backend/`: Contains the BunJS and ElysiaJS based API.
    *   `controllers/`: Logic for handling API requests.
    *   `api/routes/`: Defines the API routes.
    *   `database/`: Models and database interaction logic.
*   `SAMPLE_DATA/`: Contains CSV files for sample data.
*   `public/`: Static assets.
*   `.env`: Environment variable configuration (ensure you have this set up locally, it's not committed to git).

## Technologies Used

*   **Frontend**:
    *   React
    *   TypeScript
    *   Vite
    *   Material-UI (MUI)
*   **Backend**:
    *   BunJS
    *   ElysiaJS
    *   TypeScript
*   **Runtime**:
    *   Bun
*   **Database**:
    *   MariaDB Server.

## API Endpoints

The backend API is served from `http://localhost:3000`. The following are some of the main endpoints available in the [OpenAPI specification](src/backend/openapi.yaml):

**Data Retrieval (Getters):** *(See [getTables.ts](src/backend/api/routes/getTables.ts))*

*   `GET /academicYears`: Get all academic years.
    *   `GET /departments/:id/subjects`: Get subjects by department.
    *   *(Parameters: `departmentId`)*
    *   `GET /academicYears/:id/classrooms`: Get all classrooms by academic year.
    *   *(Parameters: `academicYearId`)*
    *   `GET /academicYears/:id/teachers`: Get all teachers by academic year.
    *   *(Parameters: `academicYearId`)*
    *   `GET /subject/:id/teachers`: Get teachers for a specific subject.
    *   *(Parameters: `subjectId`)*
    *   `GET /academicYears/:id/batches`: Get all batches by academic year.
    *   *(Parameters: `academicYearId`)*
    *   `GET /departments/:id/divisions`: Get all divisions by department.
    *   *(Parameters: `departmentId`)*
    *   `GET /batches/:id/departments`: Get all departments by batch.
    *   *(Parameters: `batchId`)*
    
**Timetable Viewing:**

*   `GET /subdivisions/:id/timetable`: Get timetable for a subdivision.
    *   *(Parameters: `subdivisionId`)*
*   `GET /divisions/:id/timetable`: Get timetable for a division.
    *   *(Parameters: `divisionId`)*
*   `GET /teachers/:id/timetable`: Get timetable for a teacher.
    *   *(Parameters: `teacherId`)*
*   `GET /classrooms/:id/timetable`: Get timetable for a classroom.
    *   *(Parameters: `classroomId`)*

**Availability Checks:**

*   `GET /available/teachers`: Get available teachers for a given slot and subject.
    *   *(Parameters: `subjectId`, `slotId`)*
    *   *(Controller logic likely in [`getAvailableTeachers`](src/backend/controllers/index.ts) and routed via `available.ts`)*
*   `GET /available/classrooms`: Get available classrooms for a given slot and subject.
    *   *(Parameters: `subjectId`, `slotId`)*
    *   *(Controller logic likely in [`getAvailableClassrooms`](src/backend/controllers/index.ts) and routed via `available.ts`)*
*   `GET /available/subdivisions`: Fetch available subdivisions. *(This was in the previous README, check `available.ts` or `openapi.yaml` for confirmation and parameters)*
    *   *(Controller logic might be in [`getAvailableSubdivisions`](src/backend/controllers/index.ts))*


**Timetable Slot Management (Editing):**
*(These are inferred from `editing.ts` and previous README structure; paths might vary slightly. Check `editing.ts` routes for exact paths)*

*   `POST /slotDatas/update`: Add data to a timetable slot.
    *   *(Controller: [`addSlotData`](src/backend/controllers/index.ts), routed via `editing.ts`)*
*   `PUT /slotDatas/:id`: Update data for an existing timetable slot.
    *   *(Controller: [`updateSlotData`](src/backend/controllers/index.ts), routed via `editing.ts`)*
*   `DELETE /slotDatas/:id`: Delete data from a timetable slot.
    *   *(Controller: [`deleteSlotData`](src/backend/controllers/index.ts), routed via `editing.ts`)*

**Data Management & Generation:**

*   Endpoints for **CSV data upload** are available, routed via `addCsv.ts`.
    *   *(Refer to [addCsv.ts](src/backend/api/routes/addCsv.ts))*
*   Endpoints for **[timetable generation](https://github.com/pranav-suri/timetable-generator)** are available, routed via `generate.ts`.
    *   *(Refer to [generate.ts](src/backend/api/routes/generate.ts))*
