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

  const [settings, setSettings] = useState({
    aiVoiceSpeed: "1.0",
    aiInterviewerPersona: "professional",
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
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSuccessMessage("Settings updated successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleClass = (checked: boolean) =>
    `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--clay-primary)] focus:ring-offset-2 focus:ring-offset-[var(--clay-surface)] ${
      checked ? "bg-[var(--clay-primary)]" : "bg-[var(--clay-peach-shadow)]"
    }`;

  const thumbClass = (checked: boolean) =>
    `pointer-events-none inline-block size-5 transform rounded-full bg-[var(--clay-surface)] shadow-md ring-0 transition duration-200 ease-in-out ${
      checked ? "translate-x-5" : "translate-x-0"
    }`;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[var(--clay-bg)] px-4 py-8 text-[var(--clay-ink)] antialiased sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-[var(--clay-peach)]/50 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-[35%] h-[450px] w-[450px] rounded-full bg-[var(--clay-sage)]/60 blur-[140px]" />

      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex flex-col gap-3 border-b border-[var(--clay-border)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--clay-primary)]">
            <Settings className="size-3.5" />
            Settings
          </div>
          <BackButton
            label="Back"
            className="text-[var(--clay-muted)] hover:bg-[var(--clay-surface-warm)] hover:text-[var(--clay-ink)]"
          />
        </header>

        {successMessage && (
          <div className="animate-in fade-in rounded-2xl border border-[var(--clay-green-shadow)] bg-[var(--clay-green-surface)] p-4 text-sm text-[var(--clay-green-ink)]">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSaveAll} className="space-y-8">
          <SettingsCard
            title="AI Interview & Voice Configuration"
            description="Fine-tune how the Gemini Live voice agent interacts with you during mock sessions."
            icon={Mic}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--clay-muted)]">
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
                  className="w-full rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-4 py-3.5 text-sm text-[var(--clay-ink)] outline-none transition-all focus:border-[var(--clay-primary)] focus:bg-[var(--clay-surface)] focus:ring-2 focus:ring-[var(--clay-primary)]/15"
                >
                  <option value="professional">
                    Professional & Constructive
                  </option>
                  <option value="strict">Strict FAANG Principal</option>
                  <option value="friendly">Friendly & Encouraging</option>
                </select>
                <p className="text-[11px] text-[var(--clay-subtle)]">
                  Affects the questioning style and tone of your AI feedback.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--clay-muted)]">
                  Voice Speech Speed
                </label>
                <select
                  value={settings.aiVoiceSpeed}
                  onChange={(e) =>
                    setSettings({ ...settings, aiVoiceSpeed: e.target.value })
                  }
                  className="w-full rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] px-4 py-3.5 text-sm text-[var(--clay-ink)] outline-none transition-all focus:border-[var(--clay-primary)] focus:bg-[var(--clay-surface)] focus:ring-2 focus:ring-[var(--clay-primary)]/15"
                >
                  <option value="0.9">0.9x (Slower)</option>
                  <option value="1.0">1.0x (Normal)</option>
                  <option value="1.1">1.1x (Faster)</option>
                </select>
                <p className="text-[11px] text-[var(--clay-subtle)]">
                  Playback speed for real-time WebRTC audio responses.
                </p>
              </div>
            </div>

            <div className="space-y-4 border-t border-[var(--clay-border)] pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium text-[var(--clay-ink)]">
                    Low-Latency WebRTC Audio
                  </span>
                  <p className="text-xs text-[var(--clay-muted)]">
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

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium text-[var(--clay-ink)]">
                    Auto-Record Mock Sessions
                  </span>
                  <p className="text-xs text-[var(--clay-muted)]">
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

          <SettingsCard
            title="Notifications & Alerts"
            description="Manage how you receive feedback summaries and preparation reminders."
            icon={Bell}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium text-[var(--clay-ink)]">
                    Email Performance Reports
                  </span>
                  <p className="text-xs text-[var(--clay-muted)]">
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

              <div className="flex items-center justify-between border-t border-[var(--clay-border)] pt-2">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium text-[var(--clay-ink)]">
                    Interview Schedule Reminders
                  </span>
                  <p className="text-xs text-[var(--clay-muted)]">
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

          <SettingsCard
            title="Account Security"
            description="Manage your active session tokens and secure authentication credentials."
            icon={Shield}
          >
            <div className="flex flex-col gap-4 rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-surface-warm)] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--clay-ink)]">
                  JWT Session Authentication
                </p>
                <p className="mt-0.5 text-xs text-[var(--clay-muted)]">
                  Tokens are securely stored via httpOnly cookies with automatic
                  refresh handling.
                </p>
              </div>
              <Badge
                variant="outline"
                className="w-fit border-[var(--clay-green-shadow)] bg-[var(--clay-green-surface)] text-[var(--clay-green-ink)]"
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