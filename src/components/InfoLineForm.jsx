import React, { useMemo } from "react";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TipoInfoLine } from "@/types";
import { IoCheckmark } from "react-icons/io5";
import InputField from '../components/InputField'

const InfoLineForm = ({ value, setValue, infoLines, errors }) => {
    const defaultDate = useMemo(() => {
        const tz = moment.tz.guess();
        return moment.tz(tz).toDate();
    }, []);

    if (infoLines.length === 0) return null;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {infoLines.map((infoLine, index) => {
                const fieldVal = value[infoLine.nombre];
                const errorMsg = errors[infoLine.nombre];

                return (
                    <div key={infoLine.nombre + index} style={{ display: "flex", flexDirection: "column" }}>
                        {
                            (infoLine.tipo !== 'string' || infoLine.tipo !== 'numeric') ??
                            <label className="mb-3">
                                {infoLine.nombre}
                            </label>
                        }

                        {infoLine.tipo === TipoInfoLine.boolean && (
                            <label className="inline-flex items-center space-x-2 cursor-pointer relative">
                                <input
                                    type="checkbox"
                                    checked={!!fieldVal}
                                    onChange={(e) =>
                                        setValue({ ...value, [infoLine.nombre]: e.target.checked })
                                    }
                                    className="peer h-5 w-5 appearance-none rounded-md bg-[#1e293b] border border-gray-600 checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200"
                                />
                                <IoCheckmark
                                    size={16}
                                    className="absolute left-[-6px] top-1 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                                />
                                <span className="text-white">{infoLine.nombre}</span>
                            </label>
                        )}

                        {infoLine.tipo === TipoInfoLine.number &&
                            <InputField type="number" label={infoLine.nombre} value={fieldVal ?? ""} onChangeValue={(val) => setValue({ ...value, [infoLine.nombre]: parseFloat(val) })} id={`input-${infoLine.nombre}`} />
                        }

                        {infoLine.tipo === TipoInfoLine.string &&
                            <InputField type="text" label={infoLine.nombre} value={fieldVal ?? ""} onChangeValue={(val) => setValue({ ...value, [infoLine.nombre]: val })} id={`input-${infoLine.nombre}`} />
                        }

                        {infoLine.tipo === TipoInfoLine.date && (
                            <DatePicker
                                selected={fieldVal ? new Date(fieldVal) : defaultDate}
                                onChange={(date) =>
                                    setValue({ ...value, [infoLine.nombre]: date })
                                }
                                dateFormat="yyyy-MM-dd"
                            />
                        )}

                        {errorMsg && (
                            <span className="text-red-400 text-lg ml-2 mt-2">
                                {errorMsg}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(InfoLineForm);
