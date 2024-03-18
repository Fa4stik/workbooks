import {useMutation} from "@tanstack/react-query";
import {speechToText} from "@/04_entities/ApiAiModels/lib/speechToText";

export const useSpeechToText = () => useMutation({
    mutationFn: speechToText,
})