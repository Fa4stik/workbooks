import {useMutation} from "@tanstack/react-query";
import {speechToText} from "@/04_entities/ApiSpeechToText/lib/speechToText";

export const useSpeechToText = () => useMutation({
    mutationFn: speechToText,
})