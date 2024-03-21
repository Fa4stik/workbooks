import {TFields} from "@/05_shared/model";
import {$api} from "@/05_shared/api";

export const createExcelFromJsonPost = (excelData: TFields[][]) =>
    $api.post<Blob>('/create-excel-from-json', excelData, {responseType: 'blob'})