import { EmpresaResponse } from "@/types"
import React, { useEffect } from "react"
import InfoLineForm from '../components/InfoLineForm'
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import moment from "moment-timezone";
import InputField from "./InputField";
import { FaWandMagicSparkles } from "react-icons/fa6";
import CustomDropDown from "./DropDown";

interface IReservaPage {
    empresaInfo?: EmpresaResponse
}

const ReservaPage = ({ empresaInfo }: IReservaPage) => {
    const timeZone = empresaInfo?.data.timeZone ?? "America/Montevideo"
    const [form, setForm] = React.useState<any>({
        infoLinesJson: {}
    })
    const [hour, setHour] = React.useState<string>("")
    const [hoursAvaiable, sethoursAvaiable] = React.useState<any[]>([])
    const [dateSelected, setdateSelected] = React.useState<string>(moment.tz(empresaInfo?.data.timeZone ?? "America/montevideo").format("YYYY MM DD").toString())
    const [error, setError] = React.useState<string>("")

    const handleChangeForm = (key: string, value: any) => {
        setForm((prev: any) => ({
            ...prev,
            [key]: value
        }))
        if (error) {
            setError('')
        }
    }

    const getNextHourAvaiable = async () => {
        try {
            const response = await fetch(empresaInfo?.data.apiUrl + '/pedido/calendar/next-date-avaiable', {
                method: "GET"
            })
            if (response) {
                const respText = await response.text()
                if (respText) {
                    const hora = moment.tz(respText, timeZone).format("HH:mm");
                    setHour(hora)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getHoursAvaiablePerDay = async () => {
        try {
            const response = await fetch(empresaInfo?.data.apiUrl + `/pedido/calendar/dates-avaiable?fecha=${dateSelected}&withPast=true`, {
                method: "GET"
            })
            const respJson = await response.json()
            if (respJson.length > 0) {
                const formatedData = respJson.map((element: string) => {
                    return moment.tz(element, timeZone).format("HH:MM")
                })
                sethoursAvaiable(formatedData)
            }
            console.log(respJson);
        } catch (error: any) {
            console.log("hubo un error", error.response.data.message);
        }
    }

    useEffect(() => {
        if (dateSelected) {
            setHour('')
            getHoursAvaiablePerDay()
        }
    }, [dateSelected])

    const makeReservation = () => {
        if (makeValidation() === false) {
            return;
        }

        try {
            if (!empresaInfo?.data.greenApiInstance || !empresaInfo?.data.greenApiInstanceToken) {
                const newLocal = 'No se puede procesar el pedido en este momento. Por favor, intente más tarde.'
                alert(newLocal);
                return;
            }

            let fullMessage;
            if (!form.producto) {
                fullMessage = `¡Hola! Me gustaría hacer una reserva. ¿Podrías proporcionarme sus servicios? Gracias.`;
            } else {
                let message = `🛍️ ${form.producto} x${1}`

                let infoLinesFormated = Object.keys(form.infoLinesJson).map((key) =>
                    `🔹 ${key}: ${form.infoLinesJson[key]}`
                ).join('\n');

                fullMessage = `¡Hola! 😊 Me gustaría realizar la siguiente reserva: \n${message}\n📄 *Datos para realizar la reserva:*\n${infoLinesFormated}\n\n¡Muchas gracias! 🙏 Quedo atento/a a su confirmación.`;
            }

            const whatsappUrl = `https://wa.me/${empresaInfo.data.numero}?text=${encodeURIComponent(fullMessage)}`;
            window.open(whatsappUrl, '_blank');
            setForm({})
            console.log(form);

        } catch (error) {
            console.log(error);

        }
    }

    const makeValidation = () => {
        const infoLines = empresaInfo?.infoLines ?? [];
        const customInfoLines = form?.infoLinesJson ?? {};
        let isValid = true;

        infoLines.forEach((infoLine: any) => {
            const key = infoLine.nombre;
            const valor = customInfoLines[key];

            if (infoLine?.es_obligatorio === false) {
                return;
            }

            if (!valor || valor.toString().trim() === "") {
                setError(`El campo "${key}" es obligatorio y no fue completado.`)
                isValid = false;
            }
        });

        if (!isValid) {
            console.log("Por favor complete todos los campos requeridos.");
        }

        return isValid;
    }

    const updateFechaYHoraInfoLine = (fecha: string, hora: string) => {
        if (fecha && hora) {
            const fullDate = moment.tz(`${fecha} ${hora}`, "YYYY-MM-DD HH:mm", timeZone).format("YYYY-MM-DD HH:mm")
            setForm((prev: any) => ({
                ...prev,
                infoLinesJson: {
                    ...prev.infoLinesJson,
                    ["Fecha y Hora"]: fullDate
                }
            }))
        }
    }
    return (
        <div className="flex-1 w-full">

            <div className="typewriter-wrapper overflow-y-auto flex justify-center  mt-10 flex-wrap">
                <h1 className="text-2xl md:text-4xl font-bold text-white typewriter-text">
                    ¡Planificá tu visita con nosotros!
                </h1>
            </div>
            <div className="flex md:flex-row flex-col md:items-start items-center  text-white justify-center py-[50px] gap-[50px]">
                <div className="flex flex-row items-center shadow-2xl shadow-blue-500/30">
                    <Calendar
                        className="night-blue"
                        minDate={new Date()}
                        onChange={(date) => {
                            const selectedDate = Array.isArray(date) ? date[0] : date;
                            if (selectedDate) {
                                const formattedDate = moment(selectedDate)
                                    .tz(timeZone)
                                    .format("YYYY-MM-DD");
                                setdateSelected(formattedDate);
                                updateFechaYHoraInfoLine(formattedDate, hour)
                            }
                        }}
                        value={dateSelected ? dateSelected : undefined}
                    />
                </div>
                <div className="w-[350px] shadow-blue-500/30 bg-[#1e293b] rounded-xl shadow-2xl px-[24px] py-[24px] flex flex-col justify-between">
                    <h1 className="text-center font-semibold text-2xl mb-4">Completa tu reserva</h1>
                    {
                        error &&
                        <p className="text-red-400 mb-4">{error}</p>
                    }
                    <div className="flex-1">
                        <div className="flex-1" style={{ marginBottom: '1rem' }}>
                            <CustomDropDown label="Seleccionar servicio" options={empresaInfo?.products.map((prod) => prod.name) ?? []} selected={form?.producto} onChange={(value) => handleChangeForm('producto', value)} />
                        </div>

                        <div className="flex-1" style={{ marginBottom: '1rem' }}>

                            <InfoLineForm
                                errors={{}}
                                value={form.infoLinesJson ?? {}}
                                infoLines={empresaInfo?.infoLines.filter((itm: any) => {
                                    if (!itm.es_defecto && itm.tipo !== 'date') {
                                        return itm
                                    }
                                })}
                                setValue={(val: any) => handleChangeForm("infoLinesJson", val)}
                            />
                        </div>

                        <div className="flex-1" style={{ marginBottom: '1rem' }}>
                            <CustomDropDown
                                label="Seleccionar hora"
                                options={hoursAvaiable}
                                selected={hour}
                                onChange={(value) => {
                                    setHour(value)
                                    updateFechaYHoraInfoLine(dateSelected, value)
                                }}
                            />
                            <button onClick={getNextHourAvaiable} className="flex w-full underline flex-row text-blue-400 gap-[8px] items-center mt-2 justify-center">
                                <p className="text-sm">Mostrar siguiente horario disponible</p>
                                <FaWandMagicSparkles size={12} />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={makeReservation}
                        className="w-full mt-[24px] bg-[#2c466d] text-white py-2 rounded-lg shadow-md hover:bg-[#203350] transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-[#1e293b]"
                    >
                        Reservar
                    </button>
                </div>

            </div>
        </div>
    )
}


export default ReservaPage