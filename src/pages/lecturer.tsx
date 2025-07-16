import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import Nav from "../components/Nav";
import { getAllTeamRegistrations, TeamRegistrationType, updateTeamStatus } from "../lib/TeamRegistrationStore";
import { Dialog, DialogContent, DialogHeader, DialogDescription } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import CClogo from '../assets/CC-logo.png';
import CCLogoWhite from '../assets/CCLogoWhite.png';

const TeamsList = () => {
  const [teams, setTeams] = useState<TeamRegistrationType[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamRegistrationType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setTeams(getAllTeamRegistrations());
  }, []);

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setIsDark(document.documentElement.classList.contains('dark') || match.matches);
    update();
    match.addEventListener('change', update);
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      match.removeEventListener('change', update);
      observer.disconnect();
    };
  }, []);

  const handleCardClick = (team: TeamRegistrationType) => {
    setSelectedTeam(team);
    setDialogOpen(true);
  };

  const handleViewProposal = () => {
    if (selectedTeam?.proposal) {
      const fileUrl = URL.createObjectURL(selectedTeam.proposal);
      window.open(fileUrl, "_blank");
    }
  };

  const handleStatusChange = (status: 'approved' | 'rejected') => {
    if (selectedTeam) {
      updateTeamStatus(selectedTeam.id, status);
      setTeams(getAllTeamRegistrations());
      setDialogOpen(false);
      
      // Show notification
      setNotification({
        type: status === 'approved' ? 'success' : 'error',
        message: `Team "${selectedTeam.teamName}" has been ${status}!`
      });
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <>
      {/* Sticky Nav Wrapper */}
      <Nav />
      <div
        className="relative min-h-screen pt-12 overflow-hidden "
      >
        {/* Main Content Card */}
        <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
          {/* Add dark mode support to main card */}
          <div className="w-full max-w-5xl bg-white/95 dark:bg-gray-900 backdrop-blur-lg rounded-2xl p-8 sm:p-12 border border-gray-200 dark:border-gray-800 shadow-md">
            <div className="flex flex-col items-center mb-12 gap-3">
              <img src={isDark ? CCLogoWhite : CClogo} alt="CC Logo" className="w-20 h-20 mb-2" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Registered Teams</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center">
                Browse all registered teams for the event. Select a team to view their details and proposal. You can approve or decline their participation
              </p>
              <span className="inline-block mt-2 px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-md text-sm font-medium">Lecturer Panel</span>
            </div>
            {/* Teams Sections */}
            {/* Pending Teams */}
            {teams.filter(team => team.status === 'pending').length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-semibold text-yellow-700 dark:text-yellow-400">Pending Teams</span>
                  <span className="h-1 w-8 bg-yellow-200 dark:bg-yellow-800 rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teams.filter(team => team.status === 'pending').map((team) => (
                    <Card
                      key={team.id}
                      className="transition-shadow duration-300 cursor-pointer border-2 border-blue-100 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-500 bg-white/90 dark:bg-gray-800 hover:bg-blue-50/60 dark:hover:bg-blue-950 hover:scale-[1.02] focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
                      onClick={() => handleCardClick(team)}
                    >
                      <CardHeader>
                        <CardTitle className="flex flex-col items-center gap-2 py-4 relative">
                          <span className="inline-block text-lg sm:text-xl font-bold text-gray-900 dark:text-white text-center bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-700 rounded-lg px-4 py-2">{team.teamName}</span>
                          <span className="relative z-10 text-xs text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900 rounded-full px-2 py-0.5 mt-1">Team</span>
                          <div className="relative z-10 flex flex-col items-center mt-2 gap-1 w-full">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Members: {team.members.length}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Registered: {team.registrationDate?.toLocaleDateString?.() || '-'} </span>
                            <span className={`text-xs font-medium px-2 py-0.5 mt-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md`}>{team.status}</span>
                          </div>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {/* Divider */}
            <div className="w-full h-0.5 bg-gray-100 my-8 rounded-full" />
            {/* Accepted Teams */}
            {teams.filter(team => team.status === 'approved').length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-semibold text-green-700 dark:text-green-400">Accepted Teams</span>
                  <span className="h-1 w-8 bg-green-200 dark:bg-green-800 rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teams.filter(team => team.status === 'approved').map((team) => (
                    <Card
                      key={team.id}
                      className="transition-shadow duration-300 cursor-pointer border-2 border-green-100 dark:border-green-800 hover:border-green-400 dark:hover:border-green-500 bg-white/90 dark:bg-gray-800 hover:bg-green-50/60 dark:hover:bg-green-950 hover:scale-[1.02] focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900"
                      onClick={() => handleCardClick(team)}
                    >
                      <CardHeader>
                        <CardTitle className="flex flex-col items-center gap-2 py-4 relative">
                          <span className="inline-block text-lg sm:text-xl font-bold text-gray-900 dark:text-white text-center bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-700 rounded-lg px-4 py-2">{team.teamName}</span>
                          <span className="relative z-10 text-xs text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900 rounded-full px-2 py-0.5 mt-1">Team</span>
                          <div className="relative z-10 flex flex-col items-center mt-2 gap-1 w-full">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Members: {team.members.length}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Registered: {team.registrationDate?.toLocaleDateString?.() || '-'} </span>
                            <span className={`text-xs font-medium px-2 py-0.5 mt-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md`}>{team.status}</span>
                          </div>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {/* Divider */}
            <div className="w-full h-0.5 bg-gray-100 my-8 rounded-full" />
            {/* Rejected Teams */}
            {teams.filter(team => team.status === 'rejected').length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-semibold text-red-700 dark:text-red-400">Rejected Teams</span>
                  <span className="h-1 w-8 bg-red-200 dark:bg-red-800 rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teams.filter(team => team.status === 'rejected').map((team) => (
                    <Card
                      key={team.id}
                      className="transition-shadow duration-300 cursor-pointer border-2 border-red-100 dark:border-red-800 hover:border-red-400 dark:hover:border-red-500 bg-white/90 dark:bg-gray-800 hover:bg-red-50/60 dark:hover:bg-red-950 hover:scale-[1.02] focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                      onClick={() => handleCardClick(team)}
                    >
                      <CardHeader>
                        <CardTitle className="flex flex-col items-center gap-2 py-4 relative">
                          <span className="inline-block text-lg sm:text-xl font-bold text-gray-900 dark:text-white text-center bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-700 rounded-lg px-4 py-2">{team.teamName}</span>
                          <span className="relative z-10 text-xs text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900 rounded-full px-2 py-0.5 mt-1">Team</span>
                          <div className="relative z-10 flex flex-col items-center mt-2 gap-1 w-full">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Members: {team.members.length}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Registered: {team.registrationDate?.toLocaleDateString?.() || '-'} </span>
                            <span className={`text-xs font-medium px-2 py-0.5 mt-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md`}>{team.status}</span>
                          </div>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {/* If no teams at all */}
            {teams.length === 0 && (
              <div className="col-span-full text-center py-16">
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No teams registered yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Be the first to register a team!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl w-[95vw] p-2 sm:p-8 max-h-[90vh] overflow-y-auto rounded-xl">
          <DialogHeader>
            <DialogDescription>
              {selectedTeam && (
                <div className="space-y-6">
                  {/* Team Name Badge */}
                  <div className="flex flex-col items-center space-y-2 mb-4">
                    <span className="text-xs text-gray-400 dark:text-gray-300 tracking-wide uppercase">Team Name</span>
                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-gray-900 border border-blue-200 dark:border-gray-700 rounded-lg px-5 py-2">
                      <img src={isDark ? CCLogoWhite : CClogo} alt="CC Logo" className="w-7 h-7 hidden sm:block" />
                      <span className="inline-block text-lg sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight bg-white dark:bg-gray-900 border border-blue-200 dark:border-gray-700 rounded-lg px-4 py-2">{selectedTeam.teamName}</span>
                    </div>
                  </div>
         

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-sm text-gray-500">Registered: {selectedTeam.registrationDate?.toLocaleString?.() || "-"}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${selectedTeam.status === "approved" ? "bg-green-100 text-green-800" : selectedTeam.status === "rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>{selectedTeam.status}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Team Members</h4>
                    {/* Mobile: Card layout */}
                    <div className="sm:hidden flex flex-col gap-4">
                      {selectedTeam.members.map((member, idx) => (
                        <div key={idx} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                          <div className="font-semibold text-gray-900 dark:text-white mb-2">{member.name}</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold">Umail:</span> {member.umail}</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold">Contact:</span> {member.contact}</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold">Food:</span> {member.foodPreference}</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold">Allergies:</span> {member.allergies}</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300"><span className="font-semibold">Shirt Size:</span> {member.shirtSize}</div>
                        </div>
                      ))}
                    </div>
                    {/* Desktop: Table layout */}
                    <div className="w-full max-w-full overflow-x-auto hidden sm:block">
                      <table className="w-full min-w-[600px] border text-sm rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                          <tr>
                            <th className="px-3 py-2 text-left text-gray-900 dark:text-gray-100">Name</th>
                            <th className="px-3 py-2 text-left text-gray-900 dark:text-gray-100">Umail</th>
                            <th className="px-3 py-2 text-left text-gray-900 dark:text-gray-100">Contact</th>
                            <th className="px-3 py-2 text-left text-gray-900 dark:text-gray-100">Food</th>
                            <th className="px-3 py-2 text-left text-gray-900 dark:text-gray-100">Allergies</th>
                            <th className="px-3 py-2 text-left text-gray-900 dark:text-gray-100">Shirt Size</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTeam.members.map((member, idx) => (
                            <tr key={idx} className="even:bg-gray-50 dark:even:bg-gray-900">
                              <td className="px-3 py-2 font-medium text-gray-900 dark:text-white">{member.name}</td>
                              <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{member.umail}</td>
                              <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{member.contact}</td>
                              <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{member.foodPreference}</td>
                              <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{member.allergies}</td>
                              <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{member.shirtSize}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 flex-wrap justify-center">
                    <Button
                      onClick={handleViewProposal}
                      disabled={!selectedTeam.proposal}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
                    >
                      View Proposal PDF
                    </Button>
                    {!selectedTeam.proposal && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">No proposal uploaded</span>
                    )}
                    <Button
                      onClick={() => handleStatusChange('approved')}
                      disabled={selectedTeam.status === 'approved'}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleStatusChange('rejected')}
                      disabled={selectedTeam.status === 'rejected'}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-md shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200' 
            : 'bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamsList; 