import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions.js";
import ActiveSessions from "../components/ActiveSessions.jsx";
import StatsCards from "../components/StatsCards.jsx";

import Navbar from "../components/Navbar.jsx";
import WelcomeSection from "../components/WelcomeSection.jsx";
import { UsersIcon, ClockIcon, Code2Icon, XIcon, Loader2 } from "lucide-react";
import RecentSessions from "../components/RecentSessions.jsx";
import CreateSessionModal from "../components/CreateSessionModal.jsx";

function DashboardPage() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "Easy" });

  const createSessionMutation = useCreateSession();
  
  const { data: activeSessionData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  // Safely extract arrays using optional chaining to prevent crashes while loading
  const activeSessions = activeSessionData?.sessions || [];
  const recentSessions = recentSessionData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user.id) return false;

    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id
  }

  const handleCreateRoom = (e) => {
    // Prevent default form submission reload
    if (e) e.preventDefault(); 
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          // Navigate to the newly created session
          navigate(`/session/${data.session._id}`);
        }
      }
    );
  };

  // Wait for Clerk to load the user profile
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-base-300 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-300 font-sans pb-12">
      <Navbar />  
      <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

      {/* Grid Layout */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatsCards 
            activeSessionsCount={activeSessions.length}
            recentSessionsCount={recentSessions.length}
          />
          <ActiveSessions sessions={activeSessions}
              isLoading={loadingActiveSessions}
              isUserInSession={isUserInSession}
          />
        </div>

        <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
      </div>
      
      <CreateSessionModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    
    </div>
  );
}

export default DashboardPage;