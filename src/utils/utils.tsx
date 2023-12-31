import axios ,{AxiosError} from "axios"
import HttpStatusCode from "../constants/httpStatusCode.enum"

export function isAxiosError<T>(error:unknown): error is AxiosError<T> {
    return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FromError>(error:unknown): error is AxiosError<FromError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency:number) {
    return new Intl.NumberFormat("de-DE").format(currency)
}

export function formatNumberToSocialStyle(value:number) {
    return new Intl.NumberFormat("en", {
        notation:"compact",
        maximumSignificantDigits:1
    }).format(value).replace(".",",").toLowerCase()
}