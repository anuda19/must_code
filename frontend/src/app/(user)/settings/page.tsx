"use client";

import { useState } from "react";
import {
  Sliders,
  Bell,
  Mic,
  Shield,
  Sparkles,
  Save,
  LoaderCircle,
  Volume2,
  Cpu,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SettingsCard } from "./_components/SettingCard";
import BackButton from "@/app/components/ui/BackButton";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Example Settings Form State tuned for an AI interview platform
  const [settings, setSettings] = useState({
    aiVoiceSpeed: "1.0",
    aiInterviewerPersona: "professional", // professional, strict, friendly
    realtimeAudio: true,
    emailNotifications: true,
    interviewReminders: true,
    autoRecordSessions: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(null);

    try {
      // Simulate API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSuccessMessage("Settings updated successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleClass = (checked: boolean) =>
    `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#11162B] ${
      checked ? "bg-indigo-600" : "bg-white/10"
    }`;

  const thumbClass = (checked: boolean) =>
    `pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
      checked ? "translate-x-5" : "translate-x-0"
    }`;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0D18] px-4 py-8 text-white antialiased sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-indigo-600/[0.12] blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-[35%] h-[450px] w-[450px] rounded-full bg-violet-600/[0.09] blur-[140px]" />

      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <header className="flex flex-col gap-3 border-b border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400">
            <Settings className="size-3.5" />
            Settings
          </div>
          <BackButton
            label="Back"
            className="text-slate-300 hover:bg-white/[0.07] hover:text-white"
          />

          {/* <Button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="group relative inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-xl shadow-indigo-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-600/40 active:scale-[0.98]"
          >
            {isSaving ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="size-4 transition-transform group-hover:scale-110" />
                <span>Save Changes</span>
              </>
            )}
          </Button> */}
        </header>

        {successMessage && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300 backdrop-blur-xl animate-in fade-in">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSaveAll} className="space-y-8">
          {/* AI Interview & Voice Preferences */}
          <SettingsCard
            title="AI Interview & Voice Configuration"
            description="Fine-tune how the Gemini Live voice agent interacts with you during mock sessions."
            icon={Mic}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Interviewer Persona */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Interviewer Persona
                </label>
                <select
                  value={settings.aiInterviewerPersona}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      aiInterviewerPersona: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-[#0B1020]/90 px-4 py-3.5 text-sm text-white outline-none transition-all focus:border-indigo-500 focus:bg-[#0B1020]"
                >
                  <option value="professional" className="bg-[#11162B]">
                    Professional & Constructive
                  </option>
                  <option value="strict" className="bg-[#11162B]">
                    Strict FAANG Principal
                  </option>
                  <option value="friendly" className="bg-[#11162B]">
                    Friendly & Encouraging
                  </option>
                </select>
                <p className="text-[11px] text-slate-500">
                  Affects the questioning style and tone of your AI feedback.
                </p>
              </div>

              {/* Voice Speed */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Voice Speech Speed
                </label>
                <select
                  value={settings.aiVoiceSpeed}
                  onChange={(e) =>
                    setSettings({ ...settings, aiVoiceSpeed: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-[#0B1020]/90 px-4 py-3.5 text-sm text-white outline-none transition-all focus:border-indigo-500 focus:bg-[#0B1020]"
                >
                  <option value="0.9" className="bg-[#11162B]">
                    0.9x (Slower)
                  </option>
                  <option value="1.0" className="bg-[#11162B]">
                    1.0x (Normal)
                  </option>
                  <option value="1.1" className="bg-[#11162B]">
                    1.1x (Faster)
                  </option>
                </select>
                <p className="text-[11px] text-slate-500">
                  Playback speed for real-time WebRTC audio responses.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              {/* Toggle: Realtime WebRTC Audio */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium text-white">
                    Low-Latency WebRTC Audio
                  </span>
                  <p className="text-xs text-slate-400">
                    Stream voice audio over WebRTC to eliminate queuing delays.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.realtimeAudio}
                  onClick={() => handleToggle("realtimeAudio")}
                  className={toggleClass(settings.realtimeAudio)}
                >
                  <span className={thumbClass(settings.realtimeAudio)} />
                </button>
              </div>

              {/* Toggle: Auto-record sessions */}
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium text-white">
                    Auto-Record Mock Sessions
                  </span>
                  <p className="text-xs text-slate-400">
                    Automatically save session transcripts and audio logs for
                    review.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.autoRecordSessions}
                  onClick={() => handleToggle("autoRecordSessions")}
                  className={toggleClass(settings.autoRecordSessions)}
                >
                  <span className={thumbClass(settings.autoRecordSessions)} />
                </button>
              </div>
            </div>
          </SettingsCard>

          {/* Notifications & Reminders */}
          <SettingsCard
            title="Notifications & Alerts"
            description="Manage how you receive feedback summaries and preparation reminders."
            icon={Bell}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium text-white">
                    Email Performance Reports
                  </span>
                  <p className="text-xs text-slate-400">
                    Receive detailed evaluation scores and improvement areas in
                    your inbox.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.emailNotifications}
                  onClick={() => handleToggle("emailNotifications")}
                  className={toggleClass(settings.emailNotifications)}
                >
                  <span className={thumbClass(settings.emailNotifications)} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium text-white">
                    Interview Schedule Reminders
                  </span>
                  <p className="text-xs text-slate-400">
                    Get notified prior to scheduled mock assessments or practice
                    blocks.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.interviewReminders}
                  onClick={() => handleToggle("interviewReminders")}
                  className={toggleClass(settings.interviewReminders)}
                >
                  <span className={thumbClass(settings.interviewReminders)} />
                </button>
              </div>
            </div>
          </SettingsCard>

          {/* Security & Account Access */}
          <SettingsCard
            title="Account Security"
            description="Manage your active session tokens and secure authentication credentials."
            icon={Shield}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <div>
                <p className="text-sm font-semibold text-white">
                  JWT Session Authentication
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tokens are securely stored via httpOnly cookies with automatic
                  refresh handling.
                </p>
              </div>
              <Badge
                variant="outline"
                className="w-fit border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              >
                Secure & Active
              </Badge>
            </div>
          </SettingsCard>
        </form>
      </div>
    </main>
  );
}
