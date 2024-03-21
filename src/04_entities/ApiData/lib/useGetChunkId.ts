import {useQuery} from "@tanstack/react-query";
import {getChunkId} from "@/04_entities/ApiData/lib/getChunkId";

export const useGetChunkId = () => useQuery({
    queryFn: getChunkId,
    queryKey: ['chunk']
})