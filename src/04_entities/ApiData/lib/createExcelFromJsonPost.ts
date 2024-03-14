import {TFields} from "@/05_shared/model";
import {$api} from "@/05_shared/api";

export const createExcelFromJsonPost = (excelData: TFields[][]): Promise<{
    data: Blob
}> =>
    $api.post('/create-excel-from-json', excelData, {responseType: 'blob'})