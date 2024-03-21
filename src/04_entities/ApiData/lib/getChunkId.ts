import {$api} from "@/05_shared/api";

export const getChunkId = () =>
    $api.get<number>('/get-chunk-id/')