import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/session.js";

export const useCreateSession = () => {
    const result = useMutation({
        mutationKey: ["createSession"],
        mutationFn: sessionApi.createSession,
        onSuccess: () => toast.success("Session Created Successfully!"),
        onError: (error) => {
            console.log("FULL ERROR:", error);
            console.log("RESPONSE DATA:", error?.response?.data);
            toast.error(error.response?.data?.message || "Failed to create the room");
        }
    });

    return result;
};

export const useActiveSessions = () => {
    const result = useQuery({
        queryKey: ["activeSessions"],
        queryFn: sessionApi.getActiveSessions,
    });

    return result;
};

export const useMyRecentSessions = () => {
    const result = useQuery({
        queryKey: ["myRecentSessions"],
        queryFn: sessionApi.getRecentSessions, // Fixed function name mapping
    });

    return result;
};

export const useSessionById = (id) => {
    const result = useQuery({
        queryKey: ["session", id],
        queryFn: () => sessionApi.getSessionById(id),
        enabled: !!id,
        refetchInterval: 5000, // refetch every 5 seconds to detect session status changes
    });

    return result;
};

export const useJoinSession = () => {
    const result = useMutation({
        mutationKey: ["joinSession"],
        mutationFn: (id) => sessionApi.joinSession(id),
        onSuccess: () => toast.success("Joined Session Successfully"),
        onError: (error) =>
            toast.error(error.response?.data?.message || "Failed to join Session"),
    });

    return result;
};

export const useEndSession = () => {
    const result = useMutation({
        mutationKey: ["endSession"],
        mutationFn: (id) => sessionApi.endSession(id),
        onSuccess: () => toast.success("Session Ended Successfully"),
        onError: (error) =>
            toast.error(error.response?.data?.message || "Failed to end Session"),
    });

    return result;
};