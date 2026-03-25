import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/session.js";

export const useCreateSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["createSession"],
        mutationFn: sessionApi.createSession,
        onSuccess: () => {
            // Instantly refresh the active sessions list on the dashboard
            queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
            toast.success("Session Created Successfully!");
        },
        onError: (error) => {
            console.error("FULL ERROR:", error);
            toast.error(error.response?.data?.message || "Failed to create the room");
        }
    });
};

export const useActiveSessions = () => {
    return useQuery({
        queryKey: ["activeSessions"],
        queryFn: sessionApi.getActiveSessions,
    });
};

export const useMyRecentSessions = () => {
    return useQuery({
        queryKey: ["myRecentSessions"],
        queryFn: sessionApi.getRecentSessions,
    });
};

export const useSessionById = (id) => {
    return useQuery({
        queryKey: ["session", id],
        queryFn: () => sessionApi.getSessionById(id),
        enabled: !!id,
        // Smart refetching: Stop polling the server if the session is already completed
        refetchInterval: (query) => {
            const status = query.state?.data?.session?.status;
            return status === "completed" ? false : 5000;
        },
    });
};

export const useJoinSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["joinSession"],
        mutationFn: (id) => sessionApi.joinSession(id),
        onSuccess: (_, id) => {
            // Update both the specific session and the dashboard lists instantly
            queryClient.invalidateQueries({ queryKey: ["session", id] });
            queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
            toast.success("Joined Session Successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to join Session");
        },
    });
};

export const useEndSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["endSession"],
        mutationFn: (id) => sessionApi.endSession(id),
        onSuccess: (_, id) => {
            // Instantly update UI across the app to reflect the ended session
            queryClient.invalidateQueries({ queryKey: ["session", id] });
            queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
            queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
            toast.success("Session Ended Successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to end Session");
        },
    });
};