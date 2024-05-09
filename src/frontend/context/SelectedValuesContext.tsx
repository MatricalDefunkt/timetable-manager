import React, { createContext, useState } from "react";
import { TimetableType } from "../../utils/types";
import { useCookies } from "react-cookie";

interface CookieSetOptions {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
    encode?: (value: string) => string;
}
interface SelectedValues {
    timetableType: { selected: boolean; value: TimetableType };
    academicYear: { selected: boolean; value: string };
    batch: { selected: boolean; value: string };
    department: { selected: boolean; value: string };
    division: { selected: boolean; value: string };
    teacher: { selected: boolean; value: string };
    subject: { selected: boolean; value: string };
    classroom: { selected: boolean; value: string };
}

interface SelectedValuesContextType {
    selectedValues: SelectedValues;
    setSelectedValues: React.Dispatch<React.SetStateAction<SelectedValues>>;
    selectedValueCookie: { selectedValues: SelectedValues } | undefined;
    setSelectedValueCookie: (
        name: "selectedValues",
        value: SelectedValues,
        options?: CookieSetOptions,
    ) => void;
}

const defaultSelectedValues: SelectedValues = {
    timetableType: { selected: false, value: 0 },
    academicYear: { selected: false, value: "" },
    batch: { selected: false, value: "" },
    department: { selected: false, value: "" },
    division: { selected: false, value: "" },
    teacher: { selected: false, value: "" },
    subject: { selected: false, value: "" },
    classroom: { selected: false, value: "" },
};

const SelectedValuesContext = createContext<SelectedValuesContextType>({
    selectedValues: defaultSelectedValues,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelectedValues: () => {},
    selectedValueCookie: undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelectedValueCookie: () => {},
});

const SelectedValuesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedValues, setSelectedValues] = useState<SelectedValues>(defaultSelectedValues);
    const [cookies, setCookie] = useCookies<"selectedValues", { selectedValues: SelectedValues }>([
        "selectedValues",
    ]);

    // try {
    //     const cookieData = cookies.selectedValues;
    //     if (cookieData) {
    //         setSelectedValues(cookieData);
    //     }
    // } catch (error) {
    //     console.error("Error loading from cookie:", error);
    // }

    const setSelectedValueCookie = (
        name: "selectedValues",
        value: SelectedValues,
        options?: CookieSetOptions,
    ) => {
        setCookie(name, value, options);
    };

    return (
        <SelectedValuesContext.Provider
            value={{
                selectedValues,
                setSelectedValues,
                selectedValueCookie: cookies,
                setSelectedValueCookie,
            }}
        >
            {children}
        </SelectedValuesContext.Provider>
    );
};

export { SelectedValuesContext, SelectedValuesProvider };
