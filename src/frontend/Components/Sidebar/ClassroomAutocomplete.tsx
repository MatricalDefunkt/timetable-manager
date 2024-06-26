import React, { Dispatch, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { ClassroomResponse, TimetableResponse } from "../../../backend/api/routes/responseTypes";
import { edenFetch } from "../fetchAndSet";
import api from "../..";

// Implementing SubdivisionAutocomplete
type Classrooms = ClassroomResponse["classrooms"];

interface SubdivisionAutocompleteProps {
    slotDatas: TimetableResponse["timetable"]["slots"][0]["SlotDatas"];
    slotDataIndex: number;
    updateClassrooms: (classrooms: Classrooms, slotDataIndex: number) => void;
    setUpdate: (update: boolean) => void;
    setSlotDataIndexToUpdate: Dispatch<number | null>;
}

export function ClassroomAutocomplete({
    slotDatas,
    slotDataIndex,
    updateClassrooms,
    setUpdate,
    setSlotDataIndexToUpdate,
}: SubdivisionAutocompleteProps) {
    const slotData = slotDatas![slotDataIndex];
    const subjectId = slotData.Subject?.id ?? null;
    const slotId = slotData.SlotId;
    const currentClassrooms: Classrooms = slotData.SlotDataClasses!.map(
        (slotDataClassroom) => slotDataClassroom.Classroom!,
    );
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState<Classrooms>(currentClassrooms);
    const [availableClassroomData, setAvailableClassroomData] = useState<Classrooms>([
        ...currentClassrooms,
    ]);

    useEffect(() => {
        setValue(currentClassrooms);
        setAvailableClassroomData([...currentClassrooms]);
        if (!subjectId) return;
        edenFetch<ClassroomResponse>(
            api.available.classrooms.get({ query: { subjectId, slotId } }),
        ).then((data) => {
            const availableClassrooms = data.classrooms;
            const allClassrooms = availableClassrooms.concat(currentClassrooms);
            setValue(currentClassrooms);
            setAvailableClassroomData(allClassrooms);
        });
        // It is the only needed dependency, other dependencies are not needed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slotDatas]);

    return (
        <Autocomplete
            multiple
            limitTags={1}
            sx={{ margin: "5px" }}
            disablePortal
            autoHighlight
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                updateClassrooms(newValue, slotDataIndex);
                setUpdate(true);
                setSlotDataIndexToUpdate(slotDataIndex);
            }}
            inputValue={inputValue} // CHANGE TO CURRENT SUBJECT ONCE PARENT FUNCTION CALLBACK IS ADDED
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            options={availableClassroomData}
            getOptionLabel={(option) => option.classroomName}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Classrooms" />}
        />
    );
}
